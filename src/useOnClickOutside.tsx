import { useEffect } from 'react'

type EventType = MouseEvent | TouchEvent

type ElementReference = React.RefObject<HTMLElement | null>

/**
 * Invokes the provided handler when a mouse or touch event occurs
 * outside of the referenced element.
 *
 * The handler is NOT called when:
 * - The event target is contained within the main `ref`
 * - The event target is contained within any of the `allowedNodes`
 * - The event target has the `__exclude-click-outside__` CSS class
 *
 * This hook listens to `mousedown` and `touchstart` events on the document.
 *
 * @param ref - Ref object pointing to the primary element to detect outside interactions for
 * @param handler - Callback fired when a click or touch occurs outside the referenced element
 * @param allowedNodes - Optional array of refs that should be treated as inside clicks
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null)
 *
 * useOnClickOutside(ref, () => {
 *   setOpen(false)
 * })
 * ```
 */

export const useOnClickOutside = (
  ref: ElementReference,
  handler: (event: EventType) => void,
  allowedNodes?: ElementReference[]
) => {
  useEffect(() => {
    const listener = (event: EventType) => {
      const targetElement = event.target as HTMLElement

      if (targetElement.classList.contains('__exclude-click-outside__')) {
        return
      }

      if (!ref || !ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      if (allowedNodes && allowedNodes.length > 0) {
        for (const node of allowedNodes) {
          if (node.current && node.current.contains(event.target as Node))
            return
        }
      }
      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler, allowedNodes])
}

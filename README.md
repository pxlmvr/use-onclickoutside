# use-on-click-outside

A small, focused React hook that triggers a callback when a mouse or touch interaction occurs outside a specified element.

Designed to be:

- ✅ TypeScript-first
- ✅ Lightweight (no dependencies besides React)
- ✅ Safe to use across modals, dropdowns, popovers, etc.
- ✅ Compatible with React 16.8+ (hooks)

---

## Installation

```bash
npm install use-on-click-outside
# or
yarn add use-on-click-outside
```

## Usage

### Basic Example

```tsx
import { useRef } from 'react'
import { useOnClickOutside } from 'use-on-click-outside'

function Dropdown() {
  const ref = useRef<HTMLDivElement>(null)

  useOnClickOutside(ref, () => {
    console.log('Clicked outside')
  })

  return <div ref={ref}>Dropdown content</div>
}
```

### With allowed elements

You can provide additional refs that should be treated as “inside” clicks and therefore not trigger the callback:

```tsx
const containerRef = useRef<HTMLDivElement>(null)
const buttonRef = useRef<HTMLButtonElement>(null)

useOnClickOutside(containerRef, () => {
  setOpen(false)
}, [buttonRef])
```

## API

### `useOnClickOutside`

```ts
useOnClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler: (event: MouseEvent | TouchEvent) => void,
  allowedNodes?: RefObject<HTMLElement | null>[]
): void
```

### Parameters

- `ref`: A React ref object pointing to the element you want to detect outside clicks for.
- `handler`: A callback function that gets called when a click or touch event occurs outside the referenced element.
- `allowedNodes` (optional): An array of React ref objects that should be considered as inside clicks and excluded from triggering the handler.

## Exclusion rules

The handler will not be called if:

- The event target is inside `ref`
- The event target is inside any `allowedNodes`
- The event target has the CSS class:

```css
__exclude-click-outside__
```

## Events

The hook listens for the following events:

- `mousedown`
- `touchstart`

This ensures consistent behavior across mouse and touch devices.

## React compatibility

- React 16.8+

React is listed as a peer dependency, no duplicate React instances are bundled.

# smart-anchor-css

> A zero-wobble, collision-safe smart tooltip engine powered by Native CSS Anchor Positioning and the CSS `if()` API.

`smart-anchor-css` offloads the heavy geometric layout calculations of traditional tooltip libraries (like Popper.js) to the browser's native C++ compositing engine. It uses a lightweight TypeScript wrapper strictly for viewport collision avoidance, ensuring your tooltips always stay on screen.

Designed with a premium dark-theme aesthetic out of the box, perfect for modern web applications.

## Features

* **Zero Main-Thread Blocking:** Layout tethering is handled natively by CSS `position-anchor`.
* **Zero-Wobble Caret:** Uses a mathematically perfect 1:1 `clip-path` square for symmetrical rotation.
* **Collision Aware:** TypeScript automatically calculates a 3x3 viewport grid to flip the tooltip away from screen edges.
* **Clean DOM:** No inline `transform: translate3d()` styles constantly injecting into your markup.
* **Dark Mode Default:** Ships with a rich `#121212` background and high-contrast `#eb3300` accent styling.

## Installation

```bash
npm install smart-anchor-css
# or
pnpm add smart-anchor-css
```

## Usage

### CSS

You can import the base CSS directly into your global stylesheet or via your bundler. This includes the dark theme base and the smart caret positioning.

```CSS
/* In your global.css */
@import 'smart-anchor-css/dist/style.css';
```

### HTML

Ensure your anchor and tooltip elements are linked via the anchor-name and position-anchor CSS properties.

```HTML
<div class="container">
  <!-- The Anchor -->
  <div id="my-anchor" class="box" style="anchor-name: --tether-anchor;">
    <span>Hover or Drag Me</span>
  </div>
  
  <!-- The Tooltip -->
  <div id="my-tooltip" class="tooltip" style="position-anchor: --tether-anchor;">
    <span class="tooltip-text">Gravity Locked! 🚀</span>
  </div>
</div>
```

3. Initialize in TypeScript

Import the initialization function and pass your DOM nodes. The library will immediately calculate the safest placement and attach the necessary resize/move listeners.

### TypeScript
```TypeScript
import { attachSmartTooltip } from 'smart-anchor-css';

const anchorNode = document.getElementById('my-anchor');
const tooltipNode = document.getElementById('my-tooltip');

if (anchorNode && tooltipNode) {
  // Initializes the 3x3 grid collision logic
  const tether = attachSmartTooltip({
    anchor: anchorNode,
    tooltip: tooltipNode,
    // Optional configuration
    dragEnabled: true 
  });

  // Later, if you need to destroy the instance and remove listeners:
  // tether.destroy();
}
```

## Browser Support

This package utilizes bleeding-edge CSS features:

- position-anchor
- position-area
- if() inline conditionals

Currently supported in Chromium 125+ (Chrome, Edge, Arc). For broader support, consider using a CSS polyfill in your build step.

### License

MIT
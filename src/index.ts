export interface TetherOptions {
  anchor: HTMLElement;
  tooltip: HTMLElement;
  dragEnabled?: boolean;
}

export function attachSmartTooltip({ anchor, tooltip, dragEnabled = false }: TetherOptions) {
  let isDragging = false;

  const updateTooltipPosition = (): void => {
    const rect = anchor.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    const ww = window.innerWidth;
    const wh = window.innerHeight;
    
    const col = x < ww / 3 ? 'left' : x > (ww * 2) / 3 ? 'right' : 'center';
    const row = y < wh / 3 ? 'top' : y > (wh * 2) / 3 ? 'bottom' : 'center';
    
    let dashPos = 'top-center'; 
    let spacePos = 'top center';
    
    if (row === 'top' && col === 'left') { dashPos = 'bottom-right'; spacePos = 'bottom right'; }
    else if (row === 'top' && col === 'center') { dashPos = 'bottom-center'; spacePos = 'bottom center'; }
    else if (row === 'top' && col === 'right') { dashPos = 'bottom-left'; spacePos = 'bottom left'; }
    else if (row === 'center' && col === 'left') { dashPos = 'center-right'; spacePos = 'center right'; }
    else if (row === 'center' && col === 'center') { dashPos = 'top-center'; spacePos = 'top center'; }
    else if (row === 'center' && col === 'right') { dashPos = 'center-left'; spacePos = 'center left'; }
    else if (row === 'bottom' && col === 'left') { dashPos = 'top-right'; spacePos = 'top right'; }
    else if (row === 'bottom' && col === 'center') { dashPos = 'top-center'; spacePos = 'top center'; }
    else if (row === 'bottom' && col === 'right') { dashPos = 'top-left'; spacePos = 'top left'; }
    
    tooltip.style.setProperty('--pos', dashPos);
    (tooltip.style as any).positionArea = spacePos; 
  };

  const onMouseDown = () => {
    isDragging = true;
    document.body.style.cursor = 'grabbing';
    anchor.style.cursor = 'grabbing';
  };

  const onMouseUp = () => {
    isDragging = false;
    document.body.style.cursor = 'default';
    anchor.style.cursor = 'grab';
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    anchor.style.position = 'absolute';
    anchor.style.left = `${e.clientX}px`;
    anchor.style.top = `${e.clientY}px`;
    anchor.style.transform = 'translate(-50%, -50%)';
    updateTooltipPosition();
  };

  if (dragEnabled) {
    anchor.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);
  }

  window.addEventListener('resize', updateTooltipPosition);
  
  // Initialize layout on mount
  updateTooltipPosition();

  // Return a cleanup method for frameworks (React useEffect, Svelte onDestroy, etc.)
  return {
    destroy: () => {
      if (dragEnabled) {
        anchor.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mouseup', onMouseUp);
        window.removeEventListener('mousemove', onMouseMove);
      }
      window.removeEventListener('resize', updateTooltipPosition);
    }
  };
}
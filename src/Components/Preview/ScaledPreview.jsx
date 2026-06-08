import React, { useEffect, useRef } from "react";

const ScaledPreview = ({ children, containerClassName = "" }) => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current || !wrapperRef.current || !contentRef.current) return;
      
      const containerWidth = containerRef.current.offsetWidth;
      const targetWidth = 793.7; 
      
      const scale = Math.min(1, (containerWidth * 0.9) / targetWidth);
      
      const scaledWidth = targetWidth * scale;
      const offsetX = Math.max(0, (containerWidth - scaledWidth) / 2);

      contentRef.current.style.transform = `scale(${scale})`;
      contentRef.current.style.left = `${offsetX}px`;
      
      const contentHeight = contentRef.current.offsetHeight;
      wrapperRef.current.style.height = `${contentHeight * scale}px`;
    };

    const observer = new ResizeObserver(() => {
      window.requestAnimationFrame(updateScale);
    });

    if (containerRef.current) observer.observe(containerRef.current);
    if (contentRef.current) observer.observe(contentRef.current);

    updateScale();
    return () => observer.disconnect();
  }, [children]);

  return (
    <div ref={containerRef} className={`w-full flex justify-center ${containerClassName}`}>
      <div ref={wrapperRef} className="relative overflow-hidden w-full transition-all duration-200">
        <div 
          ref={contentRef} 
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '210mm',
            transformOrigin: 'top left'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default ScaledPreview;

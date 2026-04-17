import React from 'react';

export default function MetalPlate({
  title,
  children,
  className = ""
}) {
  return (
    <div className={`riveted-panel metal-surface p-6 ${className}`}>
      {title && (
        <div className="border-b border-[var(--color-metal-light)] pb-2 mb-4">
          <h3 className="font-[var(--font-engraved)] text-xl text-[var(--color-text-engraved)] tracking-widest text-center">
            {title}
          </h3>
        </div>
      )}
      <div className="font-[var(--font-body)] text-[var(--color-text-display)] text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}

import React from 'react';
import { MousePointerClick } from 'lucide-react';

interface InteractableProps {
  x: number | string;
  y: number | string;
  width: number | string;
  height: number | string;
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  sfx?: string;
}

export default function Interactable({ x, y, width, height, label, onClick, icon, sfx }: InteractableProps) {
  return (
    <button
      className="interactable-obj"
      style={{
        left: x,
        top: y,
        width,
        height,
      }}
      data-sfx={sfx}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      title={label}
      aria-label={label}
    >
      <div className="interactable-hint">
        {icon || <MousePointerClick size={20} />}
        <span>{label}</span>
      </div>
    </button>
  );
}

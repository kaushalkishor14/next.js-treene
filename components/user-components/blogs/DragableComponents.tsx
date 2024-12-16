import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { DraggableComponentProps } from '@/types/blog';

export const DraggableComponent = ({ type, icon, label }: DraggableComponentProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-${type}`,
    data: { type },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors"
    >
      <span className="text-gray-600">{icon}</span>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  );
};
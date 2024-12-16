import React, { useState } from 'react';
import { 
  Heading1, 
  Heading2, 
  Image, 
  Type, 
  Code,
  List,
  ListOrdered,
  Quote,
  Minus,
  PanelRightClose,
  PanelRight
} from 'lucide-react';
import { DraggableComponent } from './DragableComponents';

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const components = [
    { type: 'heading1', icon: <Heading1 size={24} />, label: 'Heading 1' },
    { type: 'heading2', icon: <Heading2 size={24} />, label: 'Heading 2' },
    { type: 'paragraph', icon: <Type size={24} />, label: 'Text' },
    { type: 'image', icon: <Image size={24} />, label: 'Image' },
    { type: 'code', icon: <Code size={24} />, label: 'Code' },
    { type: 'bulletList', icon: <List size={24} />, label: 'Bullet List' },
    { type: 'numberedList', icon: <ListOrdered size={24} />, label: 'Numbered List' },
    { type: 'quote', icon: <Quote size={24} />, label: 'Quote' },
    { type: 'divider', icon: <Minus size={24} />, label: 'Divider' },
  ] as const;

  return (
    <>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`fixed top-4 right-4 z-20 p-2 rounded-lg bg-white shadow-md hover:bg-gray-50 transition-all ${
          isCollapsed ? 'translate-x-0' : 'translate-x-0'
        }`}
      >
        {isCollapsed ? <PanelRight size={20} /> : <PanelRightClose size={20} />}
      </button>
      <div
        className={`fixed right-0 top-0 h-screen bg-white border-l border-gray-200 shadow-lg transition-all duration-300 transform ${
          isCollapsed ? 'translate-x-full' : 'translate-x-0'
        }`}
        style={{ width: '16rem' }}
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Components</h2>
          <div className="space-y-2">
            {components.map((component) => (
              <DraggableComponent
                key={component.type}
                type={component.type}
                icon={component.icon}
                label={component.label}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
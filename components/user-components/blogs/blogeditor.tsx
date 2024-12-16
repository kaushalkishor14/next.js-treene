
'use client'
import React, { useState, useEffect } from 'react';
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { v4 as uuidv4 } from 'uuid';
import { Save, Eye, Edit } from 'lucide-react';
import { Sidebar } from "@/components/user-components/blogs/SideBar";
import { EditableBlock } from '@/components/user-components/blogs/EditableBlog';
import type { Block, BlockType } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import SavePopModal from '@/components/user-components/blogs/saveToDatabase';

function App() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    const savedContent = localStorage.getItem('blog-content');
    if (savedContent) {
      try {
        setBlocks(JSON.parse(savedContent));
      } catch (e) {
        console.error('Failed to load saved content:', e);
      }
    }
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      // If dragging from sidebar to main area (no specific target)
      if (active.id.toString().startsWith('draggable-')) {
        const type = active.data.current?.type as BlockType;
        const newBlock: Block = {
          id: uuidv4(),
          type,
          content: '',
          language: type === 'code' ? 'javascript' : undefined,
        };
        setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
      }
      return;
    }

    // If dragging between blocks
    if (!active.id.toString().startsWith('draggable-')) {
      const oldIndex = blocks.findIndex((block) => block.id === active.id);
      const newIndex = blocks.findIndex((block) => block.id === over.id);

      if (oldIndex !== newIndex) {
        const newBlocks = [...blocks];
        const [movedBlock] = newBlocks.splice(oldIndex, 1);
        newBlocks.splice(newIndex, 0, movedBlock);
        setBlocks(newBlocks);
      }
    } else {
      // If dragging from sidebar to a specific position
      const type = active.data.current?.type as BlockType;
      const newBlock: Block = {
        id: uuidv4(),
        type,
        content: '',
        language: type === 'code' ? 'javascript' : undefined,
      };
      const overIndex = blocks.findIndex((block) => block.id === over.id);
      const newBlocks = [...blocks];
      newBlocks.splice(overIndex + 1, 0, newBlock);
      setBlocks(newBlocks);
    }
  };

  const updateBlock = (id: string, content: string, language?: string) => {
    setBlocks(blocks.map((block) => 
      block.id === id ? { ...block, content, language } : block
    ));
  };

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter((block) => block.id !== id));
  };

  const handleSave = () => {
    localStorage.setItem('blog-content', JSON.stringify(blocks));
    toast('Blog content saved successfully!');
  };


  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 px-4 py-2 flex justify-evenly gap-2">
          <h1 className="text-xl font-bold text-gray-800 items-start">Blog Editor</h1>
          <div className="flex gap-2 ">
            <Button
              disabled={blocks.length === 0}
              onClick={() => setBlocks([])}
              className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"  
            >
              <Save size={18} />
              Clear All
            </Button>
            
              <SavePopModal block={blocks} setBlocks={setBlocks}>
                <Button 
                  disabled={blocks.length === 0}
                  >
                  <Save size={18} />
                    Save to DB
                </Button>
              </SavePopModal> 
           
            <Button
              disabled={blocks.length === 0}
              onClick={handleSave}
              className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              <Save size={18} />
              Save local
            </Button>
            <Button
              disabled={blocks.length === 0}
              onClick={() => setIsPreview(!isPreview)}
              className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              {isPreview ? <Edit size={18} /> : <Eye size={18} />}
              {isPreview ? 'Edit' : 'Preview'}
            </Button>
          </div>
        </div>
        <Sidebar />
        <main className="pt-16 pb-8 px-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-6 min-h-[calc(100vh-8rem)]">
            <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
              {blocks.map((block) => (
                <EditableBlock
                  key={block.id}
                  block={block}
                  onUpdate={updateBlock}
                  onDelete={deleteBlock}
                  isPreview={isPreview}
                />
              ))}
            </SortableContext>
            {blocks.length === 0 && (
              <div className="text-center text-gray-400 py-20">
                {isPreview 
                  ? "No content to preview yet"
                  : "Drag components here to start building your blog post"}
              </div>
            )}
          </div>
        </main>
      </div>
      <DragOverlay />
    </DndContext>
  );
}

export default App;
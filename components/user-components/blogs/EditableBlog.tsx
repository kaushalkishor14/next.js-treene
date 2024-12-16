import React, { useState, useEffect, useRef } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, X } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import type { Block } from '@/types/blog';

interface EditableBlockProps {
  block: Block;
  onUpdate: (id: string, content: string, language?: string) => void;
  onDelete: (id: string) => void;
  isPreview?: boolean;
}

export const EditableBlock = ({ block, onUpdate, onDelete, isPreview = false }: EditableBlockProps) => {
  const [content, setContent] = useState(block.content);
  const [language, setLanguage] = useState(block.language || 'javascript');
  const codeRef = useRef<HTMLElement>(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    setContent(block.content);
    if (block.type === 'code' && codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [block.content, isPreview]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setContent(e.target.value);
    onUpdate(block.id, e.target.value, language);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    onUpdate(block.id, content, e.target.value);
  };

  const renderContent = () => {
    if (isPreview) {
      switch (block.type) {
        case 'heading1':
          return <h1 className="text-4xl font-bold mb-4">{content}</h1>;
        case 'heading2':
          return <h2 className="text-2xl font-semibold mb-3">{content}</h2>;
        case 'image':
          return content ? <img src={content} alt="Blog content" className="max-w-full h-auto rounded-lg" /> : null;
        case 'code':
          return (
            <div className="relative rounded-lg overflow-hidden">
              <pre className="!bg-gray-800 !p-4 !m-0">
                <code ref={codeRef} className={`language-${language}`}>
                  {content}
                </code>
              </pre>
            </div>
          );
        case 'bulletList':
          return (
            <ul className="list-disc list-inside space-y-1">
              {content.split('\n').map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          );
        case 'numberedList':
          return (
            <ol className="list-decimal list-inside space-y-1">
              {content.split('\n').map((item, i) => (
                <li key={i}>{i+1+"."} {item}</li>
              ))}
            </ol>
          );
        case 'quote':
          return (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic">
              {content}
            </blockquote>
          );
        case 'divider':
          return <hr className="my-4 border-gray-200" />;
        default:
          return <p className="mb-4">{content}</p>;
      }
    }

    switch (block.type) {
      case 'heading1':
        return (
          <input
            type="text"
            value={content}
            onChange={handleChange}
            className="w-full text-4xl font-bold bg-transparent outline-none"
            placeholder="Heading 1"
          />
        );
      case 'heading2':
        return (
          <input
            type="text"
            value={content}
            onChange={handleChange}
            className="w-full text-2xl font-semibold bg-transparent outline-none"
            placeholder="Heading 2"
          />
        );
      case 'image':
        return (
          <input
            type="text"
            value={content}
            onChange={handleChange}
            className="w-full bg-transparent outline-none"
            placeholder="Enter image URL"
          />
        );
      case 'code':
        return (
          <div className="space-y-2">
            <select
              value={language}
              onChange={handleLanguageChange}
              className="block w-full bg-gray-700 text-white rounded-md px-3 py-1"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
            </select>
            <textarea
              value={content}
              onChange={handleChange}
              className="w-full font-mono bg-gray-800 text-gray-100 p-4 rounded-lg outline-none"
              placeholder="Enter code here"
              rows={5}
            />
          </div>
        );
      case 'bulletList':
      case 'numberedList':
        return (
          <textarea
            value={content}
            onChange={handleChange}
            className="w-full bg-transparent outline-none"
            placeholder="Start typing..."
            rows={3}
          />
        );
      case 'quote':
        return (
          <textarea
            value={content}
            onChange={handleChange}
            className="w-full bg-transparent outline-none resize-none border-l-4 border-gray-300 pl-4"
            placeholder="Enter quote"
            rows={3}
          />
        );
      case 'divider':
        return <hr className="my-4 border-gray-200" />;
      default:
        return (
          <textarea
            value={content}
            onChange={handleChange}
            className="w-full bg-transparent outline-none resize-none"
            placeholder="Start typing..."
            rows={3}
          />
        );
    }
  };

  if (block.type === 'divider') {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="group relative py-4"
      >
        <div
          {...attributes}
          {...listeners}
          className="cursor-move opacity-0 group-hover:opacity-100 transition-opacity absolute left-0 top-1/2 -translate-y-1/2"
        >
          <GripVertical className="text-gray-400" />
        </div>
        <hr className="border-gray-200" />
        {!isPreview && (
          <button
            onClick={() => onDelete(block.id)}
            className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="text-gray-400 hover:text-red-500" size={20} />
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative flex gap-2 p-4 hover:bg-gray-50 rounded-lg transition-colors"
    >
      {!isPreview && (
        <>
          <div
            {...attributes}
            {...listeners}
            className="cursor-move opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <GripVertical className="text-gray-400" />
          </div>
          <button
            onClick={() => onDelete(block.id)}
            className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="text-gray-400 hover:text-red-500" size={20} />
          </button>
        </>
      )}
      <div className="flex-1">{renderContent()}</div>
    </div>
  );
};
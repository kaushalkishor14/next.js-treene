export type BlockType = 
  | 'heading1'
  | 'heading2'
  | 'paragraph'
  | 'image'
  | 'code'
  | 'bulletList'
  | 'numberedList'
  | 'quote'
  | 'divider';

export interface Block {
  id: string;
  type: BlockType;
  content: string;
  language?: string;
}

export interface DraggableComponentProps {
  type: BlockType;
  icon: React.ReactNode;
  label: string;
}
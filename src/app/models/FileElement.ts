export interface FileElement {
    id?: string;
    isFolder: boolean;
    name: string;
    parent?: string;
    tags?:string[];
    children?:FileElement[];
  }
  
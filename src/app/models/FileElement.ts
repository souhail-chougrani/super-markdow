export interface  FileContent{
  title:string;
  body:string;
  status?:'saved' | 'in progress' | 'deleted'
}

export interface FileElement {
    id?: string;
    isFolder: boolean;
    name: string;
    parent?: string;
    tags?:string[];
    content?:FileContent
    children?:FileElement[];
  }
  
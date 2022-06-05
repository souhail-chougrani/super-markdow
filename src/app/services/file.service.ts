import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import * as uuid from 'uuid';
import { FileElement } from '../models/FileElement';

export interface IFileService {
  add(fileElement: FileElement):FileElement;
  delete(id: string):void;
  update(id: string, update: Partial<FileElement>):void;
  queryFolder(folderId: string): Observable<FileElement[]>;
  get(id: string): FileElement;
}




@Injectable({providedIn:'root'})
export class FileService implements IFileService {
  private dataSource = new Map<string, FileElement>();
  private querySubject: BehaviorSubject<FileElement[]> = new BehaviorSubject([] as FileElement[]) ;
  
  constructor() {}

  add(fileElement: FileElement) {
    fileElement.id = uuid.v4();
    this.dataSource.set(fileElement.id, this.clone(fileElement));
    return fileElement;
  }

  delete(id: string) {
    this.dataSource.delete(id);
  }

  update(id: string, update: Partial<FileElement>) {
    let element = this.dataSource.get(id);
    element = Object.assign(element, update);
    if(element){
        this.dataSource.set(element.id as string, element);
    }
  }

  queryFolder() {
    let result :any;
    this.dataSource.forEach(element => {
        if(element.isFolder || (!element.isFolder && element.parent==='root')){
            result ={...result,[element.id as string]:{...element,children:[]}};
        }
    
        this.dataSource.forEach(e=>{
            if (e.parent === element.id) {
                result[e.parent as string].children = [...result[e.parent as string].children,e]
            }
        })
    });
    console.log(Array.from(this.dataSource).map(([k,value])=>({[k]:value})))
    this.querySubject.next( Object.values(result ?? {}));
    return this.querySubject.asObservable();
  }

  
  filterFiles(filter:string) {
    let result :any;
    let original = this.dataSource
    original =  new Map(
      Array.from(this.dataSource).filter(([key, value]) => {
        if (value.name.includes(filter)) {
          return true;
        }else{
          return false
        }
    
      }),
    );
    
    original.forEach(element => {
        if(element.isFolder || (!element.isFolder && element.parent==='root')){
            result ={...result,[element.id as string]:{...element,children:[]}};
        }
    
        original.forEach(e=>{
            if (e.parent === element.id) {
                result[e.parent as string].children = [...result[e.parent as string].children,e]
            }
        })
    });
    this.querySubject.next( Object.values(result??{}));
    return this.querySubject.asObservable();
  }

  get(id: string) {
    return this.dataSource.get(id) as FileElement;
  }

  clone(element: FileElement) {
    return JSON.parse(JSON.stringify(element));
  }


}


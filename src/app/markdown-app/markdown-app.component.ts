import { Component, OnInit } from '@angular/core';
import { FileElement } from '../models/FileElement';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-markdown-app',
  templateUrl: './markdown-app.component.html',
  styleUrls: ['./markdown-app.component.scss']
})
export class MarkdownAppComponent implements OnInit {
  fileElements!: any[];

  constructor(public fileService: FileService) { }

  ngOnInit(): void {
    const folderA = this.fileService.add({ name: 'Folder A', isFolder: true, parent: 'root' });
    const folderB = this.fileService.add({ name: 'Folder B', isFolder: true, parent: 'root' });
    this.fileService.add({ name: 'File C', isFolder: false, parent: folderA.id });
    this.fileService.add({ name: 'File ROOT2', isFolder: false, parent: 'root' });
    this.fileService.add({ name: 'File ROOT1', isFolder: false, parent: 'root' });
    this.fileService.add({ name: 'File D', isFolder: false, parent: folderA.id });
    this.fileService.add({ name: 'File E', isFolder: false, parent: folderB.id });
    this.fileService.add({ name: 'File F', isFolder: false, parent: folderB.id });
    this.fileService.add({ name: 'Folder G', isFolder: true, parent: 'root' });
    this.fileService.queryFolder().subscribe(r => this.fileElements = r);
  }


  addFolder(folder: { name: string }, parent?: FileElement) {
    this.fileService.add({
      isFolder: true,
      name: folder.name,
      parent: parent ? parent.id : 'root',
    });
    this.fileService.queryFolder();
  }

  addFile(file: { name: string }, parent?: FileElement) {
    this.fileService.add({
      isFolder: false,
      name: file.name,
      parent: parent ? parent.id : 'root',
    });
    this.fileService.queryFolder();
  }

  removeElement(element: FileElement) {
    this.fileService.delete(element.id as string);
    this.fileService.queryFolder();
  }


  moveElement( value:any ) {
    const {element:moveTo,self} = value
    this.fileService.update(self.id as string, { parent: moveTo.id });
    this.fileService.queryFolder();
  }

  renameElement(element: FileElement) {
    this.fileService.update(element.id as string, { name: element.name });
  }


}

import { MediaMatcher } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { FileElement } from './models/FileElement';
import { FileService } from './services/file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('appDrawer') appDrawer?: ElementRef;

  theme = new FormControl("default-theme");

  themes = [
    { value: 'default-theme', label: 'Blue' },
    { value: 'light-theme', label: 'Light' },
    { value: 'black-theme', label: 'Dark' }
  ];
  currentRoot!: FileElement | null;
  currentPath!: string;
  canNavigateUp = false;
  fileElements!: any[];

  constructor(
    private overlayContainer: OverlayContainer,
    public fileService: FileService
  ) {
  }

  ngOnInit(): void {
    this.setTheme();
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

  setTheme() {
    console.log(this.theme.value)
    const classList =
      this.overlayContainer.getContainerElement().classList;
    const toRemove = Array.from(classList).filter((item: string) =>
      item.includes('-theme')
    );
    if (toRemove.length) {
      classList.remove(...toRemove);
    }
    classList.add(this.theme.value);
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
    console.log(element);
    this.fileService.update(element.id as string, { name: element.name });
  }


  ngOnDestroy(): void {
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app-store/app.state';
import { selectToggleSidebar } from '../app-store/settings/selectors/settings.selector';
import { FileElement } from '../models/FileElement';
import { FileService } from '../services/file.service';
import { addFile, getFiles, getFilesVisualised, getSelectedFile, removeFile } from './markdown-store';
import { FileState } from './markdown-store/reducers/file.reducer';

@Component({
  selector: 'app-markdown-app',
  templateUrl: './markdown-app.component.html',
  styleUrls: ['./markdown-app.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MarkdownAppComponent implements OnInit {
  fileElements!: any[];
  filesElements$!:Observable<any[]>;
  toggleSidebar$!:Observable<boolean>;
  selectedFile$!:Observable<FileElement>;
  constructor(public fileService: FileService,private store:Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(getFiles())
    this.toggleSidebar$ = this.store.pipe(select(selectToggleSidebar));
    this.filesElements$ = this.store.pipe(select(getFilesVisualised))
    
  }


  addFolder(folder: { name: string }, parent?: FileElement) {
    console.log('add file')
    // const addedFolder :FileElement = {isFolder:true,name:folder.name,parent:'root'}
    // this.store.dispatch(addFile({file: addedFolder}))
  }

  addFile(file: { name: string }, parent?: FileElement) {
    const addedFolder: FileElement = { isFolder: false, name: file.name, content: { title: "sss", body: "sss" }, parent: 'root' }
    this.store.dispatch(addFile({file: addedFolder}))
  }

  removeFile(element: FileElement) {

    this.store.dispatch(removeFile({id:element.id as string}))

  }


  moveElement( value:any ) {
    // const {element:moveTo,self} = value
    // this.fileService.update(self.id as string, { parent: moveTo.id });
    // this.fileService.queryFolder();

  }

  renameElement(element: FileElement) {
    // this.fileService.update(element.id as string, { name: element.name });
  }


}

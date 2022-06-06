import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { debounceTime, Observable, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { AppState } from 'src/app/app-store/app.state';
import { addFile, getSelectedFile, removeFile, selectFolders, updateFile } from 'src/app/markdown-app/markdown-store';
import { FileContent, FileElement } from 'src/app/models/FileElement';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownComponent implements OnInit, OnDestroy {

  selectedFile$!: Observable<any>;
  fileContentform!: FormGroup;
  folders$!:Observable<FileElement[]>;


  private unsubscribe: Subject<any> = new Subject<any>();


  constructor(private fb: FormBuilder, private store: Store<AppState>,public dialog: MatDialog,) {
    this.fileContentform = this.fb.group({
      title: "",
      markdown: "",
      tags: [[]],
    })
  }


  ngOnInit() {
    this.folders$ = this.store.select(selectFolders);
    this.selectedFile$ = this.store.pipe(select(getSelectedFile),

      tap(fileElement => {
        this.fileContentform.setValue({
          title: fileElement?.content?.title ?? "",
          markdown: fileElement?.content?.body ?? "",
          tags: fileElement?.tags ?? []
        })
      })
    );
    this.fileContentform.valueChanges.pipe(
      debounceTime(500),
      switchMap(formValue => of(formValue)),

      takeUntil(this.unsubscribe)
    )
  }


  addKeywordFromInput(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.fileContentform.get('tags')?.setValue([...this.fileContentform.get('tags')?.value ?? [], value.trim()]);
      this.fileContentform.get('tags')?.updateValueAndValidity();
    }

    if (input) {
      input.value = '';
    }
  }

  removeKeyword(keyword: string) {
    const index = this.fileContentform.get('tags')?.value.indexOf(keyword);

    if (index >= 0) {
      this.fileContentform.get('tags')?.value.splice(index, 1);
      this.fileContentform.get('tags')?.updateValueAndValidity();
    }
  }

  onDelete(id: string) {
    this.store.dispatch(removeFile({ id }));


  }

  onUpdate(file: FileElement) {
    const content: FileContent = {
      body: this.fileContentform.value?.markdown,
      title: this.fileContentform.value?.title
    }
    const fileToUpdate: FileElement = { ...file, content, tags: this.fileContentform.value.tags }
    this.store.dispatch(updateFile({ file: fileToUpdate }))
  }

  onSave() {
    this.openDialog(false)
   }


openDialog(isFolder:boolean){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {isFolder},

    });
    const content: FileContent = {
      body: this.fileContentform.value?.markdown,
      title: this.fileContentform.value?.title,
    }
    const tags = this.fileContentform.value?.tags
    dialogRef.afterClosed().subscribe(result => {
      if(result?.length){
        const addedFolder: FileElement = isFolder ? { isFolder: isFolder, name: result,tags, content, parent: 'root' }
           : {isFolder:isFolder,tags,content,name:result,parent:'root'}
        this.store.dispatch(addFile({file: addedFolder}))

      }
    });
  }
  ngOnDestroy() {
    this.unsubscribe.next(null); 
    this.unsubscribe.complete();
  }


}

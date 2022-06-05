import { ChangeDetectionStrategy, Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { select, Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { AppState } from 'src/app/app-store/app.state';
import { getSelectedFile, removeFile, updateFile } from 'src/app/markdown-app/markdown-store';
import { FileContent, FileElement } from 'src/app/models/FileElement';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MarkdownComponent implements OnInit {

  selectedFile$!:Observable<any>;
  fileContentform! : FormGroup;

  constructor(private fb:FormBuilder,private store:Store<AppState>) {
    this.fileContentform = this.fb.group({
      title:"",
      markdown:"",
      tags:[[]],
    })
   }


  ngOnInit() {
    this.selectedFile$ = this.store.pipe(select(getSelectedFile),
    
    tap(fileElement=>{
      this.fileContentform.setValue({
        title:fileElement?.content?.title ?? "",
        markdown:fileElement?.content?.body ?? "",
        tags : fileElement?.tags ?? []
      })
    })
    )
  }


  addKeywordFromInput(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.fileContentform.get('tags')?.setValue([...this.fileContentform.get('tags')?.value ??[], value.trim()]);
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

  onDelete(id:string){
      this.store.dispatch(removeFile({id}));
 

  }

 onUpdate(file:FileElement){
   const content:FileContent = {
     body:this.fileContentform.value?.markdown,
     title:this.fileContentform.value?.title 
    } 
    const fileToUpdate :FileElement= {...file,content,tags:this.fileContentform.value.tags}
    this.store.dispatch(updateFile ({file:fileToUpdate}))  
  }

  onSave(){}


}

import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { switchMap, tap } from 'rxjs';
import { AppState } from 'src/app/app-store/app.state';
import { addFile } from 'src/app/markdown-app/markdown-store';
import { FileElement } from 'src/app/models/FileElement';
import { FileService } from 'src/app/services/file.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-sidebar-filter',
  templateUrl: './sidebar-filter.component.html',
  styleUrls: ['./sidebar-filter.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SidebarFilterComponent implements OnInit {
  @Output()
  addNewFolder :EventEmitter<any> = new EventEmitter<any>();
  @Output()
  addNewFile :EventEmitter<any> = new EventEmitter<any>();

  tags = new Set(['angular', 'how-to', 'tutorial']);
  tagesFrom : FormControl = new FormControl(null);
  filterForm : FormControl = new FormControl("");
  constructor(private fileService : FileService,public dialog: MatDialog,private store:Store<AppState>) { }

  ngOnInit(): void {
    this.filterForm.valueChanges.pipe(
      switchMap(value=>this.fileService.filterFiles(value)),
    ).subscribe();
  }

  addKeywordFromInput(event: MatChipInputEvent) {
    if (event.value) {
      this.tags.add(event.value);
      event.chipInput!.clear();
    }
  }

  removeKeyword(keyword: string) {
    this.tags.delete(keyword);
  }

  openDialog(isFolder:boolean){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {isFolder},

    });

    dialogRef.afterClosed().subscribe(result => {
      if(result?.length){
        const addedFolder: FileElement = isFolder ? { isFolder: isFolder, name: result, content: { title: "", body: "" }, parent: 'root' }
           : {isFolder:isFolder,name:result,parent:'root'}
        this.store.dispatch(addFile({file: addedFolder}))

      }
    });

  }

}

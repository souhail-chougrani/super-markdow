import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app-store/app.state';
import { selectFolders } from 'src/app/markdown-app/markdown-store';
import { FileElement } from 'src/app/models/FileElement';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  nameForm:FormControl = new FormControl(null);
  constructor(private store : Store<AppState> , public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

  }


  onClick(name?:string): void {
    this.dialogRef.close(name);
  }
}

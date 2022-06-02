import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { FileElement } from 'src/app/models/FileElement';

@Component({
  selector: 'app-sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.scss']
})
export class SidebarContentComponent implements OnInit {
  @Output()
  addNewFolder :EventEmitter<any> = new EventEmitter<any>();
  @Output()
  addNewFile :EventEmitter<any> = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
  }

}

import { trigger, state, style, transition, animate, group } from '@angular/animations';
import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { FileElement } from 'src/app/models/FileElement';
import { FileService } from 'src/app/services/file.service';



@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class FileManagerComponent implements OnInit {

  expanded!: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() fileElement!: FileElement;
  @Input() folders!: FileElement[];
  @Input() depth!: number;

  
  @Output()
  removeFolder: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  removeFile: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  moveFile: EventEmitter<any> = new EventEmitter<any>();



  isCollapsed: boolean = true;
  isExpanded: boolean = false;
  constructor(public fileService: FileService
  ) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit(): void {

  }

  
  onItemSelected(item: FileElement) {

    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }

  onRemoveFile(element:FileElement){
    this.fileService.delete(element.id as string);
    this.fileService.queryFolder();
    }
}

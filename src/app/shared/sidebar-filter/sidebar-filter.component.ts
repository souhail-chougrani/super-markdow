import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { switchMap, tap } from 'rxjs';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-sidebar-filter',
  templateUrl: './sidebar-filter.component.html',
  styleUrls: ['./sidebar-filter.component.scss']
})
export class SidebarFilterComponent implements OnInit {
  tags = new Set(['angular', 'how-to', 'tutorial']);
  tagesFrom : FormControl = new FormControl(null);
  filterForm : FormControl = new FormControl("");
  constructor(private fileService : FileService) { }

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

}

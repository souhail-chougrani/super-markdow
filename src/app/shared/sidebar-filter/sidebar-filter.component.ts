import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-sidebar-filter',
  templateUrl: './sidebar-filter.component.html',
  styleUrls: ['./sidebar-filter.component.scss']
})
export class SidebarFilterComponent implements OnInit {
  tags = new Set(['angular', 'how-to', 'tutorial']);
  tagesFrom : FormControl = new FormControl(null);
  constructor() { }

  ngOnInit(): void {
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

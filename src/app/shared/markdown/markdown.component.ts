import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss']
})
export class MarkdownComponent implements OnInit {


  tags = new Set(['angular', 'how-to', 'tutorial']);
  tagesFrom: FormControl = new FormControl(null);



  markdownInit = `## Markdown __rulez__!
---

### Syntax highlight
\`\`\`typescript
const language = 'typescript';
\`\`\`

### Lists
1. Ordered list
2. Another bullet point
   - Unordered list
   - Another unordered bullet

### Blockquote
> Blockquote to the max`;
  markdown: FormControl = new FormControl(this.markdownInit)
  constructor() { }

  ngOnInit() {

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

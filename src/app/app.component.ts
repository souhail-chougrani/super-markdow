import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FileElement } from './models/FileElement';
import { FileService } from './services/file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  theme = new FormControl("default-theme");

  themes = [
    { value: 'default-theme', label: 'Blue' },
    { value: 'light-theme', label: 'Light' },
    { value: 'black-theme', label: 'Dark' }
  ];
 

  constructor(
    private overlayContainer: OverlayContainer,
  ) {
  }

  ngOnInit(): void {
    this.setTheme();
  }

  setTheme() {
    console.log(this.theme.value)
    const classList =
      this.overlayContainer.getContainerElement().classList;
    const toRemove = Array.from(classList).filter((item: string) =>
      item.includes('-theme')
    );
    if (toRemove.length) {
      classList.remove(...toRemove);
    }
    classList.add(this.theme.value);
  }
 

  ngOnDestroy(): void {
  }
}

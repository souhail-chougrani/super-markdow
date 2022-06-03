import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkdownAppRoutingModule } from './markdown-app-routing.module';
import { MarkdownAppComponent } from './markdown-app.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MarkdownAppComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MarkdownAppRoutingModule,
    SharedModule,

  ]
})
export class MarkdownAppModule { }

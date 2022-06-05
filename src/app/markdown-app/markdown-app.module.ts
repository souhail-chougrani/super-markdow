import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkdownAppRoutingModule } from './markdown-app-routing.module';
import { MarkdownAppComponent } from './markdown-app.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import  {StoreModule} from '@ngrx/store'
import { reducers } from './markdown-store';

@NgModule({
  declarations: [
    MarkdownAppComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('files', reducers),
    MarkdownAppRoutingModule,
    SharedModule,

  ]
})
export class MarkdownAppModule { }

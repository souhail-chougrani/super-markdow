import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkdownAppRoutingModule } from './markdown-app-routing.module';
import { MarkdownAppComponent } from './markdown-app.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import  {StoreModule} from '@ngrx/store'
import { FileEffects, reducers } from './markdown-store';
import { EffectsFeatureModule, EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    MarkdownAppComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('files', reducers),
    EffectsModule.forFeature([FileEffects]),
    MarkdownAppRoutingModule,
    SharedModule,

  ]
})
export class MarkdownAppModule { }

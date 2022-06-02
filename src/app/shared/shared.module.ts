import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material.module';
import { SidebarContentComponent } from './sidebar-content/sidebar-content.component';
import { SidebarFilterComponent } from './sidebar-filter/sidebar-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { MarkdownComponent } from './markdown/markdown.component';
import { MarkdownModule } from 'ngx-markdown';



@NgModule({
  declarations: [
    SidebarContentComponent,
    SidebarFilterComponent,
    FileManagerComponent,
    MarkdownComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot(),
    
  ],
  exports:[AngularMaterialModule,SidebarFilterComponent,SidebarContentComponent,FileManagerComponent,MarkdownComponent]
})
export class SharedModule { }

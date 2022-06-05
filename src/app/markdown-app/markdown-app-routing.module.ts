import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownAppComponent } from './markdown-app.component';

const routes: Routes = [
  { path: 'new', component: MarkdownAppComponent },
  { path: ':id', component: MarkdownAppComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarkdownAppRoutingModule { }

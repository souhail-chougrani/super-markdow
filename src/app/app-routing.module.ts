import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'markdown-app',pathMatch:'full'},
  { path: 'markdown-app', loadChildren: () => import('./markdown-app/markdown-app.module').then(m => m.MarkdownAppModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

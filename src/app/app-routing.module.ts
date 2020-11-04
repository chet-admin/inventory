import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinalPageComponent } from './final-page/final-page.component';

const routes: Routes = [{
  path: 'first-component',component:FinalPageComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

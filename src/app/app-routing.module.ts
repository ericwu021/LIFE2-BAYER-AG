import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreEnComponent } from './core-en/core-en.component';
import { CoreGermanComponent } from './core-german/core-german.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

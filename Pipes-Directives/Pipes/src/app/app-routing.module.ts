import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LikesComponent } from './likes/likes.component';
import { CommonModule } from '@angular/common';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';

const routes: Routes = [

  {path:"likes",component:LikesComponent},
  {path : "parent", component:ParentComponent},
  {path : "child", component : ChildComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

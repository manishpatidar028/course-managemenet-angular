import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditContentComponent } from './components/add-edit-content/add-edit-content.component';
import { ContentListComponent } from './components/content-list/content-list.component';

const routes: Routes = [
  {
    path: '',
        component:ContentListComponent,
  },

  {
    path: 'add',
        component:AddEditContentComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }

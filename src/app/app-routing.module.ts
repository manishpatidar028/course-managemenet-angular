import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {//migrated
    path: 'auth',
    loadChildren: () => import('./public/authentication/authentication.module').then(m => m.AuthenticationModule),
  },
  {//migrated
    path: 'category',
    loadChildren: () => import('./public/category/category.module').then(m => m.CategoryModule),
  },
  {//migrated
    path: 'content',
    loadChildren: () => import('./public/content/content.module').then(m => m.ContentModule),
  },

  {//migrated
    path: 'profile',
    loadChildren: () => import('./public/profile/profile.module').then(m => m.ProfileModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

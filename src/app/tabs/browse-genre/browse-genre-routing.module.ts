import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrowseGenrePage } from './browse-genre.page';

const routes: Routes = [
  {
    path: '',
    component: BrowseGenrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrowseGenrePageRoutingModule {}

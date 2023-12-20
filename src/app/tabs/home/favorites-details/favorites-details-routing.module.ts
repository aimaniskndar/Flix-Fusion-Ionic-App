import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoritesDetailsPage } from './favorites-details.page';

const routes: Routes = [
  {
    path: '',
    component: FavoritesDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritesDetailsPageRoutingModule {}

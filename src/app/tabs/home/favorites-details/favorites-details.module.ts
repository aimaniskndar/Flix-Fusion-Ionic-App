import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritesDetailsPageRoutingModule } from './favorites-details-routing.module';

import { FavoritesDetailsPage } from './favorites-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritesDetailsPageRoutingModule
  ],
  declarations: [FavoritesDetailsPage]
})
export class FavoritesDetailsPageModule {}

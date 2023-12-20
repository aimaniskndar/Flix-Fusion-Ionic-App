import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BrowseGenreDetailsPageRoutingModule } from './browse-genre-details-routing.module';

import { BrowseGenreDetailsPage } from './browse-genre-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrowseGenreDetailsPageRoutingModule
  ],
  declarations: [BrowseGenreDetailsPage]
})
export class BrowseGenreDetailsPageModule {}

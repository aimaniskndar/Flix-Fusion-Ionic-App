import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BrowseGenrePageRoutingModule } from './browse-genre-routing.module';

import { BrowseGenrePage } from './browse-genre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrowseGenrePageRoutingModule
  ],
  declarations: [BrowseGenrePage]
})
export class BrowseGenrePageModule {}

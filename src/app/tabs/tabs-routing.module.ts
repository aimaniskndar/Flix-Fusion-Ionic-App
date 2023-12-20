import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'movies',
        loadChildren: () => import('./movies/movies.module').then(m => m.MoviesPageModule)
      },
      {
        path: 'movies/:id',
        loadChildren: () => import('./movie-details/movie-details.module').then(m => m.MovieDetailsPageModule)
      },
      {
        path: 'shows',
        loadChildren: () => import('./shows/shows.module').then(m => m.ShowsPageModule)
      },
      {
        path: 'shows/:id',
        loadChildren: () => import('./show-details/show-details.module').then( m => m.ShowDetailsPageModule)
      },
      {
        path: 'browse',
        loadChildren: () => import('./browse/browse.module').then( m => m.BrowsePageModule)
      },
      {
        path: 'browse/:id',
        loadChildren: () => import('./browse-genre/browse-genre.module').then( m => m.BrowseGenrePageModule)
      },
      {
        path: 'browse/:id/:id',
        loadChildren: () => import('./browse-genre-details/browse-genre-details.module').then( m => m.BrowseGenreDetailsPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('./search/search.module').then(m => m.SearchPageModule)
      },
      {
        path: 'search/:id',
        loadChildren: () => import('./search-details/search-details.module').then( m => m.SearchDetailsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }

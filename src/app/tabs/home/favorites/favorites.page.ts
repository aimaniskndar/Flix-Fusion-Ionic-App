import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular'; // Future update

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favoritesMovies: any[] | undefined; // Define the type according to your API response
  favoritesTVShows: any[] | undefined; // Define the type according to your API response
  editing = false; // Flag to indicate whether in edit mode
  imageBaseUrl = environment.images;

  constructor(private contentService: ContentService, private alertController: AlertController) { }

  async ngOnInit() {
    // Fetch the favorites movies from the backend server
    this.contentService.getFavoritesMovies().subscribe((data) => {
      console.log('Data Fetched!:', data);
      this.favoritesMovies = data.results; // Assuming that the API response has a 'results' property containing the favorites movies
    });

    // Fetch the favorites tv shows from the backend server
    this.contentService.getFavoritesTVShows().subscribe((data) => {
      console.log('Data Fetched!:', data);
      this.favoritesTVShows = data.results; // Assuming that the API response has a 'results' property containing the favorites movies
    });
    
  }

  async toggleEdit() {
    this.editing = !this.editing;
  }

  // This feature is currently unavailable due to API version 3
  // async removeFromWatchlist(media: any) {
  //   const alert = await this.alertController.create({
  //     header: 'Confirm Removal',
  //     message: 'Are you sure you want to remove this media from your watchlist?',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //       },
  //       {
  //         text: 'Remove',
  //         handler: () => {
  //           this.contentService.removeMediaFromWatchlist(media.media_type, media.id).subscribe(() => {
  //             // Media successfully removed, update the watchlist
  //             console.log('Removed to watchlist:')
  //             this.contentService.getWatchlistMovies().subscribe((data) => {
  //               this.watchlistMovies = data.results;
  //             });
  //           });
  //         },
  //       },
  //     ],
  //   });

  //   await alert.present();
  // }

  async handleRefresh(event: any) {
    // Make an HTTP request to your backend server to refresh the favorites movies
    this.contentService.getFavoritesMovies().subscribe((data) => {
      console.log('Data Refreshed!:', data);
      this.favoritesMovies = data.results;
    });

    this.contentService.getFavoritesTVShows().subscribe((data) => {
      console.log('Data Refreshed!:', data);
      this.favoritesTVShows = data.results;
    });

    // Add a delay to the handleRefresh() method to give the loading animation time to display
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Complete the refresh event
    event.target.complete();
  }

}

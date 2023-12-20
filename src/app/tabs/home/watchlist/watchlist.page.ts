import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular'; // Future update

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.page.html',
  styleUrls: ['./watchlist.page.scss'],
})
export class WatchlistPage implements OnInit {
  watchlistMovies: any[] | undefined; // Define the type according to your API response
  watchlistTVShows: any[] | undefined; // Define the type according to your API response
  editing = false; // Flag to indicate whether in edit mode
  imageBaseUrl = environment.images;

  constructor(private contentService: ContentService, private alertController: AlertController) {}

  async ngOnInit() {
    // Fetch the watchlist movies from the backend server
    this.contentService.getWatchlistMovies().subscribe((data) => {
      console.log('Data Fetched!:', data);
      this.watchlistMovies = data.results;
    });

    // Fetch the watchlist tv shows from the backend server
    this.contentService.getWatchlistTVShows().subscribe((data) => {
      console.log('Data Fetched!:', data);
      this.watchlistTVShows = data.results;
    });
  }

  async toggleEdit() {
    this.editing = !this.editing;
  }

  // // This feature is currently unavailable due to API version 3
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
    // Make an HTTP request to your backend server to refresh the watchlist movies and tv shows
    this.contentService.getWatchlistMovies().subscribe((data) => {
      console.log('Data Refreshed!:', data);
      this.watchlistMovies = data.results;
    });

    this.contentService.getWatchlistTVShows().subscribe((data) => {
      console.log('Data Refreshed!:', data);
      this.watchlistTVShows = data.results;
    });

    // Add a delay to the handleRefresh() method to give the loading animation time to display
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Complete the refresh event
    event.target.complete();
  }
}

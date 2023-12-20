import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.page.html',
  styleUrls: ['./show-details.page.scss'],
})
export class ShowDetailsPage implements OnInit {
  show: any = {};
  imageBaseUrl = environment.images;

  constructor(
    private contentService: ContentService,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.contentService.getShowDetails(id).subscribe(
      (res) => {
        this.show = res;
        console.log(res);
      },
      (error) => {
        console.error('Error loading show details:', error);
      }
    );
  }

  // Function to add show to Favorites
  addToFavorites() {
    this.contentService.addMediaToFavorites(this.show, 'tv')
    this.presentFavoritesAlert()
  }

  // Function to add show to Watchlist
  addToWatchlist() {
    this.contentService.addMediaToWatchlist(this.show, 'tv')
    this.presentWatchlistAlert()
  }

  // Function to present "Favorites" alert
  async presentFavoritesAlert() {
    const alert = await this.alertController.create({
      header: 'Added to Favorites',
      message: 'Show has been Added to Favorites',
      buttons: ['OK']
    });

    await alert.present();
  }

  // Function to present "Watchlist" alert
  async presentWatchlistAlert() {
    const alert = await this.alertController.create({
      header: 'Added to Watchlist',
      message: 'Show has been Added to Watchlist',
      buttons: ['OK']
    });

    await alert.present();
  }
}


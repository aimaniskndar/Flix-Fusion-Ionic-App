import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-browse-genre-details',
  templateUrl: './browse-genre-details.page.html',
  styleUrls: ['./browse-genre-details.page.scss'],
})
export class BrowseGenreDetailsPage implements OnInit {

  videos: any = {};
  movie: any = {};
  castList: any[] = [];
  crewList: any[] = [];

  imageBaseUrl = environment.images;

  // Function has been stopped currently
  videoCarouselOptions = {
    slidesPerView: 1.5, // Number of slides to show at a time
    spaceBetween: 10, // Space between slides
    centeredSlides: true, // Center active slide
  }

  constructor(private route: ActivatedRoute, private contentService: ContentService, private sanitizer: DomSanitizer, private alertController: AlertController) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.contentService.getMovieDetails(id).subscribe((res) => {
      console.log('Movie Details Fetched!:', res);
      this.movie = res;
    });

    this.contentService.getMovieCredits(id).subscribe((res) => {
      console.log('Crew and Cast Data Fetched!:', res);
      this.castList = res.cast;
      this.crewList = res.crew;
    });

    // Fetch movie videos Function has been stopped currently
    this.contentService.getMovieVideos(id).subscribe((data) => {
      console.log('Video Found!:', data)
      this.videos = data.results;
    });
  }

  // Function to add movie to Favorites
  addToFavorites() {
    this.contentService.addMediaToFavorites(this.movie, 'movie');
    this.presentFavoritesAlert();
  }

  // Function to add movie to Watchlist
  addToWatchlist() {
    this.contentService.addMediaToWatchlist(this.movie, 'movie');
    this.presentWatchlistAlert();
  }

  // Function to present "Favorites" alert
  async presentFavoritesAlert() {
    const alert = await this.alertController.create({
      header: 'Added to Favorites',
      message: 'Movie has been added to Favorites',
      buttons: ['OK']
    });

    await alert.present();
  }

  // Function to present "Watchlist" alert
  async presentWatchlistAlert() {
    const alert = await this.alertController.create({
      header: 'Added to Watchlist',
      message: 'Movie has been added to Watchlist',
      buttons: ['OK']
    });

    await alert.present();
  }

  // Function to sanitize iframe source URLs. Function is being stopped currently
  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-search-details',
  templateUrl: './search-details.page.html',
  styleUrls: ['./search-details.page.scss'],
})

export class SearchDetailsPage implements OnInit {
  movie: any = {};
  show: any = {};
  videos: any[] = [];
  castList: any[] = [];
  crewList: any[] = [];

  imageBaseUrl = environment.images;

  videoCarouselOptions = {
    slidesPerView: 1.5, // Number of slides to show at a time
    spaceBetween: 10, // Space between slides
    centeredSlides: true, // Center active slide
  }
  alertController: any;

  constructor(private route: ActivatedRoute, private contentService: ContentService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.contentService.getMovieDetails(id).subscribe((res) => {
      console.log(res);
      this.movie = res;
    });

    this.contentService.getMovieCredits(id).subscribe((res) => {
      console.log(res);
      this.castList = res.cast;
      this.crewList = res.crew;
    });

    this.contentService.getShowDetails(id).subscribe((ren) => {
      this.show = ren;
      console.log(ren);
    });

    this.contentService.getShowCredits(id).subscribe((res) => {
      console.log(res);
      this.castList = res.cast;
      this.crewList = res.crew;
    });

    // Fetch movie videos
    this.contentService.getMovieVideos(id).subscribe((data) => {
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

  // Function to sanitize iframe source URLs
  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}

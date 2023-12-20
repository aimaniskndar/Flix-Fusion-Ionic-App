import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-favorites-details',
  templateUrl: './favorites-details.page.html',
  styleUrls: ['./favorites-details.page.scss'],
})
export class FavoritesDetailsPage implements OnInit {
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

  constructor(private route: ActivatedRoute, private contentService: ContentService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.contentService.getMovieDetails(id).subscribe((res) => {
      console.log('Movie Details Fetched!:', res);
      this.movie = res;
    });

    this.contentService.getMovieCredits(id).subscribe((res) => {
      console.log('Movie Cast and Crew Fetched!:', res);
      this.castList = res.cast;
      this.crewList = res.crew;
    });

    // Fetch movie videos. Function has been stopped currently
    this.contentService.getMovieVideos(id).subscribe((data) => {
      console.log('Movie Trailers Fetched!:', data);
      this.videos = data.results;
    });
  }

  // Function to sanitize iframe source URLs. Function is being stopped currently
  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

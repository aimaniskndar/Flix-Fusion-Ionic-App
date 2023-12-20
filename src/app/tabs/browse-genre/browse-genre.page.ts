import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-browse-genre',
  templateUrl: './browse-genre.page.html',
  styleUrls: ['./browse-genre.page.scss'],
})
export class BrowseGenrePage implements OnInit {
  genres: any[] = [];
  movies: any[] = [];
  // tv: any[] = [];
  currentPageMovie = 1;
  // currentPageTV = 1;
  viewMode: string = 'list';
  imageBaseUrl = environment.images;

  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll!: IonInfiniteScroll;

  constructor(private activatedRoute: ActivatedRoute, private contentService: ContentService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadMovies();
    this.contentService.getMovieGenres().subscribe((res) => {
      console.log(res);
      this.genres = res.genres;
    });

    // this.loadTVShows();
    // this.contentService.getTVGenres().subscribe((res) => {
    //   console.log(res);
    //   this.genres = res.genres;
    // });
  }

  async loadMovies(event?: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Fetching data...',
      spinner: 'lines',
    });
    await loading.present();

    this.activatedRoute.params.subscribe(params => {
      const genreId = params['id'];
      this.contentService.getMoviesByGenre(genreId, this.currentPageMovie).subscribe((res) => {
        loading.dismiss();

        if (!res || !res.results || res.results.length === 0) {
          this.infiniteScroll.disabled = true;
          return;
        }

        this.movies = [...this.movies, ...res.results];
        console.log(res);
  
        if (event) {
          event.target.complete();
        }
  
        if (this.currentPageMovie === res.total_pages) {
          this.infiniteScroll.disabled = true;
        } else {
          this.currentPageMovie++;
        }
      });
    });
  }

  // async loadTVShows(event?: any) {
  //   const loading = await this.loadingCtrl.create({
  //     message: 'Fetching data...',
  //     spinner: 'lines',
  //   });
  //   await loading.present();

  //   this.activatedRoute.params.subscribe(params => {
  //     const genreId = params['id'];
  //     this.contentService.getTVByGenre(genreId, this.currentPageTV).subscribe((res) => {
  //       loading.dismiss();

  //       if (!res || !res.results || res.results.length === 0) {
  //         this.infiniteScroll.disabled = true;
  //         return;
  //       }

  //       this.tv = [...this.tv, ...res.results];
  //       console.log(res);
  
  //       if (event) {
  //         event.target.complete();
  //       }
  
  //       if (this.currentPageTV === res.total_pages) {
  //         this.infiniteScroll.disabled = true;
  //       } else {
  //         this.currentPageTV++;
  //       }
  //     });
  //   });
  // }

  loadMore(event: any) {
    this.loadMovies(event);
    // this.loadTVShows(event);
  }

  switchViewMode(viewMode: string) {
    this.viewMode = viewMode;
  }
}

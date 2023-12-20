import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { ContentService } from 'src/app/services/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  viewMode: 'list' | 'grid' = 'list';
  movies: any[] = [];
  currentPage = 1;
  imageBaseUrl = environment.images;

  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll!: IonInfiniteScroll;

  constructor(private movieService: ContentService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies(event?: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Fetching data...',
      spinner: 'lines',
    });
    await loading.present();

    this.movieService.getTopRatedMovies(this.currentPage).subscribe((res) => {
      loading.dismiss();
      this.movies = [...this.movies, ...res.results];
      console.log(res);

      if (event) {
        event.target.complete();
      }

      if (this.currentPage === res.total_pages) {
        this.infiniteScroll.disabled = true;
      } else {
        this.currentPage++;
      }
    });
  }

  loadMore(event: any) {
    this.loadMovies(event);
  }

}

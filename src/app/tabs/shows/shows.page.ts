import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { ContentService } from 'src/app/services/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.page.html',
  styleUrls: ['./shows.page.scss'],
})
export class ShowsPage implements OnInit {
  viewMode: 'list' | 'grid' = 'list';
  shows: any[] = [];
  currentPage = 1;
  imageBaseUrl = environment.images;

  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll!: IonInfiniteScroll;

  constructor(private showService: ContentService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadTvShows();
  }

  async loadTvShows(event?: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Fetching data...',
      spinner: 'lines',
    });
    await loading.present();

    this.showService.getTopRatedTVShows(this.currentPage).subscribe((res) => {
      loading.dismiss();
      this.shows = [...this.shows, ...res.results];
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
    this.loadTvShows(event);
  }
}

import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { NavController } from '@ionic/angular'; // Import NavController

@Component({
  selector: 'app-browse',
  templateUrl: './browse.page.html',
  styleUrls: ['./browse.page.scss'],
})
export class BrowsePage implements OnInit {
  genres: any[] = [];
  viewMode: 'movie' | 'tv' = 'movie'; // Initialize with 'movie'

  constructor(private contentService: ContentService, private navCtrl: NavController) { }

  ngOnInit() {
    this.fetchGenres(); // Fetch genres initially for 'movie'
  }

  // Function to fetch genres based on the selected viewMode
  fetchGenres() {
    if (this.viewMode === 'movie') {
      this.contentService.getMovieGenres().subscribe((res) => {
        console.log(res);
        this.genres = res.genres;
      });
    } else if (this.viewMode === 'tv') {
      this.contentService.getTVGenres().subscribe((res) => {
        console.log(res);
        this.genres = res.genres;
      });
    }
  }

  // Function to switch viewMode when the button is clicked
  switchViewMode(mode: 'movie' | 'tv') {
    this.viewMode = mode;
    this.fetchGenres(); // Fetch genres based on the selected viewMode
  }

  // // Function to navigate to browse-genre page with the selected view mode
  // navigateToBrowseGenre(genreId: number) {
  //   // Pass both the view mode and genre ID as route parameters
  //   this.navCtrl.navigateForward(`/browse/${genreId}/${this.viewMode}`);
  // }
}

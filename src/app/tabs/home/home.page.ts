import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  playing: any = {};
  imageBaseUrl = environment.images;

  constructor(private contentService: ContentService) { }

  ngOnInit() {
    // Fetch currently playing movie in theater
    this.contentService.getNowPlaying().subscribe((data) => {
      console.log('Data Fetched!:', data);
      this.playing = (data);
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  selectedType: string | undefined;
  searchTerm: string;
  includeAdult: string | undefined;
  language: string | undefined;
  region: string | undefined;
  searchResults: any[] = [];
  primaryReleaseYear: string | undefined;
  primaryReleaseYears: number[] = [];
  imageBaseUrl = environment.images;
  currentPage = 1; // Track the current page

  constructor(private http: HttpClient) {
    for (let primaryReleaseYear = 1970; primaryReleaseYear <= 2025; primaryReleaseYear++) {
      this.primaryReleaseYears.push(primaryReleaseYear);
    }
    this.searchTerm = '';
  }

  ngOnInit() {
  }

  search(searchTerm: string, page: number): Observable<any[]> {
    const url = `${environment.baseUrl}/search/${this.selectedType}?query=${searchTerm}&include_adult=${this.includeAdult}&language=${this.language}&primary_release_year=${this.primaryReleaseYear}&page=${page}&region=${this.region}&api_key=${environment.apiKey}`;

    return this.http.get(url).pipe(
      map((result: any) => {
        return result.results;
      })
    );
  }

  onSearch() {
    this.currentPage = 1; // Reset the current page when initiating a new search
    this.search(this.searchTerm, this.currentPage).subscribe((result) => {

      console.log('Generated Result:', result);
      this.searchResults = result;
    });
  }

  loadMoreResults(event: any) {
    this.currentPage++; // Increment the current page
    this.search(this.searchTerm, this.currentPage).subscribe((result) => {
      console.log('Generated Continous Result:', result);
      if (result.length > 0) {
        this.searchResults = [...this.searchResults, ...result]; // Concatenate the new results
      } else {
        event.target.disabled = true; // Disable infinite scroll when there are no more results
      }
      event.target.complete(); // Complete the infinite scroll event
    });
  }
}

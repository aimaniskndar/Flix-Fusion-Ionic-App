import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) { }

  getMoviePlayer(id: string): Observable<any> {
    return this.http.get(`https://vidsrc.to/embed/movie/${id}`);
  }

  // Fetch a list of movies that are currently in theatres
  getNowPlaying(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/movie/now_playing?api_key=${environment.apiKey}&language=en-US&page=1&region=MY`);
  }

  // Fetch the top-rated movies
  getTopRatedMovies(page = 1): Observable<any> {
    return this.http.get(`${environment.baseUrl}/movie/popular?api_key=${environment.apiKey}&page=${page}`);
  }

  // Fetch movie details by ID
  getMovieDetails(id: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/movie/${id}?api_key=${environment.apiKey}`);
  }

  // Fetch movie credits by movie ID
  getMovieCredits(id: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/movie/${id}/credits?api_key=${environment.apiKey}`);
  }

  // Fetch Movie Trailers and Teaser by ID
  getMovieVideos(id: string): Observable<any> {
    return this.http.get<any>(
      `${environment.baseUrl}/movie/${id}/videos?api_key=${environment.apiKey}`
    );
  }

  // Fetch movies by genre
  getMoviesByGenre(genreId: string, page = 1): Observable<any> {
    return this.http.get(`${environment.baseUrl}/discover/movie?api_key=${environment.apiKey}&with_genres=${genreId}&page=${page}`);
  }

  // Fetch tv by genre
  getTVByGenre(genreId: string, page = 1): Observable<any> {
    return this.http.get(`${environment.baseUrl}/discover/tv?api_key=${environment.apiKey}&with_genres=${genreId}&page=${page}`);
  }

  // Fetch movie genres
  getMovieGenres(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/genre/movie/list?api_key=${environment.apiKey}`);
  }

  // Fetch TV show genres
  getTVGenres(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/genre/tv/list?api_key=${environment.apiKey}`);
  }

  // Fetch top-rated TV shows
  getTopRatedTVShows(page = 1): Observable<any> {
    return this.http.get(`${environment.baseUrl}/tv/popular?api_key=${environment.apiKey}&page=${page}`);
  }

  // Fetch TV show details by ID
  getShowDetails(id: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/tv/${id}?api_key=${environment.apiKey}`);
  }

  // Fetch TV show credits by TV show ID
  getShowCredits(id: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/movie/${id}/credits?api_key=${environment.apiKey}`)
  }

  // Fetch favorite movies for the user
  getFavoritesMovies(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/account/${environment.accountId}/favorite/movies?api_key=${environment.apiKey}&session_id=${environment.sessionId}&language=en-US&page=1&sort_by=created_at.asc`);
  }

  // Fetch watchlist movies for the user
  getWatchlistMovies(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/account/${environment.accountId}/watchlist/movies?api_key=${environment.apiKey}&session_id=${environment.sessionId}&language=en-US&page=1&sort_by=created_at.asc`);
  }

  // Fetch favorite TV shows for the user
  getFavoritesTVShows(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/account/${environment.accountId}/favorite/tv?api_key=${environment.apiKey}&session_id=${environment.sessionId}&language=en-US&page=1&sort_by=created_at.asc`);
  }

  // Fetch watchlist TV shows for the user
  getWatchlistTVShows(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/account/${environment.accountId}/watchlist/tv?api_key=${environment.apiKey}&session_id=${environment.sessionId}&language=en-US&page=1&sort_by=created_at.asc`);
  }

  // Add media (movie or TV show) to favorites
  addMediaToFavorites(media: any, mediaType: string) {

    this.http.post(
      `${environment.baseUrl}/account/${environment.accountId}/favorite?api_key=${environment.apiKey}&session_id=${environment.sessionId}`,
      {
        media_type: mediaType,
        media_id: media.id,
        favorite: true
      }
    ).subscribe(response => {
      // Handle the success response
      console.log('Added to Favorites:', response);
    });
  }

  // Add media (movie or TV show) to watchlist
  addMediaToWatchlist(media: any, mediaType: string) {

    this.http.post(
      `${environment.baseUrl}/account/${environment.accountId}/watchlist?api_key=${environment.apiKey}&session_id=${environment.sessionId}`,
      {
        media_type: mediaType,
        media_id: media.id,
        watchlist: true
      }
    ).subscribe(response => {
      // Handle the success response
      console.log('Added to Watchlist:', response);
    });
  }

  // isAddedToFavorites(mediaId: string): Observable<boolean> {
  //   return this.http
  //     .get<any>(
  //       `${environment.baseUrl}/account/${environment.accountId}/favorite?api_key=${environment.apiKey}&session_id=${environment.sessionId}`
  //     )
  //     .pipe(
  //       map((response) => {
  //         // Check if mediaId is present in the favorites
  //         return response.results.some(
  //           (favorite: any) =>
  //             favorite.media_id === mediaId && favorite.media_type === 'movie'
  //         );
  //       })
  //     );
  // }

  // // Check if media is added to Watchlist
  // isAddedToWatchlist(mediaId: string): Observable<boolean> {
  //   return this.http
  //     .get<any>(
  //       `${environment.baseUrl}/account/${environment.accountId}/watchlist?api_key=${environment.apiKey}&session_id=${environment.sessionId}`
  //     )
  //     .pipe(
  //       map((response) => {
  //         // Check if mediaId is present in the watchlist
  //         return response.results.some(
  //           (watchlist: any) =>
  //             watchlist.media_id === mediaId && watchlist.media_type === 'movie'
  //         );
  //       })
  //     );
  // }

  // // Removing media both movie and tv shows feature is currently unavilable
  // removeMediaFromFavorites(mediaType: string, mediaId: string) {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });

  //   const requestBody = {
  //     media_type: mediaType,
  //     media_id: mediaId,
  //     favorites: false // Set favorites to false to remove the item
  //   };

  //   return this.http.post(
  //     `${environment.baseUrl}/account/${environment.accountId}/favorites?api_key=${environment.apiKey}&session_id=${environment.sessionId}`,
  //     requestBody,
  //     { headers }
  //   );
  // }

  // // Removing media both movie and tv shows feature is currently unavilable
  // removeMediaFromWatchlist(mediaType: string, mediaId: string) {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });

  //   const requestBody = {
  //     media_type: mediaType,
  //     media_id: mediaId,
  //     watchlist: false // Set watchlist to false to remove the item
  //   };

  //   return this.http.post(
  //     `${environment.baseUrl}/account/${environment.accountId}/watchlist?api_key=${environment.apiKey}&session_id=${environment.sessionId}`,
  //     requestBody,
  //     { headers }
  //   );
  // }
}

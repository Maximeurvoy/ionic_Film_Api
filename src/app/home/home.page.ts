import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // http
  image = '';
  film = '';
  nomFilm = '';
  anneeFilm = '';
  films: any[]=[];
  favorites: any[]=[];
  displayType ='favoris';
  valPlus = '';
  page = 0;
  constructor(private http: HttpClient) {}

  onRecherche() {
    this.page ++;
    const val = this.film;
    this.valPlus = this.film;
    const url = 'http://www.omdbapi.com/?apikey=efdc2275&s=' + val;
    this.film = '';
    console.log(url);
    this.http.get<any>(url).subscribe((film) => {
      // JSON
      this.films = film.Search;
      console.log(film);
      console.log(this.films);
      // this.nomFilm = film.Title;
      // this.anneeFilm = film.Year;
      // this.image = film.Poster;
    });
    this.displayType ='resultats';
  }

  onRecherchePlus() {
    this.page ++;
    const val = this.valPlus;
    const url = 'http://www.omdbapi.com/?apikey=efdc2275&page='+ this.page +'&s=' + val;

    this.http.get<any>(url).subscribe((film) => {
      // JSON
      this.films = film.Search;
      console.log(film);
      console.log(this.films);
      // this.nomFilm = film.Title;
      // this.anneeFilm = film.Year;
      // this.image = film.Poster;
    });
    this.displayType ='resultats';
  }

  onFavorite(film: string){
    this.favorites.push(film);
    console.log( this.favorites);
  }

  onDisplay(type: string){
    this.displayType = type;
  }
}

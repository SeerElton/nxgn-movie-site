import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import config from '../../app-config';

@Injectable()
export class MoviesServiceService {

  constructor(public http: HttpClient) { }

  //---> server url
  serverURL: string = config.serverURL;


  //---> fetch movies
  getMovies() {

    return this.http.get(`${this.serverURL}/api/movies`);
  }


  //---> modify movie movies
  editMovie(form: FormData): any {

    return this.http.post(`${this.serverURL}/api/movies/update`, form);
  }


  //---> delete movie
  deleteMovie(id: string): any {

    const form = new FormData();

    form.set("id", id);

    return this.http.post(`${this.serverURL}/api/movies/delete`, form);

  }


  //---> add a new movie
  addMovie(formdata): any {

    return this.http.post(`${this.serverURL}/api/movies`, formdata);
  }

}

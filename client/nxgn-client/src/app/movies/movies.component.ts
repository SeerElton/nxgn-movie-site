import { Component, OnInit } from '@angular/core';

/* import service */
import { MoviesServiceService } from '../movies-service.service';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  /* declare movies list as array of pbject */
  movies: any = [];

  constructor(private service: MoviesServiceService, private notification: NotificationsService) {



  }
  ngOnInit() {
    /* get movies */
    new Promise((resolve, reject) => {

      this.service.getMovies().subscribe(results => resolve(results))

    }).then(movies => {

      this.movies = movies;
    })
  }


  /**
   * Description - This function delete a move from both the server and the dom.
   * 
   * @param movie(object) an existing movie object
   * 
   * @return - null
   */
  delete(movie: object) {
    /* remove from the dom */
    this.movies.splice(this.movies.indexOf(movie), 1);

    /* remove from the serer */
    new Promise((reject, resolve) => {
      setTimeout(() => {
        this.service.deleteMovie(movie['id']).subscribe(response => {

          if (response.error)

            reject(response.error)

          else {

            resolve(response.message)

          }
        });
      }, 2000)
    }).then(message => {
      //----> display notification
      this.notification.success(message);

    }).catch(err => {
      //---> alert errors
      alert(err);
    })
  }

}

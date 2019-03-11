import { Component, OnInit } from '@angular/core';
import { MoviesServiceService } from '../movies-service.service';
import { Router } from '@angular/router';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  formdata: FormData = new FormData();
  tempImage: any;
  tempAddMovie: object = {};

  constructor(public service: MoviesServiceService, private notification: NotificationsService, private router: Router) { }

  ngOnInit() {

  }
  /**
   * Description - add movie into the movies collection.
   * 
   * @param tempAddMovie (object) - a movie details
   * 
   * @return null
   */
  addMovie(movie) {

    //---> Add data to form data
    this.formdata.set('name', movie.name);

    this.formdata.set('details', movie.details);

    //---> send movies to server
    new Promise((resolve, reject) => {
      this.service.addMovie(this.formdata).subscribe(results => {

        if (results.error)

          reject(results.error)

        else

          resolve(results.message)
      })

    }).then(message => {

      this.notification.success(message);
      //---> route to movies
      this.router.navigate(['/']);

    }).catch(error => {

      alert(`Error: ${error}`);
    })
  }


  /**
   * Description - Add icon int form data
   * 
   * @param event (Event) - an image change event
   * 
   * @retrun null
   */
  addIcon(event: Event) {

    const file = event.target['files'][0];

    //---> add icon to formdata
    this.formdata.set('thumb', file);

    //---> create a temporary image into the dom
    const reader = new FileReader();

    reader.onload = e => this.tempImage = reader.result;

    reader.readAsDataURL(file);

  }




}

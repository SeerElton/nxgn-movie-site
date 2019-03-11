import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from '../notifications.service';
import { MoviesServiceService } from '../movies-service.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  editTemp: any = {};

  formdata: FormData = new FormData();
  tempImage: any;

  constructor(private route: ActivatedRoute, private service: MoviesServiceService, private notification: NotificationsService) { }

  ngOnInit() {
    this.editTemp = this.route.snapshot.params;
  }

  /**
   * desc - this function received a an image and insert it into form data, the image is used as a movie thumbnail
   * 
   * @params event - a change event for change image
   * 
   * return null 
   * */
  addIcon(event: Event) {



    const file = event.target['files'][0];

    //---> add icon to formdata
    this.formdata.set('thumb', file);

    //---> create a temporary image into the dom
    const reader = new FileReader();

    reader.onload = e => this.editTemp.image = reader.result;

    reader.readAsDataURL(file);

  }

  /**
   * desc - this function sends a patch request to edt a mvie via a service
   * 
   * @param movie - a movie object containing a movie name and about
   * 
   * returns null
   */
  editMovie(movie) {
    //--->set formdata
    this.formdata.set('name', movie.name);
    this.formdata.set('id', this.editTemp.id);
    this.formdata.set('about', movie.id);

    console.log(movie.about);

    new Promise((resolve, reject) => {
      console.log(this.formdata)
      this.service.editMovie(this.formdata).subscribe(results => {
        console.log(results)
        if (results.error)

          reject(results.error)

        else

          resolve(results.message)
      })
    }).then(message => {

      //---> display succes otofication
      this.notification.success(message);

    }).catch(err => {

      alert(err);
    })
  }

}

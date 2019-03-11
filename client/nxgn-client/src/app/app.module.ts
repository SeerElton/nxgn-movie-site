import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* routes */
import Routes from './routing';

/* services */
import { MoviesServiceService } from './movies-service.service';
import { NotificationsService } from './notifications.service';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { MoviesComponent } from './movies/movies.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { ToastComponent } from './toast/toast.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MoviesComponent,
    AddMovieComponent,
    EditMovieComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Routes,
    HttpClientModule
  ],
  providers: [MoviesServiceService, NotificationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

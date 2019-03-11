import { Routes, RouterModule } from '@angular/router';

import { MoviesComponent } from './movies/movies.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';


const appRoutes: Routes = [
    { path: '', component: MoviesComponent },
    { path: 'add-movie', component: AddMovieComponent },
    { path: 'edit-movie', component: EditMovieComponent },
];

export default RouterModule.forRoot(appRoutes);
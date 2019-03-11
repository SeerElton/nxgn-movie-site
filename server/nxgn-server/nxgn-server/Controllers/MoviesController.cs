using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting.Internal;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;

/* import database connection */
using nxgnserver.Data;

namespace nxgn_server.Controllers
{


    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {

        /* private instance for database CRUD operations */
        private readonly ApplicationDbContext _db = new ApplicationDbContext();

        /*
        *summary - this function receives an image and store it in /wwwroot/images. its main purpose is to upload movie images
        * 
        * @params image (File) - a picture to upload
        * 
        * return - void
        */
        public async void UploadImage(IFormFile image)
        {

            var FileName = image.FileName;

            var filePath = Path.Combine("wwwroot/images", FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }
        }



        /*
        *route - GET api/movies
        * 
        * sumarry - a route that returns all movies from database.
        * 
        * @params - null
        * 
        * return - movies list
        */
        [HttpGet]
        public IActionResult GetMovies()
        {

            /* return all movies */
            return Ok(_db.Movies.ToList());
        }




        /*
        *route - PATCH api/movies
        * 
        * sumarry - a route that update a movie.
        * 
        * @params - a movie model from class MovieModel
        * 
        * return - status of the operation
        */
        [HttpPost("update")]
        public async Task<ActionResult> UpdateMovie([FromForm]MovieModel moviemodel)
        {
           

            if (!ModelState.IsValid) {

                return Ok(new { error = "Error While adding movie" });
            }

        /* new movie object */
            MoviesDataModel movie = new MoviesDataModel
            {
                name = moviemodel.name,

                id = moviemodel.id,

                about = moviemodel.about,

              
            };

            //add image if applicable
            if (moviemodel.thumb != null)
            {
                UploadImage(moviemodel.thumb);
                movie.image = moviemodel.thumb.FileName;
            }


            _db.Movies.Update(movie);

            await _db.SaveChangesAsync();

            return Ok(new { message = "Movie updated...!" });

        }





        /*
        *route - POST api/movies
        * 
        * sumarry - a route that adds a movie to database database.
        * 
        * @params - null
        * 
        * return - status of the operation
        */
        [HttpPost]
        public async Task<ActionResult> AddNewMovie([FromForm] MovieModel moviemodel)
        {

            if (!ModelState.IsValid) {
                return Ok(new { error = "Error While adding movie" });
            }
            /* Upload the image */
            UploadImage(moviemodel.thumb);

            /* inititalize a new movie object */
            MoviesDataModel movie = new MoviesDataModel
            {
                name = moviemodel.name,

                about = moviemodel.about,

                image = moviemodel.thumb.FileName
            };
            /* ad new movie to collection */
            _db.Movies.Add(movie);

            await _db.SaveChangesAsync();

            return Ok(new { message = "Succesfully added...!" });
        }





        /*
        *route - POST api/movies
        * 
        * sumarry - a route that adds a movie to database database.
        * 
        * @params - null
        * 
        * return - status of the operation
        */
        [HttpPost("delete")]
        public async Task<ActionResult> Delete([FromForm]string id)
        {

            var findMovie = await _db.Movies.FindAsync(id);

            if(findMovie == null) {

               return Ok(new { error = "Movie not found...!" });
            }

            _db.Movies.Remove(findMovie);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Movie succesfully removed...!"});
        }

       

    }

    /*
       *summary - a movie model for adding/updating a movie input.
       *
       *@params name (String) - name of the movie.
       *
       *@params about (String) - a short description about the movie.
       *
       *@params thumb (String) -a image icon for the movie.       
       */
    public class MovieModel
    {
        public string id { set; get; }
        public string name { set; get; }
        public string about { set; get; }
        public IFormFile thumb { set; get; }

    }
}

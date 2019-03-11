using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace nxgnserver.Data
{
    /*
     * summary - database representational model
     */
       public class ApplicationDbContext : DbContext
    {

        #region Public Properties 

        /* Movies table data for the application  */
        public DbSet<MoviesDataModel> Movies { set; get; }
         
        #endregion 

     
        public ApplicationDbContext() { }


        /*
        *summary - configure database connection
        *       
        */
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {

            base.OnConfiguring(optionsBuilder);


            /* connection string */
            var connectionString = "Server=localhost,1434;Database=nxgn;User Id=sa;Password=P@ssword1!;Trusted_Connection=True;MultipleActiveResultSets=true;Integrated Security=false;";
           
            /* connect to sql server */
            optionsBuilder.UseSqlServer(connectionString);   
        }

         
        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            base.OnModelCreating(modelBuilder);

            /* avoid dumplocates using movie name*/
            modelBuilder.Entity<MoviesDataModel>()
            .HasIndex(b => b.name)
            .IsUnique();
        }
    }


}

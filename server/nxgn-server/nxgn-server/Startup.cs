using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using nxgnserver.Data;


namespace nxgn_server
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
          
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            /* add cors to services */
            services.AddCors();

            /* make sure the database is created */
            using (var context = new ApplicationDbContext()) {

                context.Database.EnsureCreated(); 
            }

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }
            /* enable cors from all origins */
            app.UseCors(bulder => bulder.WithOrigins("*"));


            /* serve static directories folder*/
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(

            Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images")),

                RequestPath = "/images"
            });


            app.UseHttpsRedirection();

            app.UseMvc();
        }
    }
}

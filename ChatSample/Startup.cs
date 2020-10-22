using LockDown.Hubs;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace LockDown
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseFileServer();

            //UseRouting adds route matching to the middleware pipeline. This middleware looks at the set of endpoints defined in the app, and selects the best match based on the request.  https://docs.microsoft.com/en-us/aspnet/core/fundamentals/routing?view=aspnetcore-3.1
            app.UseRouting();


            //UseEndpoints adds endpoint execution to the middleware pipeline. It runs the delegate associated with the selected endpoint.
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<LockDownHub>("/chat");
            });
        }
    }
}

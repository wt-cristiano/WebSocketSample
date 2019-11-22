using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace netCore_Angular_Websocket
{
    public class Startup
    {
       
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSignalR();
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAny", x =>
                {
                    x.WithOrigins(
                        "http://localhost:8080", 
                        "https://localhost:8080",
                        "http://localhost:4200", 
                        "https://localhost:4200")
                        .AllowAnyHeader()
                        .AllowCredentials()
                        .AllowAnyMethod();
                });
            });
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

       
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors("AllowAny");
            app.UseSignalR(routes => {
                routes.MapHub<MessageHub>("/message");
            });

            app.UseMvc();
        }
    }
}

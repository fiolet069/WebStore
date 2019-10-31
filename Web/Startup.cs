using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authentication.Cookies;
using Business.Interfaces;
using Business.Implementations;

namespace Web
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {            
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options => {
                    options.LoginPath = new Microsoft.AspNetCore.Http.PathString("/Auth/Login");
                    options.AccessDeniedPath = new Microsoft.AspNetCore.Http.PathString("/Auth/Login");
                });

            services.AddMvc(options => {
                options.EnableEndpointRouting = false;
            });

            services.AddTransient<IUser, AuthUser>();
            services.AddTransient<IProduct, ManageProduct>();
            services.AddTransient<ICustomer, ManageCustomer>();
            services.AddTransient<IPurchase, ManagePurchase>();
            services.AddTransient<IStaff, ManageStaff>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseMvc(routes => {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}"
                );
            });
        }
    }
}

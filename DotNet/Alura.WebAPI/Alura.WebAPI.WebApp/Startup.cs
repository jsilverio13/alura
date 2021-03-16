using Alura.WebAPI.WebApp.HttpClients;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace Alura.WebAPI.WebApp
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration config)
        {
            Configuration = config;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(options =>
            {
                options.LoginPath = "/Usuario/Login";
            });

            services.AddHttpContextAccessor();

            services.AddHttpClient<LivroApiClient>(client => client.BaseAddress = new Uri("https://localhost:6001/api/v1.0/"));

            services.AddHttpClient<AuthApiClient>(client => client.BaseAddress = new Uri("https://localhost:5001/api/"));

            services.AddMvc();

            services.ConfigureApplicationCookie(options => options.LoginPath = "/Usuario/Login");
        }

        public static void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();
            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Owin;

namespace Alura.ProjetoBlog.Web.App_Start
{
    public partial class Startup
    {
        public static void ConfigureAuth(IAppBuilder app)
        {
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = "ApplicationCookie",
                LoginPath = new PathString("/account/login")
            });
        }
    }
}
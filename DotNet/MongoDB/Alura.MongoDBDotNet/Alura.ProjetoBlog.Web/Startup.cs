using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Alura.ProjetoBlog.Web.App_Start.Startup))]

namespace Alura.ProjetoBlog.Web.App_Start
{
    public partial class Startup
    {
        public static void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
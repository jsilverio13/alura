using Alura.WebAPI.Model;
using System.Collections.Generic;

namespace Alura.WebAPI.WebApp.Models
{
    public class HomeViewModel
    {
        public IEnumerable<LivroApi> ParaLer { get; set; }
        public IEnumerable<LivroApi> Lendo { get; set; }
        public IEnumerable<LivroApi> Lidos { get; set; }
    }
}
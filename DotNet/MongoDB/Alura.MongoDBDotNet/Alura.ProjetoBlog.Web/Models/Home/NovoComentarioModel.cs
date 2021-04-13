using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace Alura.ProjetoBlog.Web.Models.Home
{
    public class NovoComentarioModel
    {
        [HiddenInput(DisplayValue = false)]
        public string PublicacaoId { get; set; }

        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "Comentário")]
        public string Conteudo { get; set; }
    }
}
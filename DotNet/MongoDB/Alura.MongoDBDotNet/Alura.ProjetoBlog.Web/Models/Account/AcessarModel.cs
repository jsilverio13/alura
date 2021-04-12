using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace Alura.ProjetoBlog.Web.Models.Account
{
    public class AcessarModel
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        [Display(Name = "Correio")]
        public string Email { get; set; }

        [HiddenInput(DisplayValue = false)]
        public string RetornoUrl { get; set; }
    }
}
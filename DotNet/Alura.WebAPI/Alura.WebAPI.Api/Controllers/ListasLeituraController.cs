using Alura.WebAPI.DAL.Livros;
using Alura.WebAPI.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace Alura.WebAPI.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ListasLeituraController : ControllerBase
    {
        private readonly IRepository<Livro> _repository;

        public ListasLeituraController(IRepository<Livro> repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult TodasListas()
        {
            var paraLer = CriarLista(TipoListaLeitura.ParaLer);
            var lendo = CriarLista(TipoListaLeitura.Lendo);
            var lidos = CriarLista(TipoListaLeitura.Lidos);

            var colecao = new List<ListaLeitura> { paraLer, lendo, lidos };

            return Ok(colecao);
        }

        [HttpGet("{tipo}")]
        public IActionResult Recuperar(TipoListaLeitura tipo)
        {
            var lista = CriarLista(tipo);

            return Ok(lista);
        }

        private ListaLeitura CriarLista(TipoListaLeitura tipo)
        {
            return new ListaLeitura
            {
                Tipo = tipo.ToString(),
                Livros = _repository.All.Where(l => l.Lista == tipo).Select(l => l.ToApi()).ToList()
            };
        }
    }
}
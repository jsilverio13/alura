using Alura.WebAPI.Api.Models;
using Alura.WebAPI.DAL.Livros;
using Alura.WebAPI.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Collections.Generic;
using System.Linq;

namespace Alura.WebAPI.Api.Controllers
{
    [Authorize]
    [ApiController]
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class ListasLeituraController : ControllerBase
    {
        private readonly IRepository<Livro> _repo;

        public ListasLeituraController(IRepository<Livro> repository)
        {
            _repo = repository;
        }

        private ListaLeitura CriaLista(TipoListaLeitura tipo)
        {
            return new ListaLeitura
            {
                Tipo = tipo.ParaString(),
                Livros = _repo.All
                    .Where(l => l.Lista == tipo)
                    .Select(l => l.ToApi())
                    .ToList()
            };
        }

        [HttpGet]
        [SwaggerOperation(
            Summary = "Recupera as listas de leitura.",
            Tags = new[] { "Listas" },
            Produces = new[] { "application/json", "application/xml" }
        )]
        [ProducesResponseType(200, Type = typeof(List<ListaLeitura>))]
        [ProducesResponseType(500, Type = typeof(ErroResponse))]
        public IActionResult TodasListas()
        {
            var paraLer = CriaLista(TipoListaLeitura.ParaLer);
            var lendo = CriaLista(TipoListaLeitura.Lendo);
            var lidos = CriaLista(TipoListaLeitura.Lidos);
            var colecao = new List<ListaLeitura> { paraLer, lendo, lidos };
            return Ok(colecao);
        }

        [HttpGet("{tipo}")]
        [SwaggerOperation(
            Summary = "Recupera a lista de leitura identificada por seu {tipo}.",
            Tags = new[] { "Listas" },
            Produces = new[] { "application/json", "application/xml" }
        )]
        [ProducesResponseType(200, Type = typeof(ListaLeitura))]
        [ProducesResponseType(500, Type = typeof(ErroResponse))]
        public IActionResult Recuperar(
            [FromRoute][SwaggerParameter("Tipo da lista a ser obtida.")] TipoListaLeitura tipo)
        {
            var lista = CriaLista(tipo);
            return Ok(lista);
        }
    }
}
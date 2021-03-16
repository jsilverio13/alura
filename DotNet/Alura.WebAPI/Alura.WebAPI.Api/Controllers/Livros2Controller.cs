using Alura.WebAPI.Api.Exceptions;
using Alura.WebAPI.Api.Queries;
using Alura.WebAPI.DAL.Livros;
using Alura.WebAPI.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Alura.WebAPI.Api.Controllers
{
    [Authorize]
    [ApiVersion("2.0")]
    [Route("api/v{version:apiVersion}/Livros")]
    [ApiExplorerSettings(GroupName = "v2")]
    [ApiController]
    public class Livros2Controller : ControllerBase
    {
        private readonly IRepository<Livro> _repo;

        public Livros2Controller(IRepository<Livro> repository)
        {
            _repo = repository;
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult Recuperar(int id)
        {
            var model = _repo.Find(id);

            if (model is null)
            {
                return NotFound();
            }

            return Ok(model);
        }

        [HttpPost]
        public IActionResult Incluir([FromForm] LivroUpload model)
        {
            if (ModelState.IsValid)
            {
                var livro = model.ToLivro();

                _repo.Incluir(livro);

                var uri = Url.Action(nameof(Recuperar), new { id = livro.Id });

                return Created(uri, livro);
            }

            return BadRequest(ErrorResponse.FromModelState(ModelState));
        }

        [HttpPut]
        public IActionResult Alterar([FromForm] LivroUpload model)
        {
            if (ModelState.IsValid)
            {
                var livro = model.ToLivro();
                if (model.Capa == null)
                {
                    livro.ImagemCapa = _repo.All
                        .Where(l => l.Id == livro.Id)
                        .Select(l => l.ImagemCapa)
                        .FirstOrDefault();
                }

                _repo.Alterar(livro);

                return Ok();
            }

            return BadRequest(ErrorResponse.FromModelState(ModelState));
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Remover(int id)
        {
            var model = _repo.Find(id);

            if (model == null)
            {
                return NotFound();
            }
            _repo.Excluir(model);

            return NoContent();
        }

        [HttpGet]
        public IActionResult ListaLivros
        (
              [FromQuery] LivroFiltro filtro
            , [FromQuery] LivroOrdem ordem
            , [FromQuery] LivroPaginacao paginacao
        )
        {
            var livroPaginado =
                _repo.All
                .AplicarFiltro(filtro)
                .AplicarOrdem(ordem)
                .Select(l => l.ToApi())
                .ToLivroPaginado(paginacao);

            return Ok(livroPaginado);
        }

        [HttpGet("{id}/capa")]
        public IActionResult ImagemCapa(int id)
        {
            var img = _repo.All
                .Where(l => l.Id == id)
                .Select(l => l.ImagemCapa)
                .FirstOrDefault();

            if (img != null)
            {
                return File(img, "image/png");
            }
            return File("~/images/capas/capa-vazia.png", "image/png");
        }
    }
}
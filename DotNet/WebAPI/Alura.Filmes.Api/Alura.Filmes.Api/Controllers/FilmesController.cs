using Alura.Filmes.Api.Data;
using Alura.Filmes.Api.Data.Dto;
using Alura.Filmes.Api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Alura.Filmes.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FilmesController : ControllerBase
    {
        private readonly FilmeContext _context;
        private readonly IMapper _mapper;

        public FilmesController(FilmeContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost]
        public IActionResult AdicionarFilme([FromBody] CreateFilmeDto filmeDto)
        {
            var filme = _mapper.Map<Filme>(filmeDto);

            _context.Add(filme);
            _context.SaveChanges();

            return CreatedAtAction(nameof(RecuperarFilmesPorId), new { filme.Id }, filme);
        }

        [HttpGet]
        public IActionResult RecuperarFilmes()
        {
            return Ok(_context.Filmes);
        }

        [HttpGet("{id}")]
        public IActionResult RecuperarFilmesPorId(int id)
        {
            var filme = _context.Filmes.FirstOrDefault(x => x.Id == id);
            if (filme != null)
            {
                var filmeDto = _mapper.Map<ReadFilmeDto>(filme);

                return Ok(filmeDto);
            }

            return NotFound();
        }

        [HttpPut("{id}")]
        public IActionResult AtualizarFilme(int id, [FromBody] UpdateFilmeDto filmeDto)
        {
            var filme = _context.Filmes.FirstOrDefault(x => x.Id == id);
            if (filme == null)
            {
                return NotFound();
            }

            _mapper.Map(filmeDto, filme);

            _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult AtualizarFilme(int id)
        {
            var filme = _context.Filmes.FirstOrDefault(x => x.Id == id);
            if (filme == null)
            {
                return NotFound();
            }

            _context.Filmes.Remove(filme);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
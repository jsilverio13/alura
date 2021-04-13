using Alura.ProjetoBlog.Web.Models;
using Alura.ProjetoBlog.Web.Models.Home;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Alura.ProjetoBlog.Web.Controllers
{
    public class HomeController : Controller
    {
        public async Task<ActionResult> Index()
        {
            var conectandoMongoDB = new AcessoMongoDB();
            var Filtro = new BsonDocument();

            var publicacoesRecentes =
                await conectandoMongoDB
                        .Publicacoes
                        .Find(Filtro)
                        .SortByDescending(x => x.DataCriacao)
                        .Limit(10)
                        .ToListAsync()
                        .ConfigureAwait(false);

            var model = new IndexModel
            {
                PublicacoesRecentes = publicacoesRecentes
            };

            return View(model);
        }

        [HttpGet]
        public ActionResult NovaPublicacao()
        {
            return View(new NovaPublicacaoModel());
        }

        [HttpPost]
        public async Task<ActionResult> NovaPublicacao(NovaPublicacaoModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var post = new Publicacao
            {
                Autor = User.Identity.Name,
                Titulo = model.Titulo,
                Conteudo = model.Conteudo,
                Tags = model.Tags.Split(' ', ',', ';').ToList(),
                DataCriacao = DateTime.UtcNow,
                Comentarios = new List<Comentario>()
            };

            var conectandoMongoDB = new AcessoMongoDB();

            await conectandoMongoDB.Publicacoes.InsertOneAsync(post).ConfigureAwait(false);

            return RedirectToAction(nameof(Publicacao), new { id = post.Id });
        }

        [HttpGet]
        public async Task<ActionResult> Publicacao(string id)
        {
            var conectandoMongoDB = new AcessoMongoDB();
            var publicacao = await conectandoMongoDB.Publicacoes.Find(x => x.Id == id).SingleOrDefaultAsync().ConfigureAwait(false);

            if (publicacao == null)
            {
                return RedirectToAction(nameof(Index));
            }

            var model = new PublicacaoModel
            {
                Publicacao = publicacao,
                NovoComentario = new NovoComentarioModel
                {
                    PublicacaoId = id
                }
            };

            return View(model);
        }

        [HttpGet]
        public async Task<ActionResult> Publicacoes(string tag = null)
        {
            var conectandoMongoDB = new AcessoMongoDB();
            var posts = new List<Publicacao>();

            if (tag == null)
            {
                var condicao = new BsonDocument();
                posts = await conectandoMongoDB.Publicacoes.Find(condicao).SortByDescending(x => x.DataCriacao).Limit(10).ToListAsync().ConfigureAwait(false);
            }
            else
            {
                var construtor = Builders<Publicacao>.Filter;
                var condicao = construtor.AnyEq(x => x.Tags, tag);
                posts = await conectandoMongoDB.Publicacoes.Find(condicao).SortByDescending(x => x.DataCriacao).Limit(10).ToListAsync().ConfigureAwait(false);
            }

            return View(posts);
        }

        [HttpPost]
        public async Task<ActionResult> NovoComentario(NovoComentarioModel model)
        {
            if (!ModelState.IsValid)
            {
                return RedirectToAction(nameof(Publicacao), new { id = model.PublicacaoId });
            }

            var comment = new Comentario
            {
                Autor = User.Identity.Name,
                Conteudo = model.Conteudo,
                DataCriacao = DateTime.UtcNow
            };

            var conectandoMongoDB = new AcessoMongoDB();

            var construtor = Builders<Publicacao>.Filter;
            var condicao = construtor.Eq(x => x.Id, model.PublicacaoId);
            var construtorAlteracao = Builders<Publicacao>.Update;
            var condicaoAlteracao = construtorAlteracao.Push(x => x.Comentarios, comment);
            await conectandoMongoDB.Publicacoes.UpdateOneAsync(condicao, condicaoAlteracao).ConfigureAwait(false);

            return RedirectToAction(nameof(Publicacao), new { id = model.PublicacaoId });
        }
    }
}
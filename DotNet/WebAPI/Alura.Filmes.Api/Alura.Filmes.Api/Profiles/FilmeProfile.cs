using Alura.Filmes.Api.Data.Dto;
using Alura.Filmes.Api.Models;
using AutoMapper;

namespace Alura.Filmes.Api.Profiles
{
    public class FilmeProfile : Profile
    {
        public FilmeProfile()
        {
            CreateMap<CreateFilmeDto, Filme>().ReverseMap();
            CreateMap<ReadFilmeDto, Filme>().ReverseMap();
            CreateMap<UpdateFilmeDto, Filme>().ReverseMap();
        }
    }
}
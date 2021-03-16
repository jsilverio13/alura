using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Linq;

namespace Alura.WebAPI.Api.Exceptions
{
    public class ErrorResponse
    {
        public int Codigo { get; set; }
        public string Mensagem { get; set; }
        public ErrorResponse InnerError { get; set; }
        public string[] Detalhes { get; set; }

        public static ErrorResponse From(Exception ex)
        {
            if (ex is null)
            {
                return null;
            }

            return new ErrorResponse
            {
                Codigo = ex.HResult,
                Mensagem = ex.Message,
                InnerError = From(ex.InnerException)
            };
        }

        public static ErrorResponse FromModelState(ModelStateDictionary modelState)
        {
            var erros = modelState.Values.SelectMany(e => e.Errors);

            return new ErrorResponse
            {
                Codigo = 100,
                Mensagem = "Ocorreu ao validar o objeto de entrada",
                Detalhes = erros.Select(e => e.ErrorMessage).ToArray()
            };
        }
    }
}
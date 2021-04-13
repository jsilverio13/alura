using AluraTunesData;
using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using ZXing;

namespace Alura.Tunes.Linq.Linq2
{
    public static class LinqParallel
    {
        private const string IMAGENS = "Imagens";

        public static void Execute()
        {
            var barcodeWriter = new BarcodeWriter
            {
                Format = BarcodeFormat.QR_CODE,
                Options = new ZXing.Common.EncodingOptions
                {
                    Width = 100,
                    Height = 100
                }
            };

            if (!Directory.Exists(IMAGENS))
            {
                Directory.CreateDirectory(IMAGENS);
            }

            using (var contexto = new AluraTunesEntities())
            {
                var queryFaixas =
                from f in contexto.Faixas
                select f;

                var listaFaixas = queryFaixas.ToList();

                var stopWatch = Stopwatch.StartNew();

                var queryCodigos = listaFaixas.AsParallel().Select(f => new
                {
                    Arquivo = $"{IMAGENS}\\{f.FaixaId}.jpg",
                    Imagem = barcodeWriter.Write($"aluratunes.com/faixa/{f.FaixaId}")
                });

                int contagem = queryCodigos.Count();

                stopWatch.Stop();

                Console.WriteLine($"Códigos gerados {contagem} em {stopWatch.Elapsed.TotalSeconds} segundos");

                stopWatch = Stopwatch.StartNew();

                queryCodigos.ForAll(item => item.Imagem.Save(item.Arquivo, ImageFormat.Jpeg));

                contagem = queryCodigos.Count();

                stopWatch.Stop();

                Console.WriteLine($"Códigos salvos {contagem} em {stopWatch.Elapsed.TotalSeconds} segundos");
            }

            Console.ReadKey();
        }
    }
}
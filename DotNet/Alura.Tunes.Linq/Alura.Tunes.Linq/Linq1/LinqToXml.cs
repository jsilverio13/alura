using System;
using System.Linq;
using System.Xml.Linq;

namespace Alura.Tunes.Linq.Linq1
{
    public static class LinqToXml
    {
        public static void Execute()
        {
            XElement root = XElement.Load(@"..\..\Data\AluraTunes.xml");

            var query = from g in root.Element("Generos").Elements("Genero")
                        join m in root.Element("Musicas").Elements("Musica")
                            on g.Element("GeneroId").Value equals m.Element("GeneroId").Value
                        select new
                        {
                            MusicaId = m.Element("MusicaId").Value,
                            Musica = m.Element("Nome").Value,
                            Genero = g.Element("Nome").Value
                        };

            foreach (var musicaEgenero in query)
            {
                Console.WriteLine($"{musicaEgenero.MusicaId}\t{musicaEgenero.Musica.PadRight(20)}\t{musicaEgenero.Genero}");
            }

            Console.ReadKey();
        }
    }
}
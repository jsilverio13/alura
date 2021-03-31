using AluraTunesData;
using System;

namespace Alura.Tunes.Linq
{
    public static class Program
    {
        public static void Main()
        {
            using (var contexto = new AluraTunesEntities())
            {
            }

            Console.ReadKey();
        }
    }
}
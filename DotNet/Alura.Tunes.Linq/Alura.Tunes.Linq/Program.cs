using System;

namespace Alura.Tunes.Linq
{
    public static class Program
    {
        public static void Main()
        {
            Linq2.LinqParallel.Execute();
            Console.ReadKey();
        }
    }
}
using System;
using System.Threading.Tasks;

namespace MongoDBDotNet.Examples.Exemplos
{
    public static class ProgramAssincrono
    {
        public static void Execute(string[] args)
        {
            var T = MainSync(args);
            T.Wait();
            Console.WriteLine("Pressione ENTER");
            Console.ReadLine();
        }

        private static async Task MainSync(string[] args)

        {
            Console.WriteLine("Esperando 10 segundos ....");

            await Task.Delay(10000).ConfigureAwait(false);

            Console.WriteLine("Esperei 10 segundos ....");
        }
    }
}
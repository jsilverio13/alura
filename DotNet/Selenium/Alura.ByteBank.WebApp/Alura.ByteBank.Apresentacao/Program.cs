using Alura.ByteBank.Aplicacao.DTO;
using Alura.ByteBank.Apresentacao.Comandos;
using System;

namespace Alura.ByteBank.Apresentacao
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            //Console.BackgroundColor = ConsoleColor.DarkGreen;
            //Console.ForegroundColor = ConsoleColor.Black;

            string opcao;
            do
            {
                Console.Clear();
                Console.WriteLine(MostrarCabecalho());
                Console.WriteLine(MostrarMenu());
                opcao = LerOpcaoMenu();
                ProcessarOpcaoMenu(opcao);
            } while (opcao != "4");
        }

        private static string LerOpcaoMenu()
        {
            string opcao;
            Console.Write("Opção desejada: ");
            opcao = Console.ReadLine();
            return opcao;
        }

        private static string MostrarMenu()
        {
            string menu = "   Escolha uma opção:\n\n" +
                            "   1 - Cadastrar Agência\n" +
                            "   2 - Cadastrar Conta Corrente\n" +
                            "   3 - Listar Contas Correntes\n" +
                            "   4 - Sair do Programa \n";
            return menu;
        }

        private static string MostrarCabecalho()
        {
            return "[ CONTROLE DE CONTAS CORRENTES - BYTEBANK ]\n";
        }

        private static void ProcessarOpcaoMenu(string opcao)
        {
            switch (opcao)
            {
                case "1":
                    CadastarAgencia();
                    break;

                case "2":
                    CadastarConta();
                    break;

                case "3":
                    ListarContas();
                    break;

                case "4":
                    Console.WriteLine("Obrigado por utilizar o programa.");
                    break;

                default:
                    Console.WriteLine("Opção de menu inválida!");
                    break;
            }
        }

        private static void ListarContas()
        {
            var comando = new ContaCorrenteComando();
            var contas = comando.ObterTodos();
            if (contas != null)
            {
                foreach (var item in contas)
                {
                    Console.WriteLine("\n" + item.ToString());
                }
            }
            else
            {
                Console.WriteLine("A consulta não retornou dados.");
            }

            Console.ReadKey();
        }

        private static void CadastarConta()
        {
            var contaDto = new ContaCorrenteDTO();
            var clienteDto = new ClienteDTO();
            var agenciaDto = new AgenciaDTO();
            var comando = new ContaCorrenteComando();
            var clienteComando = new ClienteComando();
            var agenciaComando = new AgenciaComando();
            Console.Clear();
            Console.WriteLine("\n[CADASTRO DE CONTAS CORRENTES]");
            Console.Write("\nVocê deseja cadastrar um novo cliente? [s - sim ou n - não] ");
            var opcao = Console.ReadLine()![0];
            if (opcao == 's')
            {
                Console.WriteLine("\n\n[CADASTRO DE CLIENTE]");
                Console.Write("Nome Cliente: ");
                clienteDto.Nome = Console.ReadLine();
                Console.Write("Profissão Cliente: ");
                clienteDto.Profissao = Console.ReadLine();
                Console.Write("CPF Cliente: ");
                clienteDto.CPF = Console.ReadLine();
                if (clienteComando.Adicionar(clienteDto))
                {
                    Console.WriteLine("Cliente Cadastrada com sucesso!");
                    Console.ReadKey();
                }

                Console.Clear();
                Console.WriteLine("\n\n[CADASTRO DE CONTA]");
                Console.Write("Informe Saldo: ");
                contaDto.Saldo = double.Parse(Console.ReadLine() ?? string.Empty);
                Console.Write("Informe Numero Conta: ");
                contaDto.Numero = int.Parse(Console.ReadLine() ?? string.Empty);
                contaDto.ClienteId = clienteComando.ObterPorGuid(clienteDto.Identificador).Id;
                contaDto.Cliente = clienteComando.ObterPorGuid(clienteDto.Identificador);
                Console.Write("Informe Numero Agencia: ");
                contaDto.AgenciaId = int.Parse(Console.ReadLine() ?? string.Empty);
                contaDto.Agencia = agenciaComando.ObterPorId(contaDto.AgenciaId);
            }
            else
            {
                Console.Clear();
                Console.WriteLine("\n\n[CADASTRO DE CONTA]");
                Console.Write("Informe Saldo: ");
                contaDto.Saldo = double.Parse(Console.ReadLine() ?? string.Empty);
                Console.Write("Informe Numero Conta: ");
                contaDto.Numero = int.Parse(Console.ReadLine() ?? string.Empty);
                Console.Write("Informe Numero Cliente: ");
                contaDto.ClienteId = int.Parse(Console.ReadLine() ?? string.Empty);
                contaDto.Cliente = clienteComando.ObterPorId(contaDto.ClienteId);
                Console.Write("Informe Numero Agencia: ");
                contaDto.AgenciaId = int.Parse(Console.ReadLine() ?? string.Empty);
                contaDto.Agencia = agenciaComando.ObterPorId(contaDto.AgenciaId);
            }

            comando.Adicionar(contaDto);
            Console.WriteLine(contaDto.ToString());
            Console.ReadKey();
        }

        private static void CadastarAgencia()
        {
            var dto = new AgenciaDTO();
            var comando = new AgenciaComando();
            Console.Clear();
            Console.WriteLine("\n[CADASTRO DE AGÊNCIA]");
            Console.Write("Nome da Agência: ");
            dto.Nome = Console.ReadLine();
            Console.Write("Endereço da Agência: ");
            dto.Endereco = Console.ReadLine();
            Console.Write("Número da Agência: ");
            dto.Numero = int.Parse(Console.ReadLine() ?? string.Empty);

            if (comando.Adicionar(dto))
            {
                Console.WriteLine("Agência Cadastrada com sucesso!\n");
                Console.WriteLine($"\n\n===Dados da Agência===");
                string dados = $"Numero Agência: {dto.Numero}\n" +
                               $"Nome Agência {dto.Nome}\n" +
                               $"Endereço Agência {dto.Endereco}";
                Console.WriteLine(dados);
                Console.ReadKey();
            }
        }
    }
}
using Alura.ByteBank.Aplicacao.AplicacaoServico;
using Alura.ByteBank.Aplicacao.DTO;
using Alura.ByteBank.Dados.Repositorio;
using Alura.ByteBank.Dominio.Interfaces.Repositorios;
using Alura.ByteBank.Dominio.Interfaces.Servicos;
using Alura.ByteBank.Dominio.Services;
using System.Collections.Generic;

namespace Alura.ByteBank.Apresentacao.Comandos
{
    internal class ContaCorrenteComando
    {
        private readonly IContaCorrenteRepositorio _repositorio;
        private readonly IContaCorrenteServico _servico;
        private IClienteServico _cliente;
        private IAgenciaServico _agencia;
        private readonly ContaCorrenteServicoApp _contaCorrenteServicoApp;

        public ContaCorrenteComando()
        {
            _repositorio = new ContaCorrenteRepositorio();
            _servico = new ContaCorrenteServico(_repositorio);
            _contaCorrenteServicoApp = new ContaCorrenteServicoApp(_servico, _agencia, _cliente);
        }

        public bool Adicionar(ContaCorrenteDTO conta)
        {
            return _contaCorrenteServicoApp.Adicionar(conta);
        }

        public bool Atualizar(int id, ContaCorrenteDTO conta)
        {
            return _contaCorrenteServicoApp.Atualizar(id, conta);
        }

        public bool Excluir(int id)
        {
            return _contaCorrenteServicoApp.Excluir(id);
        }

        public ContaCorrenteDTO ObterPorId(int id)
        {
            return _contaCorrenteServicoApp.ObterPorId(id);
        }

        public List<ContaCorrenteDTO> ObterTodos()
        {
            return _contaCorrenteServicoApp.ObterTodos();
        }
    }
}
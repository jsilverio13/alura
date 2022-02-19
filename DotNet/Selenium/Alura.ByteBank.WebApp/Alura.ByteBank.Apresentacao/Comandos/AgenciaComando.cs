using Alura.ByteBank.Aplicacao.AplicacaoServico;
using Alura.ByteBank.Aplicacao.DTO;
using Alura.ByteBank.Dados.Repositorio;
using Alura.ByteBank.Dominio.Interfaces.Repositorios;
using Alura.ByteBank.Dominio.Interfaces.Servicos;
using Alura.ByteBank.Dominio.Services;
using System.Collections.Generic;

namespace Alura.ByteBank.Apresentacao.Comandos
{
    internal class AgenciaComando
    {
        private readonly IAgenciaRepositorio _repositorio;
        private readonly IAgenciaServico _servico;
        private readonly AgenciaServicoApp _agenciaServicoApp;

        public AgenciaComando()
        {
            _repositorio = new AgenciaRepositorio();
            _servico = new AgenciaServico(_repositorio);
            _agenciaServicoApp = new AgenciaServicoApp(_servico);
        }

        public bool Adicionar(AgenciaDTO agencia)
        {
            return _agenciaServicoApp.Adicionar(agencia);
        }

        public bool Atualizar(int id, AgenciaDTO agencia)
        {
            return _agenciaServicoApp.Atualizar(id, agencia);
        }

        public bool Excluir(int id)
        {
            return _agenciaServicoApp.Excluir(id);
        }

        public AgenciaDTO ObterPorId(int id)
        {
            return _agenciaServicoApp.ObterPorId(id);
        }

        public List<AgenciaDTO> ObterTodos()
        {
            return _agenciaServicoApp.ObterTodos();
        }
    }
}
import { inspect } from "../decorators/inspect.js";
import { domInjector } from "../decorators/domInjector.js";
import { logarTempoDeExecucacao } from "../decorators/logar-tempo-de-execucacao.js";
import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
import { NegociacoesService } from "../services/negociacoes-service.js";
import { imprimir } from "../utils/imprimir.js";

export class NegociacaoController {

    @domInjector('#data')
    private inputData: HTMLInputElement;
    @domInjector('#quantidade')
    private inputQuantidade: HTMLInputElement;
    @domInjector('#valor')
    private inputValor: HTMLInputElement;
    private negociacoes: Negociacoes = new Negociacoes();
    private negociacoesView: NegociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');
    private negociacoService = new NegociacoesService();

    constructor() {
        this.negociacoesView.update(this.negociacoes);
    }

    @logarTempoDeExecucacao()
    @inspect
    public adicionar(): void {
        const negociacao = this.criarNegociacao();
        if (!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView.update('Apenas negociações em dias uteis são aceitas');
            return;
        }

        this.negociacoes.adicionar(negociacao);
        imprimir(negociacao, this.negociacoes);
        this.limparFormulario();
        this.atualizarView();

    }

    public importarDados(): void {
        this.negociacoService
            .obterNegociacoes()
            .then(negociacoesHoje => {
                return negociacoesHoje.filter(negociacaoHoje => {
                    return !this.negociacoes.listar().some(negociacao => negociacao.ehIgual(negociacaoHoje))
                });
            })
            .then(negociacoesHoje => {
                for (let negociacao of negociacoesHoje) {
                    this.negociacoes.adicionar(negociacao)
                }

                this.negociacoesView.update(this.negociacoes);
            });
    }


    private criarNegociacao(): Negociacao {
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        );

        return negociacao;
    }

    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    private ehDiaUtil(data: Date) {
        return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO;
    }

    private atualizarView(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com suceso');
    }

}

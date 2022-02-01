import { inspect } from "../decorators/inspect.js";
import { logarTempoDeExecucacao } from "../decorators/logar-tempo-de-execucacao.js";

export abstract class View<T> {

    protected elemento: HTMLElement;

    constructor(selector: string) {
        const elemento = document.querySelector(selector);

        if (elemento) {
            this.elemento = <HTMLElement>elemento
        } else {
            throw Error('Seletor não existe no DOM')
        }
    }

    protected abstract template(model: T): string;


    public update(model: T): void {
        const template = this.template(model);
        this.elemento.innerHTML = template;
    }
}
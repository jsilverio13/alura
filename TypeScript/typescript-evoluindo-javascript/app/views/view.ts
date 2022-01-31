export abstract class View<T> {

    protected elemento: HTMLElement;
    private escapar = false;

    constructor(selector: string, escapar?: boolean) {
        const elemento = document.querySelector(selector);

        if (elemento) {
            this.elemento = <HTMLElement>elemento
        } else {
            throw Error('Seletor não existe no DOM')
        }

        this.escapar = escapar ? true : false;
    }

    protected abstract template(model: T): string;


    public update(model: T): void {
        const template = this.escapar ?
            this.template(model).replace(/<script>[\s\S]*?<\/script>/, '') :
            this.template(model);
        this.elemento.innerHTML = template;
    }
}
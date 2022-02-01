export function logarTempoDeExecucacao(emSegundos: boolean = true) {
    return function (
        traget: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const metodoOriginal = descriptor.value;
        descriptor.value = function (...args: any[]) {

            let unidade = emSegundos ? 'segundos' : 'milisegundos';
            let divisor = emSegundos ? 1000 : 1;

            const t1 = performance.now();

            const retorno = metodoOriginal.apply(this, args);

            const t2 = performance.now();

            console.log(`Método ${propertyKey}, tempo de execucação: ${(t2 - t1) / divisor} em ${unidade}`);

            retorno
        }

        return descriptor;
    }
}
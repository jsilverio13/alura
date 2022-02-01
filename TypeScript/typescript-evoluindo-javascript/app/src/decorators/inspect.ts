export function inspect
    (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
    const metodoOriginal = descriptor.value;

    descriptor.value = function (...args: any[]) {
        console.log(`--- Método: ${propertyKey}`);
        console.log(`------ Parametros: ${JSON.stringify(args)}`);
        const retorno = metodoOriginal.apply(this, args);
        console.log(`--------- Retorno: ${retorno}`)
        return retorno
    }

    return descriptor
}

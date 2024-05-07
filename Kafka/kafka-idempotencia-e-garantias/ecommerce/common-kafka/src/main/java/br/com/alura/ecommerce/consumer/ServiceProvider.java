package br.com.alura.ecommerce.consumer;

import java.util.Map;
import java.util.concurrent.Callable;

@SuppressWarnings({"unchecked", "rawtypes"})
public class ServiceProvider<T> implements Callable<Void> {
    private final ServiceFactory factory;

    public ServiceProvider(ServiceFactory factory) {
        this.factory = factory;
    }

    @Override
    public Void call() throws Exception {
        var myService = factory.create();
        try (var service = new KafkaService(myService.getConsumerGroup(),
                myService.getTopic(),
                myService::parse,
                Map.of())) {

            service.run();

            return null;
        }
    }
}

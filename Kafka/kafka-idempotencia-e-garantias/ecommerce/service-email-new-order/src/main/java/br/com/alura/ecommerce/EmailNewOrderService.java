package br.com.alura.ecommerce;

import br.com.alura.ecommerce.consumer.KafkaService;
import br.com.alura.ecommerce.dispatcher.KafkaDispatcher;
import org.apache.kafka.clients.consumer.ConsumerRecord;

import java.util.Map;
import java.util.concurrent.ExecutionException;

@SuppressWarnings("CallToPrintStackTrace")
public class EmailNewOrderService {
    private final KafkaDispatcher<Email> emailDispatcher = new KafkaDispatcher<>();

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        var fraudService = new EmailNewOrderService();
        try (var service = new KafkaService<>(EmailNewOrderService.class.getSimpleName(),
                "ECOMMERCE_NEW_ORDER",
                fraudService::parse,
                Map.of())) {
            service.run();
        }
    }

    private void parse(ConsumerRecord<String, Message<Order>> record) throws ExecutionException, InterruptedException {
        System.out.println("------------------------------------------");
        System.out.println("Processing new order, preparing email");
        System.out.println(record.key());
        System.out.println(record.value());
        System.out.println(record.partition());
        System.out.println(record.offset());
        var emailCode = new Email("subject", "Enviando email");

        String message = record.value().getPayload().getEmail();
        CorrelationId id = record.value().getId().continueWith(EmailNewOrderService.class.getSimpleName());

        emailDispatcher.send("ECOMMERCE_SEND_EMAIL", message, id, emailCode);

        System.out.println("Email processed");
    }
}

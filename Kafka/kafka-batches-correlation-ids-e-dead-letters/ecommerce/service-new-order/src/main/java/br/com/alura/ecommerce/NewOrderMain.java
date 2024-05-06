package br.com.alura.ecommerce;

import java.math.BigDecimal;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

public class NewOrderMain {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        try (var orderDispatcher = new KafkaDispatcher<Order>()) {
            try (var emailDispatcher = new KafkaDispatcher<Email>()) {
                for (var i = 0; i < 10; i++) {

                    var orderId = UUID.randomUUID().toString();
                    var amount = BigDecimal.valueOf(Math.random() * 5000 + 1);
                    var email = Math.random() + "@email.com";

                    var order = new Order(orderId, amount, email);
                    var message = new Message<>(new CorrelationId(NewOrderMain.class.getSimpleName()), order);

                    orderDispatcher.send("ECOMMERCE_NEW_ORDER", orderId, message.getId(), order);

                    var emailCode = new Email("teste", "Enviando email");
                    emailDispatcher.send("ECOMMERCE_SEND_EMAIL", orderId, message.getId(), emailCode);
                }
            }
        }
    }
}

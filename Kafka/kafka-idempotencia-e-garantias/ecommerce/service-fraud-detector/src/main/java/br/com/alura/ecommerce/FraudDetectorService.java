package br.com.alura.ecommerce;

import br.com.alura.ecommerce.consumer.ConsumerService;
import br.com.alura.ecommerce.consumer.ServiceRunner;
import br.com.alura.ecommerce.dispatcher.KafkaDispatcher;
import org.apache.kafka.clients.consumer.ConsumerRecord;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.concurrent.ExecutionException;

@SuppressWarnings({"rawtypes", "unchecked", "CallToPrintStackTrace"})
public class FraudDetectorService implements ConsumerService<Message<Order>> {
    private final KafkaDispatcher<Order> orderDispatcher = new KafkaDispatcher<>();
    private final LocalDatabase database;

    FraudDetectorService() throws SQLException {
        this.database = new LocalDatabase("frauds_database");
        var tableSql = "create table Orders (" +
                "uuid varchar(200) primary key," +
                "is_fraud boolean)";
        this.database.createIfNoExists(tableSql);

    }

    public static void main(String[] args) {
        new ServiceRunner(FraudDetectorService::new).start(1);
    }

    @Override
    public void parse(ConsumerRecord<String, Message<Order>> record) throws ExecutionException, InterruptedException, SQLException {
        System.out.println("------------------------------------------");
        System.out.println("Processing new order, checking for fraud");
        System.out.println(record.key());
        System.out.println(record.value());
        System.out.println(record.partition());
        System.out.println(record.offset());
        var message = record.value();
        var order = message.getPayload();
        if (wasProcessed(order)) {
            return;
        }
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            // ignoring
            e.printStackTrace();
        }

        if (isFraud(order)) {
            System.out.println("Order is a fraud!!!!!");
            database.update("insert into Orders(uuid,is_fraud) values(?, true)", order.getOrderId());
            orderDispatcher.send("ECOMMERCE_ORDER_REJECTED", order.getEmail(), message.getId().continueWith(FraudDetectorService.class.getSimpleName()), order);
        } else {
            System.out.println("Approved: " + order);
            database.update("insert into Orders(uuid,is_fraud) values(?, false)", order.getOrderId());
            orderDispatcher.send("ECOMMERCE_ORDER_APPROVED", order.getEmail(), message.getId().continueWith(FraudDetectorService.class.getSimpleName()), order);
        }


        System.out.println("Order processed");
    }

    private boolean wasProcessed(Order order) throws SQLException {
        var results = database.query("select uuid from Orders where uuid = ? limit 1", order.getOrderId());
        return results.next();
    }

    @Override
    public String getTopic() {
        return "ECOMMERCE_NEW_ORDER";
    }

    @Override
    public String getConsumerGroup() {
        return FraudDetectorService.class.getSimpleName();
    }

    private boolean isFraud(Order order) {
        return order.getAmount().compareTo(new BigDecimal("4500")) >= 0;
    }
}

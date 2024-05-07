package br.com.alura.ecommerce.consumer;

import org.apache.kafka.clients.consumer.ConsumerRecord;

public interface ConsumerService<T> {
    void parse(ConsumerRecord<String, T> record) throws Exception;

    String getTopic();

    String getConsumerGroup();
}

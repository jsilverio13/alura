package br.com.alura.ecommerce;

import org.apache.kafka.clients.consumer.ConsumerRecord;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@SuppressWarnings("CallToPrintStackTrace")
public class ReadingReportService {
    private final KafkaDispatcher<User> orderDispatcher = new KafkaDispatcher<>();
    private static Path SOURCE = new File("srv/main/resources/report.txt").toPath();

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        var fraudService = new ReadingReportService();
        try (var service = new KafkaService<>(ReadingReportService.class.getSimpleName(),
                "USER_GENERATE_READING_REPORT",
                fraudService::parse,
                User.class,
                Map.of())) {
            service.run();
        }
    }

    private void parse(ConsumerRecord<String, User> record) throws IOException {
        System.out.println("------------------------------------------");
        System.out.println("Processing report for " + record.value());
        var user = record.value();
        var target = new File((user.getReportPath()));
        IO.copyTo(SOURCE, target);
        IO.append(target, "Created for " + user.getUuid());

        System.out.println("File created " + target.getAbsolutePath());
    }

}

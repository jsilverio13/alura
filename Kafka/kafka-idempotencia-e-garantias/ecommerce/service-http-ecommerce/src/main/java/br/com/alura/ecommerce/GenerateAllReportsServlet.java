package br.com.alura.ecommerce;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class GenerateAllReportsServlet extends HttpServlet {
    private final KafkaDispatcher<String> batchDispatcher = new KafkaDispatcher<>();

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException {
        try {
            batchDispatcher.send("ECOMMERCE_SEND_MESSAGE_TO_ALL_USERS", "ECOMMERCE_USER_GENERATE_READING_REPORT", new CorrelationId(GenerateAllReportsServlet.class.getSimpleName()), "ECOMMERCE_USER_GENERATE_READING_REPORT");

            System.out.println("Sent generate report to all users successfully!");
            resp.setStatus(HttpServletResponse.SC_OK);
            resp.getWriter().println("Report requests generated!");
        } catch (ExecutionException | InterruptedException | RuntimeException | IOException e) {
            throw new ServletException(e);
        }
    }

    @Override
    public void destroy() {
        batchDispatcher.close();
        super.destroy();
    }
}

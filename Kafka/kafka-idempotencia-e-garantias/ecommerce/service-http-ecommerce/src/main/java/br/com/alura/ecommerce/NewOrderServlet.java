package br.com.alura.ecommerce;

import br.com.alura.ecommerce.dispatcher.KafkaDispatcher;
import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

public class NewOrderServlet extends HttpServlet {
    private final KafkaDispatcher<Order> orderKafkaDispatcher = new KafkaDispatcher<>();

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException {
        try {
            var email = req.getParameter("email");
            var amount = new BigDecimal(req.getParameter("amount"));
            var orderId = UUID.randomUUID().toString();

            var order = new Order(orderId, amount, email);
            var message = new Message<>(new CorrelationId(NewOrderServlet.class.getSimpleName()), order);

            orderKafkaDispatcher.send("ECOMMERCE_NEW_ORDER", email, message.getId(), order);

            System.out.println("New order sent successfully!");
            resp.setStatus(HttpServletResponse.SC_OK);
            resp.getWriter().println("New order sent successfully!");
        } catch (ExecutionException | InterruptedException | RuntimeException | IOException e) {
            throw new ServletException(e);
        }
    }

    @Override
    public void destroy() {
        orderKafkaDispatcher.close();
        super.destroy();
    }
}

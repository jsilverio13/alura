package br.com.alura.ecommerce;

public class User {
    private final String uuid;

    public User(String uuid) {
        this.uuid = uuid;
    }

    @Override
    public String toString() {
        return "br.com.alura.ecommerce.User{" +
                "uuid='" + uuid + '\'' +
                '}';
    }

    public String getReportPath() {
        return "target/" + uuid + "-report.txt";
    }

    public String getUuid() {
        return this.uuid;
    }
}

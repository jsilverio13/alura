package br.com.alura.ecommerce;

import java.sql.*;

@SuppressWarnings("CallToPrintStackTrace")
public class LocalDatabase {

    private final Connection connection;

    LocalDatabase(String name) throws SQLException {
        String url = "jdbc:sqlite:target/" + name + ".db";

        this.connection = DriverManager.getConnection(url);
    }

    public void createIfNoExists(String sql) {
        try {
            connection.createStatement().execute(sql);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public boolean update(String statement, String... params) throws SQLException {
        var preparedStatement = getPreparedStatement(statement, params);
        return preparedStatement.execute();
    }


    public ResultSet query(String statement, String... params) throws SQLException {
        var preparedStatement = getPreparedStatement(statement, params);
        return preparedStatement.executeQuery();
    }

    private PreparedStatement getPreparedStatement(String statement, String[] params) throws SQLException {
        var preparedStatement = connection.prepareStatement(statement);
        for (int i = 0; i < params.length; i++) {
            preparedStatement.setString(i + 1, params[i]);
        }
        return preparedStatement;
    }

    public void close() throws SQLException {
        connection.close();
    }
}

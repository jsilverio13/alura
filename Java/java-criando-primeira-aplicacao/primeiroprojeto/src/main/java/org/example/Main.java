package org.example;

public class Main {
    public static void main(String[] args) {

        System.out.println("Esse é o Screen Match");
        System.out.println("Filme: Top Gun Maverick");

        int anoDeLancamento = 2022;
        System.out.println("Ano de lancamento: " + anoDeLancamento);
        boolean incluidoNoPlano = true;
        double notaDoFilme = 8.1;

        //Média calculada das notas
        double media = (9.8 + 6.3 + 8) / 3;
        System.out.println(media);
        String sinopse = "Filme de aventura com galã dos anos 80";

        System.out.println(sinopse);

        int classificacao = (int) (media/2);

        System.out.println(classificacao);

    }
}
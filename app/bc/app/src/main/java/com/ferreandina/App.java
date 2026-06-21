package com.ferreandina;

import com.ferreandina.routes.Routes;

import io.javalin.Javalin;

public class App {
    public static void main(String[] args) {
        Javalin.create(
                config -> {
                    new Routes(config);
                }).start(8080);
    }
}

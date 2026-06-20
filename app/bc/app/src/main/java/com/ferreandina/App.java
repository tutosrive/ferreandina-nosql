package com.ferreandina;

import com.ferreandina.routes.BranchRoute;
import com.ferreandina.routes.UserRoute;
import io.javalin.Javalin;

public class App {
    public static void main(String[] args) {
        Javalin.create(
                config -> {
                    new UserRoute(config);
                    new BranchRoute(config);
                }).start(8080);
    }
}

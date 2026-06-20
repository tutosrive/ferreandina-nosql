package com.ferreandina.routes;

import com.ferreandina.controllers.SupplieController;

import io.javalin.config.JavalinConfig;

public class SupplieRoute extends Route<SupplieController> {

    public SupplieRoute(JavalinConfig config) {
        super("supplies/{supplie_id}", config, SupplieController.class);
    }

}

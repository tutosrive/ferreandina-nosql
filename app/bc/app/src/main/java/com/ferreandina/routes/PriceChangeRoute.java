package com.ferreandina.routes;

import com.ferreandina.controllers.PriceChangeController;

import io.javalin.config.JavalinConfig;

public class PriceChangeRoute extends Route<PriceChangeController> {

    public PriceChangeRoute(JavalinConfig config) {
        super("price-changes/{id}", config, PriceChangeController.class);
    }

}

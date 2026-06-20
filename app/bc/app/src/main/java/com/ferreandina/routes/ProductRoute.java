package com.ferreandina.routes;

import com.ferreandina.controllers.ProductController;

import io.javalin.config.JavalinConfig;

public class ProductRoute extends Route<ProductController> {

    public ProductRoute(JavalinConfig config) {
        super("products/{product_id}", config, ProductController.class);
    }

}

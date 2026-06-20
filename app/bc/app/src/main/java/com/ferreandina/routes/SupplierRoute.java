package com.ferreandina.routes;

import com.ferreandina.controllers.SupplierController;

import io.javalin.config.JavalinConfig;

public class SupplierRoute extends Route<SupplierController> {

    public SupplierRoute(JavalinConfig config) {
        super("suppliers/{supplier_id}", config, SupplierController.class);
    }

}

package com.ferreandina.routes;

import com.ferreandina.controllers.CustomerController;
import io.javalin.config.JavalinConfig;

public class CustomerRoute extends Route<CustomerController> {

    public CustomerRoute(JavalinConfig config) {
        super("customers/{customer_id}", config, CustomerController.class);
    }

}

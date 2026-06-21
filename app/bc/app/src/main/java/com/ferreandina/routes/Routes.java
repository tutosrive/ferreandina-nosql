package com.ferreandina.routes;

import io.javalin.config.JavalinConfig;

public class Routes {
    public Routes(JavalinConfig config) {
        new BranchRoute(config);
        new CategoryRoute(config);
        new CustomerRoute(config);
        new PriceChangeRoute(config);
        new ProductRoute(config);
        new SupplierRoute(config);
        new SupplieRoute(config);
        new WorkerRoute(config);
    }
}

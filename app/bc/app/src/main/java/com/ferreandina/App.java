package com.ferreandina;

import com.ferreandina.routes.BranchRoute;
import com.ferreandina.routes.CategoryRoute;
import com.ferreandina.routes.CustomerRoute;
import com.ferreandina.routes.PriceChangeRoute;
import com.ferreandina.routes.ProductRoute;
import com.ferreandina.routes.SupplierRoute;
import com.ferreandina.routes.SupplieRoute;
import com.ferreandina.routes.UserRoute;
import com.ferreandina.routes.WorkerRoute;

import io.javalin.Javalin;

public class App {
    public static void main(String[] args) {
        Javalin.create(
                config -> {
                    new UserRoute(config);
                    new BranchRoute(config);
                    new CategoryRoute(config);
                    new CustomerRoute(config);
                    new PriceChangeRoute(config);
                    new ProductRoute(config);
                    new SupplierRoute(config);
                    new SupplieRoute(config);
                    new WorkerRoute(config);
                }).start(8080);
    }
}

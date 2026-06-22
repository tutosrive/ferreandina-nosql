package com.ferreandina.routes;

import com.ferreandina.controllers.*;
import io.javalin.config.JavalinConfig;
import static io.javalin.apibuilder.ApiBuilder.*;

public class Routes {
    public Routes(JavalinConfig config) {
        BranchController branchController = new BranchController();
        CategoryController categoryController = new CategoryController();
        ProductController productController = new ProductController();
        SupplieController supplyController = new SupplieController();
        CustomerController customerController = new CustomerController();
        WorkerController workerController = new WorkerController();

        config.routes.apiBuilder(() -> {
            path("/api", () -> {
                get("/branches/low-stock", branchController::getLowStockProducts);
                patch("/branches/clean-out-of-stock", branchController::cleanOutOfStock);
                get("/branches/{id}/products", branchController::getBranchProducts);
                patch("/branches/{id}/remove-product/{productId}", branchController::removeProductFromBranch);

                // Products
                get("/products/category/{categoryId}", productController::getProductsByCategory);

                // Supplies
                get("/supplies/defective-report", supplyController::getDefectiveReport);

                crud("/branches/{id}", branchController);
                crud("/categories/{id}", categoryController);
                crud("/products/{id}", productController);
                crud("/supplies/{id}", supplyController);

                crud("/customers/{id}", customerController);
                crud("/workers/{id}", workerController);
            });
        });
    }
}
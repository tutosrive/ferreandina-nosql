package com.ferreandina.routes;

import com.ferreandina.controllers.CategoryController;

import io.javalin.config.JavalinConfig;

public class CategoryRoute extends Route<CategoryController> {

    public CategoryRoute(JavalinConfig config) {
        super("categories/{category_id}", config, CategoryController.class);
    }

}

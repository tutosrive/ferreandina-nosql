package com.ferreandina.routes;

import io.javalin.apibuilder.ApiBuilder;
import io.javalin.apibuilder.CrudHandler;
import io.javalin.config.JavalinConfig;

public class Route<T extends CrudHandler> {
    protected T controller;
    protected JavalinConfig config;
    protected String pathRoute;

    public Route(String path, JavalinConfig config, Class<T> clazz) {
        this.config = config;
        this.pathRoute = path;
        try {
            this.controller = clazz.getDeclaredConstructor().newInstance();
        } catch (Exception e) {
        }

        this.configRoute();
    }

    public JavalinConfig getConfig() {
        return this.config;
    }

    public T getController() {
        return this.controller;
    }

    private void configRoute() {
        this.config.routes.apiBuilder(() -> {
            ApiBuilder.crud(pathRoute, controller);
        });
    }
}

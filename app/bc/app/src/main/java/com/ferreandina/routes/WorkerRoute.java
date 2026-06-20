package com.ferreandina.routes;

import com.ferreandina.controllers.WorkerController;

import io.javalin.config.JavalinConfig;

public class WorkerRoute extends Route<WorkerController> {

    public WorkerRoute(JavalinConfig config) {
        super("workers/{worker_id}", config, WorkerController.class);
    }

}

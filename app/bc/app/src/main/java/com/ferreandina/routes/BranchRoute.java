package com.ferreandina.routes;

import com.ferreandina.controllers.BranchController;
import io.javalin.config.JavalinConfig;

public class BranchRoute extends Route<BranchController> {
    public BranchRoute(JavalinConfig config) {
        super("branches/{branch_id}", config, BranchController.class);
    }

}

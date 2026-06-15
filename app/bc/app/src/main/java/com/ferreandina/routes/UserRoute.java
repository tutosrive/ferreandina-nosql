package com.ferreandina.routes;

import com.ferreandina.controllers.UserController;
import io.javalin.config.JavalinConfig;

public class UserRoute extends Route<UserController> {
    public UserRoute(JavalinConfig config) {
        super("users/{user_id}", config, UserController.class);
    }
}

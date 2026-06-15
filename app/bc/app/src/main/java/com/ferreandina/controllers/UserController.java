package com.ferreandina.controllers;

import com.ferreandina.models.UserModel;
import com.ferreandina.utils.ResultUtil;
import com.ferreandina.utils.Validator;
import io.javalin.http.Context;

public class UserController extends Controller<UserModel> {
    public UserController() {
        this.validator = new Validator<>();
    }

    @Override
    public void create(Context ctx) {
        UserModel user = validator.validateBody(UserModel.class, ctx);
        ResultUtil.javalinReturn(ctx, String.format("User created with body: %s", user.toJsonObject()));
    }

    @Override
    public void delete(Context ctx, String id) {
        ResultUtil.javalinReturn(ctx, String.format("User deleted with id: %s", id));
    }

    @Override
    public void getAll(Context ctx) {
        ResultUtil.javalinReturn(ctx, "Getting all users");
    }

    @Override
    public void getOne(Context ctx, String id) {
        ResultUtil.javalinReturn(ctx, String.format("User get with id: %s", id));
    }

    @Override
    public void update(Context ctx, String id) {
        ResultUtil.javalinReturn(ctx, String.format("User updated with id: %s", id));
    }
}

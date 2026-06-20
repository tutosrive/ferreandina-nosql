package com.ferreandina.controllers;

import com.ferreandina.utils.Validator;
import io.javalin.apibuilder.CrudHandler;
import io.javalin.http.Context;

public abstract class Controller<T> implements CrudHandler {
    Validator<T> validator;

    public Controller() {
        this.validator = new Validator<T>();
    }

    @Override
    public void create(Context ctx) {
        ctx.result("Object created sucessfully");
    }

    @Override
    public void delete(Context ctx, String id) {
        ctx.result(String.format("Object with id \"%s\" deleted sucessfully", id));

    }

    @Override
    public void getAll(Context ctx) {
        ctx.result("There are all objects ...");

    }

    @Override
    public void getOne(Context ctx, String id) {
        ctx.result(String.format("There are object with id \"%s\" ...", id));

    }

    @Override
    public void update(Context ctx, String id) {
        ctx.result(String.format("Object with id \"%s\" updated sucessfully", id));

    }

}

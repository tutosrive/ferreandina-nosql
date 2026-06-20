package com.ferreandina.controllers;

import com.ferreandina.models.Model;
import com.ferreandina.services.Service;
import com.ferreandina.utils.ResultUtil;
import com.ferreandina.utils.Validator;
import io.javalin.apibuilder.CrudHandler;
import io.javalin.http.Context;

public abstract class Controller<T extends Model> implements CrudHandler {
    Validator<T> validator;
    ResultUtil<T> resultMan;
    Service<T> service;

    public Controller(Class<T> clazz, String collectionName) {
        this.validator = new Validator<T>();
        this.resultMan = new ResultUtil<>();
        this.service = new Service<T>(clazz);
        this.service.setCollection(collectionName);
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

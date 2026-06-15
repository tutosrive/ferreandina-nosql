package com.ferreandina.controllers;

import com.ferreandina.utils.Validator;
import io.javalin.apibuilder.CrudHandler;

public abstract class Controller<T> implements CrudHandler {
    Validator<T> validator;

    public Controller() {
        this.validator = new Validator<T>();
    }
}

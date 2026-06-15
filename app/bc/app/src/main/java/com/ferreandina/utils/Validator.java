package com.ferreandina.utils;

import io.javalin.http.Context;

public class Validator<T> {

    public final T validateBody(Class<T> clazz, Context ctx) {
        return ctx.bodyValidator(clazz).check(obj -> obj != null, "The body don't be null!").get();
    }
}

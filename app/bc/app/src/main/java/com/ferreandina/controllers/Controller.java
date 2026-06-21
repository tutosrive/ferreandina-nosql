package com.ferreandina.controllers;

import java.util.Map;
import org.bson.conversions.Bson;
import com.ferreandina.models.Model;
import com.ferreandina.services.Service;
import com.ferreandina.utils.ResultUtil;
import com.ferreandina.utils.Utils;
import com.ferreandina.utils.Validator;
import com.mongodb.client.FindIterable;
import com.mongodb.client.model.Filters;

import io.javalin.apibuilder.CrudHandler;
import io.javalin.http.Context;

public abstract class Controller<T extends Model> implements CrudHandler {
    private Validator<T> validator;
    private ResultUtil<T> resultMan;
    private Service<T> service;
    private Class<T> clazz;

    public Controller(Class<T> clazz, String collectionName) {
        this.clazz = clazz;
        this.validator = new Validator<T>();
        this.resultMan = new ResultUtil<>();
        this.service = new Service<T>(this.clazz);
        this.service.setCollection(collectionName);
    }

    @Override
    public void create(Context ctx) {
        T document = this.validator.validateBody(this.clazz, ctx);
        Integer insertedId = this.service.add(document).asInt32().getValue();
        this.resultMan.javalinReturn(ctx,
                String.format("%s inserted with ID '%d'", this.clazz.getSimpleName(), insertedId));
    }

    @Override
    public void delete(Context ctx, String id) {
        Integer idInt = Integer.parseInt(id);
        Bson filter = Filters.eq("_id", idInt);
        Long deletedCount = this.service.delete(filter);
        this.resultMan.javalinUpdateDelete(
                ctx, deletedCount, true,
                String.format("%s deleted with id: %d", this.clazz.getSimpleName(), idInt));
    }

    @Override
    public void getAll(Context ctx) {
        FindIterable<T> data = this.service.getAll();
        this.resultMan.javalinReturn(ctx, data, String.format("There are all %ss", this.clazz.getSimpleName()));
    }

    @Override
    public void getOne(Context ctx, String id) {
        Integer idInt = Integer.parseInt(id);
        Bson filter = Filters.eq("_id", idInt);
        T document = this.service.getOne(filter);
        this.resultMan.javalinReturn(
                ctx, document, String.format("%s get with id: %s", this.clazz.getSimpleName(), id));
    }

    @Override
    public void update(Context ctx, String id) {
        try {
            Integer idInt = Integer.parseInt(id);
            Bson filter = Filters.eq("_id", idInt);
            @SuppressWarnings("unchecked")
            Map<String, Object> bodyMap = ctx.bodyAsClass(Map.class);
            Bson updates = Utils.fromMapToBsonUpdate(bodyMap);
            Long updatedCount = this.service.updateOne(filter, updates);
            this.resultMan.javalinUpdateDelete(
                    ctx, updatedCount, false,
                    String.format("%s with id %d updated", this.clazz.getSimpleName(), idInt));
        } catch (Exception e) {
            this.resultMan.javalinReturn(ctx, e);
        }
    }
}

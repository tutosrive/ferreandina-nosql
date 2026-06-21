package com.ferreandina.controllers;

import org.bson.conversions.Bson;

import com.ferreandina.models.CustomerModel;
import com.ferreandina.utils.Utils;
import com.mongodb.client.FindIterable;
import com.mongodb.client.model.Filters;
import io.javalin.http.Context;

public class CustomerController extends Controller<CustomerModel> {
    public CustomerController() {
        super(CustomerModel.class, "customers");
    }

    @Override
    public void create(Context ctx) {
        CustomerModel Customer = this.validator.validateBody(CustomerModel.class, ctx);
        String insertedId = this.service.add(Customer);
        this.resultMan.javalinReturn(ctx, String.format("Customer inserted with ID = '%s'", insertedId));
    }

    @Override
    public void delete(Context ctx, String id) {
        Integer idInt = Integer.parseInt(id);
        this.resultMan.javalinReturn(ctx, String.format("Customer deleted with id: %d", idInt));
    }

    @Override
    public void getAll(Context ctx) {
        FindIterable<CustomerModel> data = this.service.getAll();
        this.resultMan.javalinReturn(ctx, data, "There are all Customers");
    }

    @Override
    public void getOne(Context ctx, String id) {
        Integer idInt = Integer.parseInt(id);
        Bson filter = Filters.eq("_id", idInt);
        CustomerModel customer = this.service.getOne(filter);
        this.resultMan.javalinReturn(ctx, customer, String.format("Customer get with id: %s", id));
    }

    @Override
    public void update(Context ctx, String id) {
        try {
            Integer idInt = Integer.parseInt(id);
            CustomerModel customerUpdate = this.validator.validateBody(CustomerModel.class, ctx);
            Bson filter = Filters.eq("_id", idInt);
            Bson updates = Utils.fromModelToBsonUpdate(customerUpdate);
            this.service.updateOne(filter, updates);
            this.resultMan.javalinReturn(ctx, String.format("Customer with id %d updated with this data: %s", idInt,
                    updates.toBsonDocument().get("value")));
        } catch (Exception e) {
            this.resultMan.javalinReturn(ctx, e);
        }
    }
}

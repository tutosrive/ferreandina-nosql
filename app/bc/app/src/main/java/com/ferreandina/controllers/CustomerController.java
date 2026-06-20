package com.ferreandina.controllers;

import org.bson.conversions.Bson;

import com.ferreandina.models.CustomerModel;
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
        this.resultMan.javalinReturn(ctx, String.format("Customer deleted with id: %s", id));
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
        this.resultMan.javalinReturn(ctx, String.format("Missing call service for CUstomer with id: %s", id));
    }
}

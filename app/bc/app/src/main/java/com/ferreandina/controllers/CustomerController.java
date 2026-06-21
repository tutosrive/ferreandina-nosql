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

    // @Override
    // public void create(Context ctx) {
    // CustomerModel customer = this.validator.validateBody(CustomerModel.class,
    // ctx);
    // Integer insertedId = this.service.add(customer).asInt32().getValue();
    // this.resultMan.javalinReturn(ctx, String.format("Customer inserted with ID
    // '%d'", insertedId));
    // }

    // @Override
    // public void delete(Context ctx, String id) {
    // Integer idInt = Integer.parseInt(id);
    // Bson filter = Filters.eq("_id", idInt);
    // Long deletedCount = this.service.delete(filter);
    // this.resultMan.javalinUpdateDelete(ctx, deletedCount, true,
    // String.format("Customer deleted with id: %d", idInt));
    // }

    // @Override
    // public void getAll(Context ctx) {
    // FindIterable<CustomerModel> data = this.service.getAll();
    // this.resultMan.javalinReturn(ctx, data, "There are all Customers");
    // }

    // @Override
    // public void getOne(Context ctx, String id) {
    // Integer idInt = Integer.parseInt(id);
    // Bson filter = Filters.eq("_id", idInt);
    // CustomerModel customer = this.service.getOne(filter);
    // this.resultMan.javalinReturn(ctx, customer, String.format("Customer get with
    // id: %s", id));
    // }

    // @Override
    // public void update(Context ctx, String id) {
    // try {
    // Integer idInt = Integer.parseInt(id);
    // CustomerModel customerUpdate =
    // this.validator.validateBody(CustomerModel.class, ctx);
    // Bson filter = Filters.eq("_id", idInt);
    // Bson updates = Utils.fromModelToBsonUpdate(customerUpdate);
    // Long updatedCount = this.service.updateOne(filter, updates);
    // this.resultMan.javalinUpdateDelete(
    // ctx, updatedCount, false,
    // String.format("Customer with id %d updated", idInt));
    // } catch (Exception e) {
    // this.resultMan.javalinReturn(ctx, e);
    // }
    // }
}

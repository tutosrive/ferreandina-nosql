package com.ferreandina.controllers;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;

import com.ferreandina.models.ProductModel;
import com.mongodb.client.model.Filters;

import io.javalin.http.Context;

public class ProductController extends Controller<ProductModel> {
    public ProductController() {
        super(ProductModel.class, "products");
    }

    // GET /products/category/{categoryId}
    // db.products.find({ "category_id": 11 })
    public void getProductsByCategory(Context ctx) {
        try {
            Integer categoryId = Integer.parseInt(ctx.pathParam("categoryId"));

            List<ProductModel> products = this.service.getConn().collection
                    .find(Filters.eq("category_id", categoryId))
                    .into(new ArrayList<>());
            JSONArray arr = new JSONArray().put(products);
            this.resultMan.javalinReturn(ctx, arr, "Productos filtrados por categoría");
        } catch (Exception e) {
            this.resultMan.javalinReturn(ctx, e);
        }
    }
}

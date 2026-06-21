package com.ferreandina.controllers;

import com.ferreandina.models.ProductModel;

public class ProductController extends Controller<ProductModel> {
    public ProductController() {
        super(ProductModel.class, "products");
    }
}

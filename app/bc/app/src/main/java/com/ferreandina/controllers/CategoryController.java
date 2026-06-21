package com.ferreandina.controllers;

import com.ferreandina.models.CategoryModel;

public class CategoryController extends Controller<CategoryModel> {
    public CategoryController() {
        super(CategoryModel.class, "categories");
    }
}

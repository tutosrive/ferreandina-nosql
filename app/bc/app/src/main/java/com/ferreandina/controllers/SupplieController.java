package com.ferreandina.controllers;

import com.ferreandina.models.SupplieModel;

public class SupplieController extends Controller<SupplieModel> {
    public SupplieController() {
        super(SupplieModel.class, "supplies");
    }
}

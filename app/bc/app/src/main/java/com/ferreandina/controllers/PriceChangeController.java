package com.ferreandina.controllers;

import com.ferreandina.models.PriceChangeModel;

public class PriceChangeController extends Controller<PriceChangeModel> {
    public PriceChangeController() {
        super(PriceChangeModel.class, "price_changes");
    }
}

package com.ferreandina.controllers;

import com.ferreandina.models.SupplierModel;

public class SupplierController extends Controller<SupplierModel> {

    public SupplierController() {
        super(SupplierModel.class, "suppliers");
    }

}

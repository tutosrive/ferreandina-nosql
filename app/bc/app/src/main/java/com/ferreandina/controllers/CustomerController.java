package com.ferreandina.controllers;

import com.ferreandina.models.CustomerModel;

public class CustomerController extends Controller<CustomerModel> {
    public CustomerController() {
        super(CustomerModel.class, "customers");
    }
}

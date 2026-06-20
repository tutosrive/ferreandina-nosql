package com.ferreandina.services;

import com.ferreandina.models.CustomerModel;

public class CustomerService extends Service<CustomerModel> {
    public CustomerService() {
        super(CustomerModel.class);
    }
}

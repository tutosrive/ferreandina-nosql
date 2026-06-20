package com.ferreandina.models;

import org.jspecify.annotations.Nullable;

public class SupplierModel extends Model {
    @Nullable
    private String name;
    @Nullable
    private String email;
    @Nullable
    private String phone;

    public SupplierModel() {
        this(null, null, null, null);
    }

    public SupplierModel(Integer id, String name, String email, String phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return this.phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

}

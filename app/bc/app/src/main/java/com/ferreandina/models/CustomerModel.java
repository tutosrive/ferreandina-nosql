package com.ferreandina.models;

import org.bson.types.ObjectId;
import org.jspecify.annotations.Nullable;

public class CustomerModel extends Model {
    @Nullable
    private String ni;
    @Nullable
    private String alias;
    @Nullable
    private String category;
    @Nullable
    private String phone;

    public CustomerModel() {
        this(null, null, null, null, null);
    }

    public CustomerModel(ObjectId id, String ni, String alias, String category, String phone) {
        this.id = id;
        this.ni = ni;
        this.alias = alias;
        this.category = category;
        this.phone = phone;
    }

    public String getNi() {
        return this.ni;
    }

    public void setNi(String ni) {
        this.ni = ni;
    }

    public String getAlias() {
        return this.alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public String getCategory() {
        return this.category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPhone() {
        return this.phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

}

package com.ferreandina.models;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.jspecify.annotations.Nullable;

public class BranchModel extends Model {
    @Nullable
    private String name;
    @Nullable
    private String city;
    @Nullable
    private String direction;
    @Nullable
    private Document[] products;
    @Nullable
    private Document[] workers;
    @Nullable
    private Boolean is_main;

    public BranchModel() {
        this(null, null, null, null, null, null, null);
    }

    public BranchModel(
            ObjectId id, String name, String city, String direction,
            Boolean isMain, Document[] products, Document[] workers) {
        this.setId(id);
        this.setName(name);
        this.setCity(city);
        this.setDirection(direction);
        this.setIs_main(isMain);
        this.setWorkers(workers);
        this.setProducts(products);
    }

    public Document[] getProducts() {
        return this.products;
    }

    public Document[] getWorkers() {
        return this.workers;
    }

    public String getCity() {
        return this.city;
    }

    public String getDirection() {
        return this.direction;
    }

    public Boolean getIs_main() {
        return this.is_main;
    }

    public String getName() {
        return this.name;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }

    public void setIs_main(Boolean is_main) {
        this.is_main = is_main;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setProducts(Document[] products) {
        this.products = products;
    }

    public void setWorkers(Document[] workers) {
        this.workers = workers;
    }
}

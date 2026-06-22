package com.ferreandina.models;

import java.util.List;

import org.jspecify.annotations.Nullable;

public class BranchModel extends Model {
    @Nullable
    private String name;
    @Nullable
    private String image;
    @Nullable
    private String city;
    @Nullable
    private String direction;
    @Nullable
    private List<ProductModel> products;
    @Nullable
    private List<WorkerModel> workers;
    @Nullable
    private Boolean is_main;

    public BranchModel() {
        this(null, null, null, null, null, null, null, null);
    }

    public BranchModel(
            Integer id, String name, String image, String city, String direction,
            Boolean isMain, List<ProductModel> products, List<WorkerModel> workers) {
        this.setId(id);
        this.setName(name);
        this.setImage(image);
        this.setCity(city);
        this.setDirection(direction);
        this.setIs_main(isMain);
        this.setWorkers(workers);
        this.setProducts(products);
    }

    public List<ProductModel> getProducts() {
        return this.products;
    }

    public List<WorkerModel> getWorkers() {
        return this.workers;
    }

    public String getCity() {
        return this.city;
    }

    public String getImage() {
        return this.image;
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

    public void setImage(String image) {
        this.image = image;
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

    public void setProducts(List<ProductModel> products) {
        this.products = products;
    }

    public void setWorkers(List<WorkerModel> workers) {
        this.workers = workers;
    }
}

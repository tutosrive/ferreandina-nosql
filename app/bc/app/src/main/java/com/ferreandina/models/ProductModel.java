package com.ferreandina.models;

import org.jspecify.annotations.Nullable;

public class ProductModel extends Model {
    @Nullable
    private String name;
    @Nullable
    private String description;
    @Nullable
    private Double price;
    @Nullable
    private Integer category_id;
    @Nullable
    private Integer quantity;
    @Nullable
    private Float unitary_weight;
    @Nullable
    private String sould_out_date;
    @Nullable
    private SupplierModel supplier;
    @Nullable
    private String image;

    public ProductModel() {
        this(null, null, null, null, null, null, null, null, null, null);
    }

    public ProductModel(Integer id, String name, String image, String description, Double price, Integer category_id,
            Integer quantity,
            Float unitary_weight, String sould_out_date, SupplierModel supplier) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category_id = category_id;
        this.quantity = quantity;
        this.unitary_weight = unitary_weight;
        this.sould_out_date = sould_out_date;
        this.supplier = supplier;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return this.price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getCategory_id() {
        return this.category_id;
    }

    public void setCategory_id(Integer category_id) {
        this.category_id = category_id;
    }

    public Integer getQuantity() {
        return this.quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Float getUnitary_weight() {
        return this.unitary_weight;
    }

    public void setUnitary_weight(Float unitary_weight) {
        this.unitary_weight = unitary_weight;
    }

    public String getSould_out_date() {
        return this.sould_out_date;
    }

    public void setSould_out_date(String sould_out_date) {
        this.sould_out_date = sould_out_date;
    }

    public SupplierModel getSupplier() {
        return this.supplier;
    }

    public void setSupplier(SupplierModel supplier) {
        this.supplier = supplier;
    }

    public String getImage() {
        return this.image;
    }

    public void setImage(String image) {
        this.image = image;
    }

}

package com.ferreandina.models;

import java.util.List;
import org.jspecify.annotations.Nullable;

public class SupplieModel extends Model {
    @Nullable
    private SupplierModel suplier;
    @Nullable
    private List<ProductModel> products;
    @Nullable
    private Integer defective_quanity;
    @Nullable
    private String entry_date;

    public SupplieModel() {
        this(null, null, null, null, null);
    }

    public SupplieModel(Integer id, SupplierModel suplier, List<ProductModel> products, Integer defective_quanity,
            String entry_date) {
        this.id = id;
        this.suplier = suplier;
        this.products = products;
        this.defective_quanity = defective_quanity;
        this.entry_date = entry_date;
    }

    public SupplierModel getSuplier() {
        return this.suplier;
    }

    public void setSuplier(SupplierModel suplier) {
        this.suplier = suplier;
    }

    public List<ProductModel> getProducts() {
        return this.products;
    }

    public void setProducts(List<ProductModel> products) {
        this.products = products;
    }

    public Integer getDefective_quanity() {
        return this.defective_quanity;
    }

    public void setDefective_quanity(Integer defective_quanity) {
        this.defective_quanity = defective_quanity;
    }

    public String getEntry_date() {
        return this.entry_date;
    }

    public void setEntry_date(String entry_date) {
        this.entry_date = entry_date;
    }
}

package com.ferreandina.models;

import java.time.LocalDate;
import org.bson.Document;

public class SupplieModel extends Model {
    private Integer id;
    private Document suplier;
    private Document products;
    private Integer defective_quanity;
    private LocalDate entry_date;

    public SupplieModel() {
        this(null, null, null, null, null);
    }

    public SupplieModel(Integer id, Document suplier, Document products, Integer defective_quanity,
            LocalDate entry_date) {
        this.id = id;
        this.suplier = suplier;
        this.products = products;
        this.defective_quanity = defective_quanity;
        this.entry_date = entry_date;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Document getSuplier() {
        return this.suplier;
    }

    public void setSuplier(Document suplier) {
        this.suplier = suplier;
    }

    public Document getProducts() {
        return this.products;
    }

    public void setProducts(Document products) {
        this.products = products;
    }

    public Integer getDefective_quanity() {
        return this.defective_quanity;
    }

    public void setDefective_quanity(Integer defective_quanity) {
        this.defective_quanity = defective_quanity;
    }

    public LocalDate getEntry_date() {
        return this.entry_date;
    }

    public void setEntry_date(LocalDate entry_date) {
        this.entry_date = entry_date;
    }
}

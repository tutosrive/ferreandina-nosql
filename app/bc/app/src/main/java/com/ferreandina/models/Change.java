package com.ferreandina.models;

public class Change extends Model {
    private Double previous_price;
    private Double new_price;

    public Change() {
        this(null, null);
    }

    public Change(Double previous_price, Double new_price) {
        this.previous_price = previous_price;
        this.new_price = new_price;
    }

    public Double getPrevious_price() {
        return this.previous_price;
    }

    public void setPrevious_price(Double previous_price) {
        this.previous_price = previous_price;
    }

    public Double getNew_price() {
        return this.new_price;
    }

    public void setNew_price(Double new_price) {
        this.new_price = new_price;
    }
}

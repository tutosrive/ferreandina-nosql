package com.ferreandina.models;

public class PriceChangeModel extends Model {
    private Integer product_id;
    private Change[] changes;

    public PriceChangeModel(Integer product_id, Change[] changes) {
        this.product_id = product_id;
        this.changes = changes;
    }

    public Integer getProduct_id() {
        return this.product_id;
    }

    public void setProduct_id(Integer product_id) {
        this.product_id = product_id;
    }

    public Change[] getChanges() {
        return this.changes;
    }

    public void setChanges(Change[] changes) {
        this.changes = changes;
    }

}

class Change {
    private Double previous_price;
    private Double new_price;

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

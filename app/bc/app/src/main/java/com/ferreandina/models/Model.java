package com.ferreandina.models;

import org.json.JSONObject;
import org.jspecify.annotations.Nullable;

public class Model {
    @Nullable
    protected Integer id;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public JSONObject toJsonObject() {
        return new JSONObject(this);
    }

    @Override
    public String toString() {
        return this.toJsonObject().toString(4);
    }
}

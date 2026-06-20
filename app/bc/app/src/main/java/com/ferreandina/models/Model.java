package com.ferreandina.models;

import org.json.JSONObject;

public class Model {
    public JSONObject toJsonObject() {
        return new JSONObject(this);
    }

    @Override
    public String toString() {
        return this.toJsonObject().toString(4);
    }
}

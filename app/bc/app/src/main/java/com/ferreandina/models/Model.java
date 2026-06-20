package com.ferreandina.models;

import org.bson.types.ObjectId;
import org.json.JSONObject;
import org.jspecify.annotations.Nullable;

public class Model {
    @Nullable
    protected ObjectId id;

    public ObjectId getId() {
        return this.id;
    }

    public void setId(ObjectId id) {
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

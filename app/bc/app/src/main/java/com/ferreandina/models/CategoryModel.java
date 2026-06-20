package com.ferreandina.models;

import org.bson.types.ObjectId;
import org.jspecify.annotations.Nullable;

public class CategoryModel extends Model {
    @Nullable
    private String name;
    @Nullable
    private String description;

    public CategoryModel() {
        this(null, null, null);
    }

    public CategoryModel(ObjectId id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
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
}

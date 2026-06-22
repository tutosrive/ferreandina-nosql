package com.ferreandina.models;

import org.jspecify.annotations.Nullable;

public class CategoryModel extends Model {
    @Nullable
    private String name;
    @Nullable
    private String description;
    @Nullable
    private String image;

    public CategoryModel() {
        this(null, null, null, null);
    }

    public CategoryModel(Integer id, String name, String image, String description) {
        this.id = id;
        this.setImage(image);
        this.name = name;
        this.description = description;
    }

    public String getName() {
        return this.name;
    }

    public String getImage() {
        return this.image;
    }

    public void setImage(String image) {
        this.image = image;
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

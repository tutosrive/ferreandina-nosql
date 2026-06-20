package com.ferreandina.models;

import org.bson.types.ObjectId;
import org.jspecify.annotations.Nullable;

public class UserModel extends Model {
    @Nullable
    private String name;
    @Nullable
    private String lastname;
    @Nullable
    private String email;
    @Nullable
    private Integer age;

    public UserModel() {
        this(null, null, null, null);
    }

    public UserModel(ObjectId id, String name, String lastname, String email) {
        this(id, name, lastname, email, -1);
    }

    public UserModel(ObjectId id, String name, String lastname, String email, Integer age) {
        this.setId(id);
        this.setName(lastname);
        this.setLastname(lastname);
        this.setEmail(email);
        this.setAge(age);
    }

    public String getName() {
        return this.name;
    }

    public Integer getAge() {
        return this.age;
    }

    public String getEmail() {
        return this.email;
    }

    public String getLastname() {
        return lastname;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public void setName(String name) {
        this.name = name;
    }
}

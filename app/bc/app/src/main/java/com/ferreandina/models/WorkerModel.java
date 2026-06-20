package com.ferreandina.models;

import org.jspecify.annotations.Nullable;

public class WorkerModel extends Model {
    @Nullable
    private String name;
    @Nullable
    private Integer age;
    @Nullable
    private String speciality;
    @Nullable
    private Float weight;
    @Nullable
    private String email;
    @Nullable
    private String phone;
    @Nullable
    private Float salary;

    public WorkerModel() {
        this(null, null, null, null, null, null, null, null);
    }

    public WorkerModel(Integer id, String name, Integer age, String speciality, Float weight, String email,
            String phone, Float salary) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.speciality = speciality;
        this.weight = weight;
        this.email = email;
        this.phone = phone;
        this.salary = salary;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return this.age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getSpeciality() {
        return this.speciality;
    }

    public void setSpeciality(String speciality) {
        this.speciality = speciality;
    }

    public Float getWeight() {
        return this.weight;
    }

    public void setWeight(Float weight) {
        this.weight = weight;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return this.phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Float getSalary() {
        return this.salary;
    }

    public void setSalary(Float salary) {
        this.salary = salary;
    }

}
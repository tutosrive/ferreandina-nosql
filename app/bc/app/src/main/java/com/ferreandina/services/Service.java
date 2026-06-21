package com.ferreandina.services;

import org.bson.conversions.Bson;

import com.ferreandina.database.Connection;
import com.ferreandina.models.Model;
import com.mongodb.client.FindIterable;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.InsertOneResult;
import com.mongodb.client.result.UpdateResult;

public class Service<T extends Model> {
    protected Connection<T> conn;
    private String collectionName;

    public Service(Class<T> clazz) {
        this.conn = new Connection<T>(clazz);
    }

    public final String add(T document) {
        InsertOneResult result = this.conn.collection.insertOne(document);
        return result.getInsertedId().toString();
    }

    /**
     * Get all documents without filters and aggregations
     * 
     * @return A "FindIterable" with all documents type "T"
     */
    public final FindIterable<T> getAll() {
        return this.conn.collection.find();
    }

    /**
     * Get just one document by filter
     * 
     * @param filter A Bson with the filter. Ex: Filters.lt("key", value);
     * @return The document that satisfy the filter
     */
    public final T getOne(Bson filter) {
        T document = this.getByAggregate(filter).first();
        return document;
    }

    /**
     * Get one or many document/s but with aggregations
     * 
     * @param filters Bson with aggregation options
     * @return One/All document/s with the aggregation options
     */
    public final FindIterable<T> getByAggregate(Bson filters) {
        return this.conn.collection.find(filters);
    }

    public final Long updateOne(Bson query, Bson update) {
        UpdateResult result = this.conn.collection.updateOne(query, update);
        return result.getModifiedCount();
    }

    public final Long updateMany(Bson query, Bson update) {
        UpdateResult result = this.conn.collection.updateMany(query, update);
        return result.getModifiedCount();
    }

    public final Long delete(Bson query) {
        DeleteResult result = this.conn.collection.deleteOne(query);
        return result.getDeletedCount();
    }

    public Connection<T> getConn() {
        return this.conn;
    }

    public void setConn(Connection<T> conn) {
        this.conn = conn;
    }

    public String getCollectionName() {
        return this.collectionName;
    }

    public void setCollection(String collectionName) {
        this.collectionName = collectionName;
        this.conn.collection = this.conn.getCollection(this.collectionName);
    }
}

package com.ferreandina.database;

import org.bson.codecs.configuration.CodecProvider;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

import com.ferreandina.models.Model;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import io.github.cdimascio.dotenv.Dotenv;

public class Connection<T extends Model> {
    private String uri;
    private String dbName;
    private CodecRegistry customCodec;
    private Class<T> model;
    public MongoClient client;
    public MongoDatabase db;
    public MongoCollection<T> collection;

    public Connection(Class<T> clazz) {
        this.model = clazz;
        Dotenv env = Dotenv.load();
        this.uri = env.get("MONGODB_URI");
        this.dbName = env.get("MONGODB_DB_NAME");

        System.out.println(uri);
        System.out.println(dbName);
        this.createProviders();
        this.initMongo();
    }

    private final void createProviders() {
        CodecProvider customClassBuilder = PojoCodecProvider.builder().automatic(true).build();
        this.customCodec = fromRegistries(
                MongoClientSettings.getDefaultCodecRegistry(),
                fromProviders(customClassBuilder));
    }

    private final void initMongo() {
        this.client = MongoClients.create(uri);
        this.db = this.client.getDatabase(this.dbName).withCodecRegistry(this.customCodec);
    }

    public final MongoCollection<T> getCollection(String name) {
        return this.db.getCollection(name, this.model);
    }

    public final void setCollection(String name) {
        this.collection = this.getCollection(name);
    }

    public final void printCollection(String name) {
        for (T m : this.collection.find()) {
            System.out.println(m.toString());
        }
    }
}

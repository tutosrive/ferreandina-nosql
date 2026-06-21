package com.ferreandina.utils;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;

import org.bson.conversions.Bson;
import org.json.JSONObject;
import com.ferreandina.models.Model;
import com.mongodb.client.model.Updates;

public class Utils {
    public final static Bson fromModelToBsonUpdate(Model model) {
        JSONObject json = (JSONObject) model.toJsonObject();
        ArrayList<Bson> updates = new ArrayList<>();
        json.keys().forEachRemaining(key -> {
            if (!key.equalsIgnoreCase("id") && !key.equalsIgnoreCase("_id")) {
                Bson row = Updates.set(key, json.get(key));
                updates.add(row);
            }
        });
        Bson updatesBson = Updates.combine(updates);
        return updatesBson;
    }
}

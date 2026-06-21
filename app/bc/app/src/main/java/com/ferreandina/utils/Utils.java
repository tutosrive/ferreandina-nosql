package com.ferreandina.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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

    public final static Bson fromMapToBsonUpdate(Map<String, Object> map) {
        ArrayList<Bson> updates = new ArrayList<>();
        map.forEach((key, value) -> {
            if (!key.equalsIgnoreCase("id") && !key.equalsIgnoreCase("_id")) {
                if (value instanceof List) {
                    @SuppressWarnings("unchecked")
                    List<Object> listValue = (List<Object>) value;
                    Bson row = Updates.pushEach(key, listValue);
                    updates.add(row);
                } else {
                    Bson row = Updates.set(key, value);
                    updates.add(row);
                }
            }
        });
        return Updates.combine(updates);
    }
}

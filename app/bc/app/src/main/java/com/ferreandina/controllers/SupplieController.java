package com.ferreandina.controllers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.json.JSONArray;

import com.ferreandina.models.SupplieModel;
import com.mongodb.client.model.Accumulators;
import com.mongodb.client.model.Aggregates;

import io.javalin.http.Context;

public class SupplieController extends Controller<SupplieModel> {
    public SupplieController() {
        super(SupplieModel.class, "supplies");
    }

    // GET /supplies/defective-report
    // db.supplies.aggregate([ {$group:{_id: "$supplier.name",
    // totalDefectuoso:{$sum: "$defective_quanity"}}}])
    public void getDefectiveReport(Context ctx) {
        try {
            List<Bson> pipeline = Arrays.asList(
                    Aggregates.group("$supplier.name", Accumulators.sum("totalDefectuoso", "$defective_quanity")));

            List<Document> result = this.service.getConn().collection
                    .withDocumentClass(Document.class)
                    .aggregate(pipeline)
                    .into(new ArrayList<>());

            JSONArray arr = new JSONArray().put(result);

            this.resultMan.javalinReturn(ctx, arr, "Defective report generated successfully");
        } catch (Exception e) {
            this.resultMan.javalinReturn(ctx, e);
        }
    }
}

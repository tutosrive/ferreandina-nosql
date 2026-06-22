package com.ferreandina.controllers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.json.JSONArray;

import com.ferreandina.models.BranchModel;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Projections;
import com.mongodb.client.model.Updates;
import com.mongodb.client.result.UpdateResult;

import io.javalin.http.Context;

public class BranchController extends Controller<BranchModel> {
    public BranchController() {
        super(BranchModel.class, "branches");
    }

    // GET /branches/low-stock
    // db.branches.aggregate([{ $unwind: "$products" }, { $match: {
    // "products.quantity": { $lt: 10 } } }, { $project: { _id: 0, sucursal:
    // "$name", producto: "$products.name", stock: "$products.quantity" } }])
    public void getLowStockProducts(Context ctx) {
        try {
            List<Bson> pipeline = Arrays.asList(
                    Aggregates.unwind("$products"),
                    Aggregates.match(Filters.lt("products.quantity", 10)),
                    Aggregates.project(Projections.fields(
                            Projections.excludeId(),
                            Projections.computed("sucursal", "$name"),
                            Projections.computed("producto", "$products.name"),
                            Projections.computed("stock", "$products.quantity"))));

            List<Document> result = this.service.getConn().collection
                    .withDocumentClass(Document.class)
                    .aggregate(pipeline)
                    .into(new ArrayList<>());

            JSONArray data = new JSONArray().put(result);

            this.resultMan.javalinReturn(ctx, data, "Productos con bajo stock obtenidos");
        } catch (Exception e) {
            this.resultMan.javalinReturn(ctx, e);
        }
    }

    // GET /branches/{id}/products
    // db.branches.find({ "_id": 1 }, { "products": 1, "_id": 0 })
    public void getBranchProducts(Context ctx) {
        try {
            Integer branchId = Integer.parseInt(ctx.pathParam("id"));

            Document result = this.service.getConn().collection
                    .withDocumentClass(Document.class)
                    .find(Filters.eq("_id", branchId))
                    .projection(Projections.fields(Projections.include("products"), Projections.excludeId()))
                    .first();

            this.resultMan.javalinReturn(ctx, new JSONArray().put(result), "Lista de productos de la sucursal");
        } catch (Exception e) {
            this.resultMan.javalinReturn(ctx, e);
        }
    }

    // PATCH /branches/{id}/remove-product/{productId}
    // db.branches.updateOne({ "_id": 1 }, { $pull: { "products": { "_id": 0 } } })
    public void removeProductFromBranch(Context ctx) {
        try {
            Integer branchId = Integer.parseInt(ctx.pathParam("id"));
            Integer productId = Integer.parseInt(ctx.pathParam("productId"));

            Bson filter = Filters.eq("_id", branchId);
            // Aplicamos $pull sobre el array de productos usando el _id del producto
            Bson update = Updates.pull("products", Filters.eq("_id", productId));

            Long updatedCount = this.service.updateOne(filter, update);

            this.resultMan.javalinUpdateDelete(ctx, updatedCount, false,
                    "Producto eliminado de la sucursal correctamente");
        } catch (Exception e) {
            this.resultMan.javalinReturn(ctx, e);
        }
    }

    // PATCH /branches/clean-out-of-stock
    // db.branches.updateMany({}, { $pull: { "products": { "quantity": { $lte: 0 } }
    // } })
    public void cleanOutOfStock(Context ctx) {
        try {
            Bson filter = new Document();
            Bson update = Updates.pull("products", Filters.lte("quantity", 0));

            UpdateResult result = this.service.getConn().collection.updateMany(filter, update);

            this.resultMan.javalinUpdateDelete(ctx, result.getModifiedCount(), true, "Cleaning OutStock completed");
        } catch (Exception e) {
            this.resultMan.javalinReturn(ctx, e);
        }
    }
}
package com.ferreandina.controllers;

import com.ferreandina.models.BranchModel;
import com.ferreandina.models.ProductModel;
import com.ferreandina.utils.Utils;
import com.mongodb.client.model.Filters;

import io.javalin.http.Context;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.bson.conversions.Bson;

public class BranchController extends Controller<BranchModel> {
    public BranchController() {
        super(BranchModel.class, "branches");
    }

    @Override
    public void update(Context ctx, String id) {
        try {
            Integer idInt = Integer.parseInt(id);
            Bson filter = Filters.eq("_id", idInt);
            @SuppressWarnings("unchecked")
            Map<String, Object> bodyMap = ctx.bodyAsClass(Map.class);

            if (bodyMap.containsKey("products")) {
                BranchModel existingBranch = this.service.getOne(filter);
                List<ProductModel> existingProducts = existingBranch.getProducts() != null
                        ? new ArrayList<>(existingBranch.getProducts())
                        : new ArrayList<>();
                @SuppressWarnings("unchecked")
                List<Map<String, Object>> newProductsRaw = (List<Map<String, Object>>) bodyMap.get("products");

                Map<Integer, ProductModel> productMap = new HashMap<>();
                for (ProductModel product : existingProducts) {
                    productMap.put(product.getId(), product);
                }

                for (Map<String, Object> newProductMap : newProductsRaw) {
                    Integer newProductId = (Integer) newProductMap.get("id");
                    Integer newQuantity = (Integer) newProductMap.get("quantity");
                    String newProductName = (String) newProductMap.get("name");
                    String newProductImage = (String) newProductMap.get("image");

                    if (newProductId != null) {
                        if (productMap.containsKey(newProductId)) {
                            ProductModel existingProduct = productMap.get(newProductId);
                            existingProduct.setQuantity(newQuantity); // Set the new quantity from frontend
                        } else {
                            // New product to be added
                            ProductModel newProduct = new ProductModel();
                            newProduct.setId(newProductId);
                            newProduct.setName(newProductName);
                            newProduct.setQuantity(newQuantity);
                            newProduct.setImage(newProductImage);
                            existingProducts.add(newProduct);
                        }
                    }
                }
                bodyMap.put("products", existingProducts); // Use the modified existingProducts list
            }

            Bson updates = Utils.fromMapToBsonUpdate(bodyMap);
            Long updatedCount = this.service.updateOne(filter, updates);

            this.resultMan.javalinUpdateDelete(
                    ctx, updatedCount, false,
                    String.format("%s with id %d updated", this.clazz.getSimpleName(), idInt));
        } catch (Exception e) {
            this.resultMan.javalinReturn(ctx, e);
        }
    }
}

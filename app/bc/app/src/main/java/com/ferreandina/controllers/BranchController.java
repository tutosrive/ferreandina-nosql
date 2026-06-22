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

                List<ProductModel> updatedProductsList = new ArrayList<>();
                Map<Integer, ProductModel> productMapById = new HashMap<>();
                Map<String, ProductModel> productMapByName = new HashMap<>();

                for (ProductModel product : existingProducts) {
                    if (product.getId() != null) {
                        productMapById.put(product.getId(), product);
                    }
                    if (product.getName() != null) {
                        productMapByName.put(product.getName().toLowerCase(), product);
                    }
                }

                for (Map<String, Object> newProductMap : newProductsRaw) {
                    Object idObj = newProductMap.get("id") != null ? newProductMap.get("id") : newProductMap.get("_id");
                    Integer newProductId = null;
                    if (idObj instanceof Number) {
                        newProductId = ((Number) idObj).intValue();
                    }

                    Integer newQuantity = null;
                    Object qtyObj = newProductMap.get("quantity");
                    if (qtyObj instanceof Number) {
                        newQuantity = ((Number) qtyObj).intValue();
                    }

                    String newProductName = (String) newProductMap.get("name");
                    String newProductImage = (String) newProductMap.get("image");

                    ProductModel targetProduct = null;

                    if (newProductId != null && productMapById.containsKey(newProductId)) {
                        targetProduct = productMapById.get(newProductId);
                    } else if (newProductName != null && productMapByName.containsKey(newProductName.toLowerCase())) {
                        targetProduct = productMapByName.get(newProductName.toLowerCase());
                        if (newProductId != null) {
                            targetProduct.setId(newProductId);
                        }
                    }

                    if (targetProduct != null) {
                        targetProduct.setQuantity(newQuantity);

                        if (newProductName != null)
                            targetProduct.setName(newProductName);
                        if (newProductImage != null)
                            targetProduct.setImage(newProductImage);

                        if (!updatedProductsList.contains(targetProduct)) {
                            updatedProductsList.add(targetProduct);
                        }
                    } else {
                        ProductModel newProduct = new ProductModel();
                        newProduct.setId(newProductId);
                        newProduct.setName(newProductName);
                        newProduct.setQuantity(newQuantity);
                        newProduct.setImage(newProductImage);

                        updatedProductsList.add(newProduct);

                        if (newProductId != null)
                            productMapById.put(newProductId, newProduct);
                        if (newProductName != null)
                            productMapByName.put(newProductName.toLowerCase(), newProduct);
                    }
                }

                List<Map<String, Object>> finalProductsJson = new ArrayList<>();
                for (ProductModel prod : updatedProductsList) {
                    Map<String, Object> pMap = new HashMap<>();
                    pMap.put("id", prod.getId());
                    pMap.put("_id", prod.getId());
                    pMap.put("name", prod.getName());
                    pMap.put("quantity", prod.getQuantity());
                    pMap.put("image", prod.getImage());
                    finalProductsJson.add(pMap);
                }

                bodyMap.put("products", finalProductsJson);
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

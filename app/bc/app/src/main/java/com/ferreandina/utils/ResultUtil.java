package com.ferreandina.utils;

import org.json.JSONArray;
import org.json.JSONObject;

import com.mongodb.client.FindIterable;

import io.javalin.http.Context;

public class ResultUtil<T> {
    public void javalinReturn(Context ctx, JSONArray data, String msg) {
        JSONObject json = new JSONObject();
        json.put("message", msg);
        json.put("status", ctx.statusCode());
        json.put("data", data.toList());
        json.put("size", data.length());
        ctx.result(json.toString());
    }

    public void javalinReturn(Context ctx, JSONArray json) {
        this.javalinReturn(ctx, json, "");
    }

    public void javalinReturn(Context ctx, T document) {
        this.javalinReturn(ctx, document, "");
    }

    public void javalinReturn(Context ctx, T document, String msg) {
        JSONArray data = new JSONArray();
        data.put(document);
        this.javalinReturn(ctx, data, msg);
    }

    public void javalinReturn(Context ctx, FindIterable<T> iterable) {
        this.javalinReturn(ctx, iterable, "");
    }

    public void javalinReturn(Context ctx, FindIterable<T> iterable, String msg) {
        JSONArray data = new JSONArray();
        iterable.forEach(document -> {
            data.put(document);
        });
        this.javalinReturn(ctx, data, msg);
    }

    public void javalinReturn(Context ctx) {
        this.javalinReturn(ctx, new JSONArray());
    }

    public void javalinReturn(Context ctx, String msg) {
        this.javalinReturn(ctx, new JSONArray(), msg);
    }

    public void javalinReturn(Context ctx, Exception e) {
        JSONObject error = new JSONObject()
                .put("message", e.getMessage())
                .put("cause", e.getCause())
                .put("class", e.getClass())
                .put("stack-trace", e.getStackTrace());
        JSONObject json = new JSONObject()
                .put("message", "")
                .put("data", new JSONArray())
                .put("error", error)
                .put("status", ctx.status(500));
        ctx.result(json.toString());
    }

    public void javalinUpdateDelete(Context ctx, Long count, Boolean isDelete) {
        this.javalinUpdateDelete(ctx, count, isDelete, "");
    }

    public void javalinUpdateDelete(Context ctx, Long count, Boolean isDelete, String msg) {
        String key = isDelete ? "delete_count" : "update_count";
        JSONObject data = new JSONObject().put(key, count);
        JSONArray arr = new JSONArray().put(data);
        this.javalinReturn(ctx, arr, msg);
    }
}

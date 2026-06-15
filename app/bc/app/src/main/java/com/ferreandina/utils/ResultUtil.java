package com.ferreandina.utils;

import org.json.JSONArray;
import org.json.JSONObject;
import io.javalin.http.Context;

public class ResultUtil {
    public static void javalinReturn(Context ctx, JSONArray data, String msg) {
        JSONObject json = new JSONObject();
        json.put("message", msg);
        json.put("status", ctx.statusCode());
        json.put("data", data);
        ctx.json(json.toString());
    }

    public static void javalinReturn(Context ctx, JSONArray json) {
        ResultUtil.javalinReturn(ctx, json, "");
    }

    public static void javalinReturn(Context ctx) {
        ResultUtil.javalinReturn(ctx, new JSONArray());
    }

    public static void javalinReturn(Context ctx, String msg) {
        ResultUtil.javalinReturn(ctx, new JSONArray(), msg);
    }
}

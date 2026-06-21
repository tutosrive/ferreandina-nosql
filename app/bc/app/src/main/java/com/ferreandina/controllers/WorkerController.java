package com.ferreandina.controllers;

import com.ferreandina.models.WorkerModel;

public class WorkerController extends Controller<WorkerModel> {
    public WorkerController() {
        super(WorkerModel.class, "workers");
    }
}

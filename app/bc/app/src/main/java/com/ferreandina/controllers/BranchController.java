package com.ferreandina.controllers;

import com.ferreandina.models.BranchModel;

public class BranchController extends Controller<BranchModel> {
    public BranchController() {
        super(BranchModel.class, "branches");
    }
}
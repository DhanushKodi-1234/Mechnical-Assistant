import mech from "../modules/mech.module.js";
import express from "express";
export const store = async (req, res) => {
    try {
        const { shopname, email, mob, password, shopadd, cname , latitude,longitude,perKmCharge} = req.body;
        const mechanic = await mech.create({
      shopname,
      email,
      mob,
      password,
      shopadd,
      cname,
      latitude,
      longitude,
      perKmCharge,
      status: "Pending"
    });
        res.status(201).json({
      success: true,
      message: 'Mechanic registered successfully',
      data: mechanic
    });

    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}
export const getm = async (req, res) => {
    try {
        const mechanics = await mech.find();
        res.status(200).json({
            success: true,
            data: mechanics
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
export const getmsucess = async (req, res) => {
    try {
       const mechanics = await mech.find({ status: 'Approved' });
        res.status(200).json({
            success: true,
            data: mechanics
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
export const approveMechanic = async (req, res) => {
  try {
    const { status } = req.body;
    const mechanic = await mech.findByIdAndUpdate(req.params.id, {status: 'Approved' }, { new: true } );
    res.status(200).json({
      success: true,
      message: 'Mechanic approved successfully',
      data: mechanic
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
export default {
    getm,
    store,
    approveMechanic,
    getmsucess
};
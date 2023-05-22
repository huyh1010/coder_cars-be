const mongoose = require("mongoose");
const Car = require("../models/Car");
const { AppError, sendResponse } = require("../helpers/utils");
const carController = {};

carController.createCar = async (req, res, next) => {
  try {
    const info = req.body;
    if (!info)
      throw new AppError(402, "Bad Request", "Failed to Create A Car!");

    const created = await Car.create(info);
    sendResponse(
      res,
      200,
      true,
      { message: "Create Car Successfully!", car: created },
      null
    );
  } catch (err) {
    next(err);
  }
};

carController.getCars = async (req, res, next) => {
  let { page } = req.query;
  page = parseInt(req.query.page) || 1;
  limit = 12;
  try {
    let offset = limit * (page - 1);

    let data = await Car.find({ isDeleted: false });
    const total = await Car.countDocuments();
    data = data.slice(offset, offset + limit);
    sendResponse(
      res,
      200,
      true,
      {
        cars: data,
        page: 1,
        total: total,
        message: "Get Car List Successfully!",
      },
      null
    );
  } catch (err) {
    next(err);
  }
};

carController.editCar = async (req, res, next) => {
  try {
    let { id } = req.params;
    const updateFields = req.body;

    const options = { new: true };

    const updated = await Car.findByIdAndUpdate(id, updateFields, options);

    sendResponse(
      res,
      200,
      true,
      { message: "Update Car Successfully!", car: updated },
      null
    );
  } catch (err) {
    next(err);
  }
};

carController.deleteCar = async (req, res, next) => {
  try {
    let { id } = req.params;
    const options = { new: true };
    const deleted = await Car.findByIdAndUpdate(
      id,
      { isDeleted: true },
      options
    );
    sendResponse(
      res,
      200,
      true,
      { message: "Delete Car Successfully!", car: deleted },
      null
    );
  } catch (err) {
    next(err);
  }
};

module.exports = carController;

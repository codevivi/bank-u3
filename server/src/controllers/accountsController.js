import { accountsModel } from "../models/allModels.js";
export const getAll = async (req, res, next) => {
  try {
    const accounts = await accountsModel.getAll();
    res.json({
      message: "OK",
      accounts,
    });
  } catch (err) {
    res.json({
      message: "failure",
      accounts: null,
    });
  }
};
export const create = async (req, res, next) => {
  try {
    const id = await accountsModel.add(req.body.account);
    res.json({
      message: "OK",
      promiseId: req.body.promiseId,
      id,
    });
  } catch (err) {
    res.json({
      message: "failure",
      promiseId: req.body.promiseId,
    });
  }
};

export const update = async (req, res, next) => {
  try {
    await accountsModel.update(req.params.id, req.body.account);
    res.json({
      message: "OK",
      promiseId: req.body.promiseId,
      id: req.body.account.id,
    });
  } catch (err) {
    res.json({
      message: "failure",
      promiseId: req.body.promiseId,
      id: req.body.account.id,
    });
  }
};
export const remove = async (req, res, next) => {
  try {
    await accountsModel.delete(req.params.id);
    res.json({
      message: "OK",
    });
  } catch (err) {
    res.json({
      message: "failure",
    });
  }
};

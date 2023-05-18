import { accountsModel } from "../models/allModels.js";
export const stats = async (req, res, next) => {
  try {
    const [count, totalMoney] = await Promise.all([accountsModel.getAllAccountsCount(), accountsModel.getTotalMoneyInAllAccounts()]);
    res.json({
      message: "OK",
      stats: { count: count, totalMoney: totalMoney },
    });
  } catch (err) {
    res.json({
      message: "failure",
      stats: null,
    });
  }
};

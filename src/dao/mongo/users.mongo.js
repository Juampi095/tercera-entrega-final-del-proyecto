import UserModel from "./models/user.model.js";
import UserModel from "./models/user.model.js";

export default class User {
  constructor() {}
  get = async () => {
    return await UserModel.find().lean().exec();
  };
  constructor() {}
  get = async () => {
    return await UserModel.find().lean().exec();
  };

  create = async (data) => {
    const user = await UserModel.create(data);
    return user;
  };
  create = async (data) => {
    const user = await UserModel.create(data);
    return user;
  };

  getById = async (id) => {
    return await UserModel.findById(id).lean().exec();
  };

  getByEmail = async (email) => {
    return await UserModel.findOne({
      email,
    })
      .lean()
      .exec();
  };

  update = async (id, data) => {
    return await UserModel.updateOne({ _id: id }, data);
  };
}
  getByEmail = async (email) => {
    return await UserModel.findOne({
      email,
    })
      .lean()
      .exec();
  };

  update = async (id, data) => {
    return await UserModel.updateOne({ _id: id }, data);
  };
}

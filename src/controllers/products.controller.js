import { productsService } from "../repository/index.js";

/////////////////////////GET CON QUERY LIMITS

export const getProducts = async (req, res) => {
  try {
    const products = await productsService.getProducts();
    res.json({
      status: "Success",
      payload: products,
    });
  } catch (error) {
    req.logger.error(error.toString());
    res.json({
      result: "Error...",
      error,
    });
  }
};

/////////////////////////GET PRODUCT POR EL ID

export const getProduct = async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await productsService.getProduct(pid);
    res.json({
      status: "Success",
      payload: product,
    });
  } catch (error) {
    req.logger.error(error.toString());
    res.json({
      result: "Error...",
      error,
    });
  }
};

/////////////////////////AGREGAR PRODUCTO

export const addProduct = async (req, res) => {
  try {
    const { role, id } = req.user;
    const product = req.body;
    if (role === "premium") product.owner = id;

    const result = await productsService.createProduct(product);
    res.json({
      status: "Success",
      payload: result,
    });
  } catch (error) {
    req.logger.error(error.toString());
    res.json({
      result: "Error...",
      error,
    });
  }
};

/////////////////////////BORRAR PRODUCTO

export const deleteProduct = async (req, res) => {
  try {
    const pid = req.params.pid;
    //const result = await productsService.deleteProduct(pid);
    const product = await productsService.getProduct(pid);
    const user = req.user;
    const userID = user.id.toString();
    const owner = product.owner?.toString();

    if (user.role === "premium" && userID !== owner) {
      const error = "You can't modify a product owned by another user";
      req.logger.error(error);
      return res.status(403).json({ status: "error", error });
    }

    const result = await productsService.deleteProduct(pid);

    res.json({ status: "success", payload: result });
  } catch (error) {
    req.logger.error(error.toString());
    res.json({
      result: "Error...",
      error,
    });
  }
};

/////////////////////////MODIFICAR PRODUCTO

export const updateProduct = async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await productsService.getProduct(pid);
    const user = req.user;
    const userID = user.id.toString();
    const owner = product.owner?.toString();

    if (user.role === "premium" && userID !== owner) {
      const error = "You can't modify a product owned by another user";
      req.logger.error(error);
      return res.status(403).json({ status: "error", error });
    }

    const updatedProd = {
      ...product,
      ...req.body,
    };
    const result = await productsService.updateProduct(pid, updatedProd);

    res.json({
      status: "Success",
      payload: result,
    });
  } catch (error) {
    req.logger.error(error.toString());
    res.json({
      result: "Error...",
      error,
    });
  }
};

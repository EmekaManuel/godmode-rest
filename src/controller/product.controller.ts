import { Request, Response } from "express";
import {
  CreateProductInput,
  DeleteProductInput,
  ReadProductInput,
  UpdateProductInupt,
} from "../schema/product.schema";
import {
  createProduct,
  deleteProduct,
  findAndUpdateProduct,
  findProduct,
} from "../service/product.service";
//Create Product
export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const body = req.body;
  const product = await createProduct({ ...body, user: userId });
  res.send(product);
}

//Get Product
export async function getProductHandler(
  req: Request<ReadProductInput["params"]>,
  res: Response
) {
  const productId = req.params.productId;
  const product = findProduct({ productId });
  if (!product) {
    return res.sendStatus(404);
  }
  return res.send(product);
}
//Update Product
export async function updateProductHandler(
  req: Request<UpdateProductInupt["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const productId = req.params.productId;
  const update = req.body;
  const product = await findProduct({ productId });

  if (!product) {
    res.sendStatus(404);
  }
  if (String(product?.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedProduct = await findAndUpdateProduct({ productId }, update, {
    new: true,
  });

  res.send(updatedProduct);
}

// Delete Product
export async function deleteProductHandler(
  req: Request<DeleteProductInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const productId = req.params.productId;
  const product = await findProduct({ productId });

  if (!product) {
    res.sendStatus(404);
  }
  if (String(product?.user) !== userId) {
    return res.sendStatus(403);
  }
  await deleteProduct({ productId });
  res.sendStatus(200);
}

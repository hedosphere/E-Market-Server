import Product from "../model/productModel";
import slugify from "slugify";
import cloudinary from "cloudinary";

import formidable from "formidable";

// dd ff

//

// axios.put(`/api/v1/delete-product/${productId}`);

export const DeleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // let productId = "635a7072c9245aa9b249f67b28";
    const product = await Product.findById({ _id: productId });

    // if (!product) return res.json({ ok: true });
    if (!product) return res.status(400).send("product not found");

    product &&
      product.image.forEach(async (el) => {
        const deleteImage = await cloudinary.v2.uploader.destroy(el.public_id);
      });

    await product.remove();
    //
    res.json({ ok: true });
    //
  } catch (err) {
    console.log(err);

    res.status(400);
  }
};

//

//

//
export const createReview = async (req, res) => {
  //
  // review  to ratings? noOfReviews?
  // console.log("createReview", req.body);
  // return;

  try {
    const {
      review: { rating, comment },
      _id,
    } = req.body;
    // console.log(comment, "createReview", rating, "ddd", _id);

    const user = req.auth._id;
    //
    const product = await Product.findById({ _id });
    // .populate("review.user", "name _id")
    // .exec();
    if (!product) return;

    let review = product.review.filter((el) => el.user != req.auth._id);

    product.review = review;

    // console.log("product", product, req.auth._id);

    // return;

    // product.review = product.review.addToSet({
    product.review = product.review.push({
      user,
      rating: Number(rating),
      comment,
    });

    let rting = product.review.reduce(
      (initial, curre) => initial + curre.rating,
      0
    );

    //

    //

    product.noOfReviews = Number(product.review.length);
    product.ratings = Number(rting / product.noOfReviews).toFixed(1);

    //
    await product.save({ validateBeforeSave: false });

    //
    // console.log(rting, "product, ratings", product, req.auth._id);

    //
    const updatedProduct = await Product.findById({ _id })
      .populate("review.user", "name _id")
      .exec();

    res.json({ ok: true, product: updatedProduct });

    //
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};

//

//

export const GetProductDetails = async (req, res) => {
  const { productId } = req.params;

  // console.log("productId", productId);

  let product = null;
  if (productId) {
    product = await Product.findById({ _id: productId })
      .populate("review.user", "name _id")
      .exec();
  }
  return res.json({ ok: true, product });
};
//

//

//

export const GetProducts = async (req, res) => {
  const product = await Product.find({}).sort({ createdAt: "-1" }).exec();
  // console.log(product);
  res.json({ ok: true, product });
};
//

//

//

export const createProduct = async (req, res) => {
  try {
    const myForm = formidable({ multiples: true });

    myForm.parse(req, async (err, fields, files) => {
      //
      const { name, price, description, category, sellers, stock } = fields;

      let imagesPath = [];

      const imageIsArray = files.images.length;

      if (imageIsArray || imageIsArray > 0) {
        for (let i = 0; i < files.images.length; i++) {
          const cloudinaryImage = await cloudinary.v2.uploader.upload(
            files.images[i].filepath,
            {
              public_id: slugify(name) + "-" + files.images[i].newFilename,
              folder: "HedoShop/Product",
              width: 200,
              height: 150,
              // crop: "scale",
            }
          );
          imagesPath.push({
            url: cloudinaryImage.url,
            public_id: cloudinaryImage.public_id,
          });
        }
      } else {
        const cloudinaryImage = await cloudinary.v2.uploader.upload(
          files.images.filepath,
          {
            public_id: slugify(name) + "-" + files.images.newFilename,
            folder: "HedoShop/Product",
            width: 250,
            crop: "scale",
          }
        );
        imagesPath = {
          url: cloudinaryImage.url,
          public_id: cloudinaryImage.public_id,
        };
      }

      const product = new Product({
        name,
        price,
        description,
        category,
        sellers,
        image: imagesPath,
        stock,
        user: req.auth._id,
      });

      await product.save();
      return res.json({ ok: true, message: "Product Created" });
    });
  } catch (err) {
    console.log(err);
  }
};

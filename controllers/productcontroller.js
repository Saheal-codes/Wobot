const productmodel = require("../models/productmodel");

exports.fetchproductlist = async (req, res) => {
  try {
    const result = await productmodel.find({});
    res.status(200).json({
      message: "Products read successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

exports.upload_products = async (req, res) => {
  try {
    // parse csv file
    const csv = require("csvtojson");
    const file = req.files[0];
    console.log({ file });
    var result = await csv().fromFile(file.path);
    console.log({ result });
    // save to db
    for (let i = 0; i < result.length; i++) {
      var product = await productmodel.create({
        name: result[i].name || result[i].Name,
        description: result[i].description || result[i].Description,
        quantity: result[i].quantity || result[i].Quantity,
        price: result[i].price || result[i].Price,
        _createdBy: req.user._id,
      });
    }
    res.status(200).json({
      message: "Products uploaded successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

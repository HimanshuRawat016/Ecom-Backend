const categoies = require("../models/CategoryModel");

const getCategories = async (req, res, next) => {
  try {
    const categoriesData = await categoies
      .find({})
      .sort({ name: "asc" })
      .orFail();
    res.json(categoriesData);
  } catch (error) {
    next(error);
  }
};

const newCategories = async (req, res, next) => {
  try {
    const { Categories } = req.body;
    if (!Categories) {
      throw new Error("Categories is needed");
    }
    const findCategories = await categoies.findOne({ name: Categories });
    if (findCategories) {
      res.status(400).send("Category is already exist");
    } else {
      const createCategory = categoies.create({
        name: Categories,
      });
      res.status(201).send({ categoryCreated: createCategory });
    }
    res.send(Categories);
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    if (req.params.category !== "Choose category") {
      const deletedCategory = await categoies
        .findOne({
          name: decodeURIComponent(req.params.category),
        })
        .orFail();

      await deletedCategory.delete();
      res.json({ deletedCategory: true });
    }
  } catch (error) {
    next(error);
  }
};

const saveattr = async (req, res, next) => {
  const { key, val, categoryChoosen } = req.body;

  if (!key || !val || !categoryChoosen) {
    return res.status(400).send("All field is mandatory");
  }

  try {
    const Category = categoryChoosen.split("/")[0];
    const categoryExists = await categoies.findOne({ name: Category }).orFail();
    if (categoryExists.attrs.length > 0) {
      // if key exists in the database then add a value to the key
      var keyDoesNotExistsInDatabase = true;
      categoryExists.attrs.map((item, idx) => {
        if (item.key === key) {
          keyDoesNotExistsInDatabase = false;
          var copyAttributeValues = [...categoryExists.attrs[idx].value];
          copyAttributeValues.push(val);
          var newAttributeValues = [...new Set(copyAttributeValues)]; // Set ensures unique values
          categoryExists.attrs[idx].value = newAttributeValues;
        }
      });

      if (keyDoesNotExistsInDatabase) {
        categoryExists.attrs.push({ key: key, value: [val] });
      }
    } else {
      // push to the array
      categoryExists.attrs.push({ key: key, value: [val] });
    }
    await categoryExists.save();
    let cat = await categoies.find({}).sort({ name: "asc" });
    return res.status(201).json({ categoriesUpdated: cat });
  } catch (error) {
    next(error);
  }
};
module.exports = { getCategories, newCategories, deleteCategory, saveattr };

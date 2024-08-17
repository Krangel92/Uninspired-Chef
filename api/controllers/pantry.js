// We import api ids and keys from .env in backend
const foodAppId = process.env.FOOD_APP_ID;
const foodAppKey = process.env.FOOD_APP_KEY;

const Pantry = require("../models/pantry");

const createPantry = async (req, res) => {
  const ingredientsArray = req.body.ingredientsArray; //array of objects with keys: ingredientName, ingredientQuantity
  const notIngredients = []; // array where we store wrong ingredients that do not exists in Edamam API
  const ingredients = []; // array where we store ingredient objects that do exist in Edamam API

  for (let i = 0; i < ingredientsArray.length; i++) {
    // Loop through array to check each inredient
    const response = await fetch(
      `https://api.edamam.com/api/food-database/v2/parser?app_id=${foodAppId}&app_key=${foodAppKey}&ingr=${ingredientsArray[i].ingredientName}&nutrition-type=cooking`
    ); // run fetch request for ingredient while importing app id and app key

    const data = await response.json(response); // convert it to readable format

    // console.log(data);
    // console.log(data.parsed[0].food);

    if (data.hints.length === 0) {
      // if API returns "[]", empty array, we add that ingredient to notIngredients because it was not found
      notIngredients.push(ingredientsArray[i].ingredientName);
    } else if (data.hints.length > 0) {
      // if API returns not empty array, it means ingredient was found, so we add it's ingredient object to our ingredient array

      ingredients.push({
        ...data.hints[0].food,
        measures: data.hints[0].measures,
        ingredientQuantity: req.body.ingredientsArray[i].ingredientQuantity,
      }); // add key value related to quantity, to object received from API
    }
  }

  // console.log(notIngredients);

  if (notIngredients.length !== 0) {
    // check if there is anything in notIngredients and construct error message
    let message = "";

    for (let i = 0; i < notIngredients.length; i++) {
      // loop through notIngredients array so we can merge strings from there
      message += `${notIngredients[i]}, `; // and this is where we merge string
    }

    message = message.slice(0, -2); // remove two last chars, so message ends without ", "
    res.status(404).json({
      status: 404,
      message: `Ingredients not available in database: ${message}. Try again.`,
    }); // response to our service on frontend if not valid ingredients found
  } else if (notIngredients.length === 0) {
    const pantry = new Pantry({
      user_id: req.body.userId,
      ingredientsArray: ingredients,
    });
    pantry.save(); // we create new Pantry in Mongo since we passed check that all ingredients are correct

    res.status(200).json({
      pantryId: pantry.id,
      userId: pantry.user_id,
      ingredientsArray: pantry.ingredientsArray,
      status: 200,
      message: `Pantry created with all ingredients specified.`,
    }); // response to our service on frontend if Pantry was created in Mongo
  }
};

const getPantry = async (req, res) => {
  // console.log(req.method);
  // console.log(req.query.userId);

  userId = req.query.userId; // id of owner of the pantry

  const pantry = await Pantry.findOne({ user_id: userId }); // we look for a Pantry in Mongo matching userId of owner

  // console.log(pantry);

  if (pantry !== null) {
    res.status(200).json({
      pantryId: pantry.id,
      userId: pantry.user_id,
      ingredientsArray: pantry.ingredientsArray,
      status: 200,
    });
  } else if (pantry === null) {
    res.status(400).json({
      status: 400,
      message:
        "No Pantry found. Click +ADD to add pantry ingredient, click CREATE to create Pantry.",
    });
  }
};

const updatePantry = async (req, res) => {
  // array that holds all ingredients from request body
  const ingredientsArray = req.body.ingredientsArray;

  // array where we store wrong ingredients that do not exists in Edamam API
  const notIngredients = [];

  // array where we store ingredient objects that do exist in Edamam API
  const ingredients = [];

  // Loop through array to check each inredient
  for (let i = 0; i < ingredientsArray.length; i++) {
    // run fetch request for ingredient while importing app id and app key
    const response = await fetch(
      `https://api.edamam.com/api/food-database/v2/parser?app_id=${foodAppId}&app_key=${foodAppKey}&ingr=${ingredientsArray[i]}&nutrition-type=cooking`
    );
    // convert it to readable format
    const data = await response.json(response);
    // console.log(data.parsed);
    // if API returns "[]", empty array, we add that ingredient to notIngredients because it was not found
    if (data.parsed.length === 0) {
      notIngredients.push(ingredientsArray[i]);
    }
    // if API returns not empty array, it means ingredient was found, so we add it's ingredient object to our ingredient array
    else if (data.parsed.length > 0) {
      ingredients.push(data.parsed[0].food);
    }
  }

  // console.log(notIngredients);
  // check if there is anything in notIngredients and construct error message
  if (notIngredients.length !== 0) {
    let message = "";
    // loop through notIngredients array so we can merge strings from there
    for (let i = 0; i < notIngredients.length; i++) {
      // and this is where we merge string
      message += `${notIngredients[i]}, `;
    }
    // remove two last chars, so message ends without ", "
    message = message.slice(0, -2);
    // response to our service on frontend if not valid ingredients found
    res.status(404).json({
      status: 404,
      message: `Ingredients not available in database: ${message}. Try again.`,
    });
  } else if (notIngredients.length === 0) {
    // we update Pantry in Mongo since we passed check that all ingredients are correct
    const pantry = await Pantry.findOneAndUpdate(
      { _id: req.body.pantryId },
      {
        $set: {
          ingredientsArray: ingredients,
        },
      },
      { new: true }
    );

    // console.log(pantry);

    // response to our service on frontend if Pantry was created in Mongo
    res.status(201).json({
      status: 201,
      message: `Pantry updated with all ingredients specified.`,
    });
  }
};

const PantryController = {
  createPantry: createPantry,
  getPantry: getPantry,
  updatePantry: updatePantry,
};

module.exports = PantryController;

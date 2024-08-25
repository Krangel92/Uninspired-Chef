// Load environment variables from the /api/.env file
require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});
const categoryKeywords = require("../lists/categoryKeywords");
const Pantry = require("../models/pantry");
const examplePantry = require("../lists/examplePantry");
const essentialsList = require("../lists/essentials");
const recipeAppId = process.env.RECIPE_APP_ID;
const recipeAppKey = process.env.RECIPE_APP_KEY;
const foodAppId = process.env.FOOD_APP_ID;
const foodAppKey = process.env.FOOD_APP_KEY;
const { Recipe } = require("../models/recipe"); // importing the Recipe model
const User = require("../models/user"); // importing the User model
const { generateToken } = require("../lib/token");

const getRandomRecipes = async (req, res) => {
  const userId = req.query.userId; // id of owner of the pantry
  const pantry = await Pantry.findOne({ user_id: userId });

  console.log("BUG TO FIX!!!" + Pantry); // KR: when the 'await' on line 19 is too long the compailer doesn't wait for the info & continues to read the
  //code on this file - this needs to be fixed/managed. What happens on the app: when the pantry is empty it doesn't show add/crate pantry & won't get recipes.

  const ourPantry = pantry.ingredientsArray.map((item) =>
    item.label.toLowerCase()
  );

  const allIngredients = ourPantry; // Replace with actual pantry data
  let suggestionsArray = [];
  let hitRecipe = null;

  const categorizeIngredient = (ingredient) => {
    for (const category in categoryKeywords) {
      const keywords = categoryKeywords[category];
      if (
        keywords.some((keyword) => ingredient.toLowerCase().includes(keyword))
      ) {
        return category;
      }
    }
    return "others"; // Default category if no match is found
  };

  // Categorize the ingredients using the category keywords
  const categorisedIngredients = allIngredients.reduce((acc, ingredient) => {
    const category = categorizeIngredient(ingredient);
    // no category found then the category defaults to empty, which is other
    if (!acc[category]) acc[category] = [];
    //the category is pushed to the ingredient
    acc[category].push(ingredient);
    //accumulator is returned
    return acc;
  }, {});

  console.log(
    "These are our categorized ingredients: ",
    categorisedIngredients
  );

  // Here we are defining a function to pick a random ingredient from a category. Thanks GPT
  const pickRandomIngredient = (category) => {
    if (
      categorisedIngredients[category] &&
      categorisedIngredients[category].length > 0
    ) {
      const ingredients = categorisedIngredients[category];
      return ingredients[Math.floor(Math.random() * ingredients.length)];
    }
    return;
  };

  // Defining some variables to randomly select one ingredient from the desired category
  const selectedProtein = pickRandomIngredient("protein");
  const selectedVegetable = pickRandomIngredient("vegetables");
  const selectedCarbohydrate = pickRandomIngredient("carbohydrates");
  const selectedFruit = pickRandomIngredient("fruit");
  const selectedCondiments = pickRandomIngredient("condiments");
  const selectedDairy = pickRandomIngredient("dairy");
  const selectedOther = pickRandomIngredient("other");

  // Combining selected random ingredients to form the initial search query
  let selectedIngredients = [
    selectedCarbohydrate,
    selectedVegetable,
    selectedProtein,
  ].filter(Boolean);

  if (selectedIngredients.length === 0) {
    selectedIngredients = [
      selectedFruit,
      selectedCondiments,
      selectedDairy,
      selectedOther,
    ].filter(Boolean);
  }

  //     console.log("Selected Ingredients for Initial Query: ", selectedIngredients);

  // Now implementing a fallback so if we fail try removing an ingredient
  while (selectedIngredients.length > 0) {
    // DEBUG --  console.log("Trying with ingredients: ", selectedIngredients);
    console.log("entering Loop...");
    try {
      // Convert the selected ingredients into a formatted query string
      const formattedString = selectedIngredients
        .toString()
        .replaceAll(",", "%2C%20");
      const response = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${formattedString}&app_id=${recipeAppId}&app_key=${recipeAppKey}`
      );
      const data = await response.json();
      // DEBUG -- console.log('Data received: ', data);

      // Process the search results
      if (data.count > 0) {
        data.hits.forEach((recipe) => {
          const recipeIngredients = recipe.recipe.ingredients.map(
            (ingredient) => ingredient.food.toLowerCase()
          );
          const filteredIngredients = recipeIngredients.filter(
            (food) => !essentialsList.includes(food)
          );
          // creates a missing ingredients array.
          const missingIngredients = filteredIngredients.filter(
            (food) => !allIngredients.includes(food)
          );
          // this creates a potential replacements ingredients array
          const replacementIngredients = missingIngredients.flatMap(
            (missing) => {
              return allIngredients.filter((ingredient) => {
                // Split both missing and pantry ingredients into words
                const missingWords = missing.split(" ");
                const ingredientWords = ingredient.split(" ");

                // Check if any word in missing matches a word in the pantry ingredient
                return missingWords.some((word) =>
                  ingredientWords.includes(word)
                );
              });
            }
          );
          // DEBUG -- console.log("missing ingredients: ", missingIngredients)
          // DEBUG -- console.log("replacement ingredients: ", replacementIngredients)

          // This was some generated code, the function is so that when we return to the front end
          // we know which missing ingredient it has suggested a replacement with
          const mappedReplacements = missingIngredients
            .map((missing) => {
              const replacement = replacementIngredients.find((ingredient) => {
                const missingWords = missing.split(" ");
                const ingredientWords = ingredient.split(" ");
                return missingWords.some((word) =>
                  ingredientWords.includes(word)
                );
              });
              return replacement
                ? `- Replace ${missing} with ${replacement}`
                : null;
            })
            .filter(Boolean);
          // Filter out any null values where no replacement was found

          // If we find that we can replace all the missing ingredients with a potential replacement
          // then we push the recipe into hitRecipe
          if (missingIngredients.length - mappedReplacements.length === 0) {
            hitRecipe = recipe;
            hitRecipe.suggestedReplacements = mappedReplacements;
            return; // Exit the forEach loop
          } else {
            suggestionsArray.push({
              recipe: recipe,
              missingIngredients: missingIngredients,
              missingCount: missingIngredients.length,
            });
          }
        });

        if (hitRecipe) {
          return res.status(200).json({ hit: hitRecipe, suggestions: [] });
        }
      }
    } catch (err) {
      console.log("Error occurred: ", err);
      return res.status(500).json({ message: "Error fetching a recipe" });
    }

    // If no results found, remove one ingredient and try again
    if (selectedIngredients.length > 1) {
      selectedIngredients.pop();
    } else {
      break;
    }
  }

  // Sort and return suggestions if no exact hit is found
  suggestionsArray.sort((a, b) => a.missingCount - b.missingCount);
  // console.log("Sorted suggestions: ", suggestionsArray);

  if (suggestionsArray.length > 0) {
    res.status(200).json({ hit: null, suggestions: suggestionsArray });
  } else {
    res.status(404).json({
      message:
        "Couldn't find a recipe with your ingredients. You need to go shopping!",
    });
  }
};

const getFavouriteRecipes = async (req, res) => {
  try {
    //find the user by their ID (added to request object in middleware)
    const user = await User.findById(req.user_id);

    // send back the user's favourited recipes
    res.json(user.favouritedRecipes);
  } catch (error) {
    // console.error(error);
    res.status(500).json({
      message: "Something went wrong - unable to retrieve favourites.",
    });
  }
};

const addRecipeToFavourites = async (req, res) => {
  try {
    //find the user by their ID (added to request object in middleware)
    const user = await User.findById(req.user_id);
    //get shareAs link of the potential favourite recipe from the request body
    const newFavouriteRecipeShareAs = req.body.recipe.shareAs;
    // if (newFavouriteRecipeShareAs === undefined) {
    //     newFavouriteRecipeShareAs = req.body.recipe?.shareAs;
    // }
    //check recipe shareAs isn't already include in user's favourites
    const recipeAlreadyInFavourites = user.favouritedRecipes.some(
      (recipe) => recipe.recipe.shareAs === newFavouriteRecipeShareAs
    );
    //if recipe has already been favourited, return a response confirming this
    if (recipeAlreadyInFavourites) {
      return res
        .status(400)
        .json({ message: "Recipe has already been favourited!" });
    }
    //if recipe hasn't been favourited, add the new recipe to the user's favouritedRecipes array
    user.favouritedRecipes.push(req.body.recipe);
    await user.save();
    //send a response confirming action
    res.status(200).json({ message: "Recipe added to favourites!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Something went wrong - unable to add recipe to favourites.",
    });
  }
};
const removeRecipeFromFavourites = async (req, res) => {
  try {
    //find the user by their ID (added to request object in middleware)
    const user = await User.findById(req.user_id);
    //get shareAs of the recipe to be removed from the request body
    const recipeToBeRemovedShareAs = req.body.recipe.recipe.shareAs;
    console.log(recipeToBeRemovedShareAs);
    //find index of recipe in the user's favouritedRecipes array
    const recipeIndex = user.favouritedRecipes.findIndex(
      (recipe) => recipe.recipe.shareAs === recipeToBeRemovedShareAs
    );
    //if recipe is not found (i.e. -1 is returned), return a response flagging this
    if (recipeIndex === -1) {
      return res.status(404).json({ message: "Recipe not in favourites!" });
    }
    //if recipe index is found, remove it from user's favouritedRecipes array
    user.favouritedRecipes.splice(recipeIndex, 1); //splice method takes 2 args: index to start removing from, number of elements to remove i.e. 1 in this case
    await user.save();
    //send a response confirming action
    res.status(200).json({ message: "Recipe removed from favourites." });
  } catch (err) {
    // console.error(error);
    res.status(500).json({
      message:
        "Something went wrong - unable to remove recipe from favourites.",
    });
  }
};

const RecipesController = {
  getRandomRecipes: getRandomRecipes,
  getFavouriteRecipes: getFavouriteRecipes,
  addRecipeToFavourites: addRecipeToFavourites,
  removeRecipeFromFavourites: removeRecipeFromFavourites,
};

module.exports = RecipesController;

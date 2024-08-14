const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
    recipe: { 
        type: Object,
        required: true
    },
    
});

const Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;

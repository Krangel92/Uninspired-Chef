const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

import { jwtDecode } from "jwt-decode";

// Get recipes based on user's pantry
export const getRandomRecipe = async () => {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token).user_id;

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log("calling backend...");
  const response = await fetch(
    `http://localhost:3000/recipes?userId=${decodedToken}`,
    requestOptions
  );
  if (!response.ok) {
    throw new Error("Error retreiving a recipe");
  }
  const data = await response.json();
  // DEBUG -- console.log(data)
  return data;
};

// get all favourites
export const getFavouriteRecipes = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(
    `${BACKEND_URL}/recipes/favourites`,
    requestOptions
  );

  if (response.status !== 200) {
    throw new Error("Unable to retrieve favourites");
  }

  const data = await response.json();
  return data;
};

// add a recipe to user's favourites
export const addRecipeToFavourites = async (token, recipe) => {
  console.log(recipe);

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ recipe }),
  };

  // console.log(requestOptions.body);

  const response = await fetch(
    `${BACKEND_URL}/recipes/favourites`,
    requestOptions
  );

  if (response.status !== 200) {
    throw new Error("Unable to add recipe to favourites");
  }

  const data = await response.json();
  return data;
};

// remove a recipe from user's favourites
export const removeRecipeFromFavourites = async (token, recipe) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ recipe }),
  };

  const response = await fetch(
    `${BACKEND_URL}/recipes/favourites`,
    requestOptions
  );

  if (response.status !== 200) {
    throw new Error("Unable to remove recipe from favourites");
  }

  const data = await response.json();
  return data;
};

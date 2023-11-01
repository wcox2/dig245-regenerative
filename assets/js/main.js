const recipeNameElement = document.getElementById('recipe-name');
const instructionsElement = document.getElementById('recipe-instructions');
const ingredientsListElement = document.getElementById('ingredients-list');
const recipeImageElement = document.getElementById('recipe-image');
const categorySelect = document.getElementById('cuisine-select');
const recommendRecipeButton = document.getElementById('recommend-recipe-btn');
const instructHeader = document.getElementById('instructions-header');
const ingredientHeader = document.getElementById('ingredients-header');

async function recommendRecipe() {
    const selectedCuisine = categorySelect.value; 
    const endpoint = 'https://www.themealdb.com/api/json/v2/9973533/filter.php?c=' + selectedCuisine;
    await fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            const meals = data.meals;
            if (meals && meals.length > 0) {
                const randomRecipe = meals[Math.floor(Math.random() * meals.length)];

                recipeNameElement.textContent = randomRecipe.strMeal;
                ingredientHeader.textContent = 'Ingredients';
                instructHeader.textContent = 'Instructions';
                meal = randomRecipe.idMeal;
            } else {
                recipeNameElement.textContent = 'Recipe not found for the selected category.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    findRecipe(meal);
}

async function findRecipe(meal){
  console.log(meal.replace(/\s/g, '') );
  const endpoint1 = 'http://www.themealdb.com/api/json/v1/1/lookup.php?i=' + meal.replace(/\s/g, '');

  await fetch(endpoint1)
      .then(response1 => response1.json())
      .then(data1 => {
        const meal = data1.meals[0];
        instructionsElement.textContent =  meal.strInstructions;
        recipeImageElement.src = meal.strMealThumb;

        ingredientsListElement.innerHTML = '';

        for (let i = 1; i <= 20; i++) {
            const ingredient = meal['strIngredient' + i];
            const measurement = meal['strMeasure' + i];
            if (ingredient) {
                const ingredientItem = document.createElement('li');
                ingredientItem.textContent = `${measurement} ${ingredient}`;
                ingredientsListElement.appendChild(ingredientItem);
            }
        }
      })
}

recommendRecipeButton.addEventListener('click', recommendRecipe);










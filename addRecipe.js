function retriveAllRecipies(){
    let recipies = [];
    Object.keys(localStorage).forEach(key => {
        let retrivedObj = localStorage.getItem(key);
        recipies.push(JSON.parse(retrivedObj)) ;
      });
      return recipies;
}

// GET ALL RECIPIES ON WINDOW LOAD and YEAR FOR FOOTER
let recipiesArray = [];
window.onload = (event) => {
    let dt = new Date();
    let par = document.querySelector("#copy-p");
    par.textContent = `@${dt.getFullYear()} Created by Panagiotis Eleftheriadis`;

    recipiesArray = retriveAllRecipies();
};

function saveRecipe(obj){
    localStorage.setItem(obj.title, JSON.stringify(obj));
}


// CHECKBOX VALUE CHANGE
let popularCheckbox = document.querySelector("#popular");
popularCheckbox.addEventListener("click", () =>{
    if(popularCheckbox.value === "false"){
        popularCheckbox.setAttribute("value", "true");
    }else{
        popularCheckbox.setAttribute("value", "false");
    }
})

// ADD RECIPE
let addRecipeButton = document.querySelector("#add-recipe-button");

addRecipeButton.addEventListener("click", () => {
    let title = document.querySelector("#title");
    let category = document.querySelector("#category");
    let ingredients = document.querySelector("#ingredients");
    let instructions = document.querySelector("#instructions");
    let popular = document.querySelector("#popular");
    

    let newObj = {
        title: title.value,
        category: category.value,
        ingredients: ingredients.value,
        instructons: instructions.value,
        popular: popular.value
    }

    saveRecipe(newObj);
    console.log(title.value, category.value, ingredients.value, instructions.value, popular.value);
});
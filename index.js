// import {saveRecipe, retrieveRecipe, retriveAllRecipies, deleteRecipe} from './scripts/utils'


// HELPER FUNCTIONS
function saveRecipe(obj){
    localStorage.setItem(obj.title, JSON.stringify(obj));
}

function retrieveRecipe(title){
    localStorage.getItem(title)
}


function retriveAllRecipies(){
    let recipies = [];
    Object.keys(localStorage).forEach(key => {
        let retrivedObj = localStorage.getItem(key);
        recipies.push(JSON.parse(retrivedObj)) ;
      });
      return recipies;
}

function deleteRecipe(title) {
    localStorage.removeItem(title)
}


// GET ALL RECIPIES ON WINDOW LOAD and YEAR FOR FOOTER
let recipiesArray = [];
window.onload = (event) => {
    let dt = new Date();
    let par = document.querySelector("#copy-p");
    par.textContent = `@${dt.getFullYear()} Created by Panagiotis Eleftheriadis`;

    recipiesArray = retriveAllRecipies();
};

// HOME BUTTON AND LOGO CLICK
let logoClick = document.querySelector(".navbar-brand");
let homeClick = document.querySelector(".home-a");

function handleHomeClick(){
    // while (recipies_section.firstChild) {
    //     recipies_section.removeChild(recipies_section.firstChild);
    // }
    document.querySelector("#recipies-section").style.display = "none";
    document.querySelector("#div-header").style.display = "block";
}

logoClick.addEventListener("click", handleHomeClick);
homeClick.addEventListener("click", handleHomeClick);

// SHOW ALL RECIPIES
let showAllRecipiesButton = document.querySelector("#all-recipies");

showAllRecipiesButton.addEventListener("click", (recipies) => {
    document.querySelector("#div-header").style.display = "none";
    // showAllRecipiesButton.style.display = "none";
    let recipies_section = document.querySelector("#recipies-section");

    while (recipies_section.firstChild) {
        recipies_section.removeChild(recipies_section.firstChild);
    }

    for(let recipe of recipiesArray){
        
        let div = document.createElement("div");
        div.classList.add("recipe-div")

        let h4 = recipe.title;
        let H4 = document.createElement("h4");
        H4.textContent = h4;

        let pCategory = recipe.category;
        let PCategory = document.createElement("p");
        PCategory.textContent = `Category: ${pCategory}`;

        let pIngredients = recipe.ingredients;
        let PIngredients = document.createElement("p");
        PIngredients.textContent = `Ingredients: ${pIngredients}`;

        let pInstructions = recipe.instructons;
        let PInstructions = document.createElement("p");
        PInstructions.textContent = `Instructions: ${pInstructions}`;

        let editButton = document.createElement("button");
        editButton.classList.add("btn", "btn-outline-success");
        editButton.textContent = "EDIT";

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-outline-danger");
        deleteButton.textContent = "DELETE";
        

        // ADD TWO BUTTONS FOR EDIT AND DELETE RECIPE

        div.append(H4, PCategory, PIngredients, PInstructions, editButton, deleteButton);
        
        recipies_section.appendChild(div) 
    }

    recipies_section.style.display = "flex";
    recipies_section.classList.add("display-flex");
});

// SHOW POPULAR RECIPIES
let showPopularRecipiesButton = document.querySelector("#popular-recipies");

showPopularRecipiesButton.addEventListener("click", (recipies) => {
    document.querySelector("#div-header").style.display = "none";
    // showAllRecipiesButton.style.display = "none";
    let recipies_section = document.querySelector("#recipies-section");

    while (recipies_section.firstChild) {
        recipies_section.removeChild(recipies_section.firstChild);
    }

    for(let recipe of recipiesArray){
        if(recipe.popular === "true"){
            let div = document.createElement("div");
        div.classList.add("recipe-div")

        let h4 = recipe.title;
        let H4 = document.createElement("h4");
        H4.textContent = h4;

        let pCategory = recipe.category;
        let PCategory = document.createElement("p");
        PCategory.textContent = `Category: ${pCategory}`;

        let pIngredients = recipe.ingredients;
        let PIngredients = document.createElement("p");
        PIngredients.textContent = `Ingredients: ${pIngredients}`;

        let pInstructions = recipe.instructons;
        let PInstructions = document.createElement("p");
        PInstructions.textContent = `Instructions: ${pInstructions}`;

        let editButton = document.createElement("button");
        editButton.classList.add("btn", "btn-outline-success");
        editButton.textContent = "EDIT";

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-outline-danger");
        deleteButton.textContent = "DELETE";
        

        // ADD TWO BUTTONS FOR EDIT AND DELETE RECIPE

        div.append(H4, PCategory, PIngredients, PInstructions, editButton, deleteButton);
        
        recipies_section.appendChild(div)
        }
         
    }
    
    recipies_section.style.display = "flex";
    recipies_section.classList.add("display-flex");
});


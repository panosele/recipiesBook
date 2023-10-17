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
        deleteButton.setAttribute("value", recipe.title);
        deleteButton.setAttribute("id", "delete-button");
        deleteButton.setAttribute("type", "button");
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
            deleteButton.setAttribute("value", recipe.title);
            deleteButton.setAttribute("id", "delete-button");
            deleteButton.setAttribute("type", "button");
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


// EVENT LISTENER FOR DELETE BUTTON IN EACH RECIPIE
document.addEventListener( "click", (event) => {
    let element = event.target;
    if(element.id === "delete-button"){
        let title = element.parentElement.childNodes[0].textContent;
        deleteRecipe(title);
        // element.parentElement.parentElement.parentElement.childNodes[5].childNodes[1].childNodes[1].childNodes[1].click();
        location.reload();
        document.querySelector("#popular-recipies").click();
    }
} );

// EVENT LISTENER FOR EDIT BUTTON IN EACH RECIPIE

// CATEGORIES OF RECIPIES SHOW AND LINK EACH CATEGORY WITH ITS RECIPIES
let categoriesNavLink = document.querySelector(".categories-link");

categoriesNavLink.addEventListener("click", (event) => {
    let categories = [];
    document.querySelector("#div-header").style.display = "none";
    let recipies_section = document.querySelector("#recipies-section");
    recipies_section.style.textAlign = "center";

    while (recipies_section.firstChild) {
        recipies_section.removeChild(recipies_section.firstChild);
    }

    let div = document.createElement("div");
    div.classList.add("recipe-div");
    div.style.textAlign = "center";

    for(let recipe of recipiesArray){
        if(!recipiesArray.includes(recipe.category)){
            categories.push(recipe.category);
            
            let text = recipe.category.toUpperCase();

            let a = document.createElement("a");
            a.style.textDecoration = "none";
            a.style.color = "green";
            a.style.cursor = "grab";
            // a.style.hov
            a.setAttribute("id", `${recipe.category}`);
            a.setAttribute("class", "category-a-link");
            a.textContent = text;

            let H3 = document.createElement("h3");
            H3.appendChild(a);

            div.appendChild(H3);
        }
    }
    
    recipies_section.appendChild(div);
    recipies_section.style.display = "flex";
    recipies_section.classList.add("display-flex");
})

// EVENT HANDLER FOR CATEGORY CLICK ON CATEGORIES LIST
document.addEventListener( "click", (event) => {
    let element = event.target;
    if(element.classList[0] === "category-a-link"){
        let category = element.id;

        document.querySelector("#div-header").style.display = "none";
        let recipies_section = document.querySelector("#recipies-section");

        while (recipies_section.firstChild) {
            recipies_section.removeChild(recipies_section.firstChild);
        }

        for(let recipe of recipiesArray){
            if(recipe.category === category){
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
                deleteButton.setAttribute("value", recipe.title);
                deleteButton.setAttribute("id", "delete-button");
                deleteButton.setAttribute("type", "button");
                deleteButton.classList.add("btn", "btn-outline-danger");
                deleteButton.textContent = "DELETE";
                

                // ADD TWO BUTTONS FOR EDIT AND DELETE RECIPE

                div.append(H4, PCategory, PIngredients, PInstructions, editButton, deleteButton);
                
                recipies_section.appendChild(div)
            } 
        }
        recipies_section.style.display = "flex";
        recipies_section.classList.add("display-flex");
    }
});

import React, { useState } from 'react';
import Modall from './Modall';

const Recipe = () => {
  const [showAddMod, setAddMod] = useState(false);
  const [recipes, setRecipes] = useState([]); 
  const [selectedRecipe, setSelectedRecipe] = useState(null); 
  const [showRecipeList, setShowRecipeList] = useState(false); 
  const [editingRecipe, setEditingRecipe] = useState(null); 
  let [showEditMod,setEditMod] = useState(false)

  
  const handleSaveRecipe = (newRecipe) => {
    if (editingRecipe) {
    
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.name === editingRecipe.name ? newRecipe : recipe
        )
      );
      setSelectedRecipe(newRecipe); 
    } else {
      
      setRecipes([...recipes, newRecipe]);
    }
    setAddMod(false);
    setEditingRecipe(null); 
    setShowRecipeList(true); 
  };

  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleEditRecipe = (recipe) => {
    setEditingRecipe(recipe);
    setAddMod(true); 
  };

  
  const handleDeleteRecipe = (recipeToDelete) => {
    setRecipes(recipes.filter((recipe) => recipe.name !== recipeToDelete.name));
    setSelectedRecipe(null); 
  };

  return (
    <div className="container">
      <div className="contain">
        <div className="head">
          <h3>Recipe's List</h3>
          <div className="btnss">
          <button  onClick={() => setAddMod(true)}><i className="fa-solid fa-plus" /></button>
          </div>
        </div>
        <hr />

      
        {showRecipeList ? (
    recipes.length > 0 ? ( 
      <div className="recipe-list">
        {recipes.map((recipe, index) => (
          <div
            key={index}
            className="recipe-item"
            onClick={() => handleSelectRecipe(recipe)}
          >
            <h5>{recipe.name}</h5>
            <hr />
          </div>
        ))}
      </div>
    ) : (
      <div className="addrecipe">
        <img src="/list.png" alt="image" />
        <button onClick={() => setAddMod(true)}>Add Recipe</button>
      </div>
    )
  ) : (
    <div className="addrecipe">
      <img src="/list.png" alt="image" />
      <button onClick={() => setAddMod(true)}>Add Recipe</button>
    </div>
  )}
      </div>

      
      <div className="contain1">
        {!selectedRecipe ? (
          
          <div className="burger">
            <img src="/Burger1.png" alt="burger" />
            <h4>Select for recipe detail!</h4>
          </div>
        ) : (

      <div className="recipe-details">
            <div className="recipe-actions">
              <h4>{selectedRecipe.name}</h4>
              <div className="recipe-editdelete">
              <button className='btn' onClick={() => {handleEditRecipe(selectedRecipe); setEditMod(true) }}><i className="fa-solid fa-pen" />   </button> { " "}
              <button className='btn' onClick={() => handleDeleteRecipe(selectedRecipe)}><i className="fa-solid fa-trash" /></button>
            </div>
            </div>
            <hr />
            <h5>Ingredients:</h5>
            <p>. {selectedRecipe.ingredients}</p>
            <h5>Description:</h5>
            <p>. {selectedRecipe.description}</p>
          </div>
        )}
      </div>

      <Modall
        showmodal={showAddMod}
        onClose={() => setAddMod(false)}
        onSave={handleSaveRecipe} 
        editingRecipe={editingRecipe} 
        editrecipe = {showEditMod ? selectedRecipe : null}
      />
    </div>
  );
};

export default Recipe;





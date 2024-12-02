import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

const Modall = (props) => {
  const { showmodal, onClose, onSave, editrecipe } = props;

  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({}); // For validation errors

  useEffect(() => {
    if (editrecipe) {
      setRecipeName(editrecipe.name || "");
      setIngredients(editrecipe.ingredients || "");
      setDescription(editrecipe.description || "");
    } else {
      setRecipeName("");
      setIngredients("");
      setDescription("");
      setErrors({});
    }
  }, [editrecipe, showmodal]);

  const validate = () => {
    const newErrors = {};
    if (!recipeName.trim()) newErrors.recipeName = "Recipe name is required";
    if (!ingredients.trim()) newErrors.ingredients = "Ingredients are required";
    if (!description.trim()) newErrors.description = "Description is required";
    return newErrors;
  };

  const handleSave = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const newRecipe = {
        name: recipeName,
        ingredients,
        description,
      };
      onSave(newRecipe);
      onClose();
    }
  };

  return (
    <Modal
      show={showmodal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ borderRadius: "none" }}
    >
      <Modal.Header closeButton onClick={onClose}>
        <Modal.Title id="contained-modal-title-vcenter">
          {editrecipe ? "Edit Recipe" : "Add Recipe"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="container2">
          <div className="contain3">
            <label htmlFor="recipename" className="form-label">
              Recipe Name
            </label>
            <input
              type="text"
              id="recipename"
              className="form-control"
              name="name"
              placeholder="Enter the recipe name"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
            />
            {errors.recipeName && <small className="text-danger">{errors.recipeName}</small>}
          </div>

          <div className="contain4">
            <div className="inputs">
              <div className="ingredients-recipe">
                <label htmlFor="ingredients" className="form-label">
                  Recipe Ingredients
                </label>
                <textarea
                  id="ingredients"
                  className="form-control"
                  name="ingredients"
                  rows="6"
                  placeholder="Enter each ingredient separated by asterisks (e.g., 1 tbsp sugar * 2 tbsp honey)"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                />
                {errors.ingredients && <small className="text-danger">{errors.ingredients}</small>}
              </div>

              <div className="description-recipe">
                <label htmlFor="description" className="form-label">
                  Recipe Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="6"
                  placeholder="Enter each step separated by asterisks (e.g., Boil water * Add sugar)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && <small className="text-danger">{errors.description}</small>}
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          style={{
            backgroundColor: "white",
            border: "1px solid black",
            color: "black",
            width: "80px",
          }}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          {editrecipe ? "Edit Recipe" : "Add Recipe"}
        </Button>
      </Modal.Footer>
    </Modal>

    
  );
};

export default Modall;

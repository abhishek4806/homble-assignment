import React, { useState } from "react";
import { postRequest } from "../axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProductModal({ onClose, refetchProducts }) {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [allergenInfo, setAllergenInfo] = useState('');
  
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setIsLoading(true);
  
      
      try {
        const response = await postRequest("/products"); 
        toast.success("Product added successfully!",{ autoClose: 3000 }); 
        onClose();
      } catch (err) {
        setError("Something went wrong.");
        toast.error("Failed to add product.",{ autoClose: 3000 });
      } finally {
        setIsLoading(false);
      }
    };
  
  return (
    <div className="modal-overlay">
    <div className="modal-container">
      <div className="modal-content">
        <h2>Add Product</h2>
        {error && <p className="error-message">{error}</p>} 
        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="form-group">
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="productDescription">Description:</label>
            <textarea
              id="productDescription"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="allergenInfo">Allergen Info:</label>
            <input
              type="text"
              id="allergenInfo"
              value={allergenInfo}
              onChange={(e) => setAllergenInfo(e.target.value)}
            />
          </div>

          <div className="button-group"> 
            <button type="submit" disabled={isLoading} className="add-button">
              {isLoading ? 'Adding...' : 'Add Product'}
            </button>
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);
}

export default AddProductModal;


import React from "react";
import { useNavigate } from "react-router-dom";

function ProductTile({ product }) {
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate(`/product/${product.id}`); 
  };

  return (
    <div onClick={handleClick} className="product-tile">
      <img src={product.productImage} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Price: Rs.{product.selling_price}</p>
    </div>
  );
}

export default ProductTile;
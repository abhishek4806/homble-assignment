import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import ExpandableSection from "../components/ExpandableSection";


function ProductDetailsPage() {
    const { id } = useParams();
    const {
        data: product,
        error,
        isLoading,
        refetch
    } = useApi(`/products/${id}`, null, "GET");

    useEffect(() => {
        refetch({ id });
    }, [id, refetch]);


    if (isLoading) {
        return (
            <div className="product-details-page">
                <p>Loading...</p> </div>
        );
    }


    if (error) {
        return (
            <div className="product-details-page">
                <p className="error-message">{error}</p> </div>
        );
    }


    if (!product) {
        return (
            <div className="product-details-page">
                <p>Product not found.</p> </div>
        );
    }

    return (
        <div className="product-details-page">
            <img
                src={product.productImage}
                alt={product.name}
                className="product-image"
            />
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">Price: Rs.{product.selling_price}</p>

            <ExpandableSection title="Description">
                <p>{product.description}</p>
            </ExpandableSection>

            <ExpandableSection title="Allergen Information">
                <p>{product.allergen_info}</p>
            </ExpandableSection>

            <ExpandableSection title="Cooking Instructions">
                <p>{product.cooking_instruction}</p>
            </ExpandableSection>
        </div>
    );
}

export default ProductDetailsPage;


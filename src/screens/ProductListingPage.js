import React, { useState, useMemo } from "react";
import useApi from "../hooks/useApi";
import ProductTile from "../components/ProductTile";
import SkeletonLoader from "../components/SkeletonLoader";
import AddProductModal from "../components/AddProductModal";
import { Link } from 'react-router-dom';


function ProductListingPage() {
    const { data: products, error, isLoading, refetch: refetchProducts } =
        useApi("/products", [], "GET");
    const [showModal, setShowModal] = useState(false);

    const sortedProducts = useMemo(() => {
        return products.sort((a, b) => a.selling_price - b.selling_price);
    }, [products]);

    const columns = useMemo(() => {
        if (window.innerWidth > 992) {
            return 3; // Large screens: 3 columns
        } else if (window.innerWidth > 768) {
            return 2; // Medium screens: 2 columns
        } else {
            return 1; // Small screens: 1 column
        }
    }, []);

    return (
        <div className="product-listing-page-wrapper">
            <div className="top-buttons-container">
                <button className="add-product-button-container" onClick={() => setShowModal(true)}>Add Product</button>
                <Link to="/dashboard">
                    <button className="dashboard-button">Dashboard</button>
                </Link>
            </div>

            {showModal && (
                <AddProductModal
                    onClose={() => setShowModal(false)}
                    refetchProducts={refetchProducts}
                />
            )}
            <div className="product-listing-page">
                <div className={`product-grid columns-${columns}`}>
                    {isLoading
                        ? [...Array(columns * 3)].map((_, index) => (
                            <SkeletonLoader key={index} />
                        ))
                        : error
                            ? <p>{error}</p>
                            : sortedProducts.map((product) => (
                                <ProductTile key={product.id} product={product} />
                            ))}
                </div>
            </div>
        </div>
    );
}

export default ProductListingPage;

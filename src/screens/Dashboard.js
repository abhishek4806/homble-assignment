import React, { useState, useMemo, useEffect } from 'react';
import useApi from '../hooks/useApi';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
    const { data: products, error, isLoading } = useApi('/dashboard', []);
    const [sortBy, setSortBy] = useState('id');
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchQuery, setSearchQuery] = useState('');
    const [updatedProducts, setupdatedProducts] = useState(products)

    useEffect(() => {
        setupdatedProducts(products)
    }, [products]);

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    const handleRemoveProduct = (productId) => {
        setupdatedProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
        toast.error("Product Removed!", { autoClose: 3000 });

    };

    const filteredProducts = useMemo(() => {
        return updatedProducts.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.id.includes(searchQuery)
        );
    }, [updatedProducts, searchQuery]);


    const sortedProducts = useMemo(() => {
        const sorted = [...filteredProducts].sort((a, b) => {
            if (sortBy === 'id') {
                return sortOrder === 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
            } else if (sortBy === 'selling_price') {
                return sortOrder === 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
            } else {
                return sortOrder === 'asc'
                    ? a[sortBy].localeCompare(b[sortBy])
                    : b[sortBy].localeCompare(a[sortBy]);
            }
        });
        return sorted;
    }, [filteredProducts, sortBy, sortOrder]);


    return (
        <div className="dashboard">
            <input
                type="text"
                placeholder="Search by name or ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('id')}>ID {sortBy === 'id' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
                            <th onClick={() => handleSort('name')}>Name {sortBy === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
                            <th onClick={() => handleSort('selling_price')}>Selling Price {sortBy === 'selling_price' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedProducts.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.selling_price}</td>
                                <td>
                                    <button onClick={() => handleRemoveProduct(product.id)}>Check</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Dashboard;

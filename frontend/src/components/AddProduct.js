import React, { useState } from 'react';
import './AddProduct.css';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);

    const addProduct = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/add-product", {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        console.warn(result);
    };

    return (
        <div className="add-product-container">
            <h1>Add Product</h1>
            <input
                type="text"
                className="product-input"
                placeholder="Enter product"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            {error && !name && <span className="error-message">Enter valid name</span>}

            <input
                type="text"
                className="product-input"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            {error && !price && <span className="error-message">Enter valid price</span>}

            <input
                type="text"
                className="product-input"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            {error && !category && <span className="error-message">Enter valid category</span>}

            <input
                type="text"
                className="product-input"
                placeholder="Enter company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />
            {error && !company && <span className="error-message">Enter valid company</span>}

            <button className="add-button" onClick={addProduct}>
                Add Product
            </button>
        </div>
    );
};

export default AddProduct;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdateProducts.css';

const UpdateProducts = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, []);

    const getProductDetails = async () => {
        let Uid = params.id;
        let result = await fetch(`http://localhost:5000/product/${Uid}`);
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    };

    const updateProduct = async () => {
        console.warn(name, price, category, company);
        let Uid = params.id;
        let result = await fetch(`http://localhost:5000/product/${Uid}`, {
            method: 'Put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        result = await result.json();
        console.warn(result);
        navigate('/');
    };

    return (
        <div className="update-product-container">
            <h1>Update Product</h1>
            <input
                type="text"
                placeholder="Enter product"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="update-input"
            />

            <input
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="update-input"
            />

            <input
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="update-input"
            />

            <input
                type="text"
                placeholder="Enter company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="update-input"
            />

            <button onClick={updateProduct} className="update-button">
                Update
            </button>
        </div>
    );
};

export default UpdateProducts;

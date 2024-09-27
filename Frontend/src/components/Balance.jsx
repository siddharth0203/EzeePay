import axios from "axios";
import React, { useEffect, useState } from "react";

export const Balance = () => {
    const [amount, setAmount] = useState(0);
    useEffect(() => {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        if (token) {
            axios.get('http://localhost:3000/api/v1/account/balance', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                setAmount(response.data); // Adjust based on your response structure
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        } else {
            console.error('No token found in local storage');
        }
    }, []);    
    return (
        <div>
            <nav className=" dark:bg-gray-800 rounded shadow flex items-center justify-between bg-white p-2">
                <div className="px-4 flex items-center flex-shrink-0 text-white">
                    <span className=" font-semibold text-xl tracking-tight">Your Balance -</span>
                    <span className="mx-3 font-semibold text-xl tracking-tight">{amount.balance}</span>
                </div>
            </nav>
        </div>
    )
}
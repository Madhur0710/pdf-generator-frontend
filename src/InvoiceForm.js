// InvoiceForm.js
import React, { useState } from 'react';
import axios from 'axios';

const InvoiceForm = () => {
    const [customerName, setCustomerName] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [invoiceDate, setInvoiceDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [lineItems, setLineItems] = useState([{ description: '', quantity: '', price: '' }]);
    const [totalAmount, setTotalAmount] = useState(0);

    const handleLineItemChange = (index, event) => {
        const { name, value } = event.target;
        const items = [...lineItems];
        items[index][name] = value;
        setLineItems(items);
        calculateTotal(items);
    };

    const calculateTotal = (items) => {
        const total = items.reduce((sum, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity) || 0;
            return sum + (price * quantity);
        }, 0);
        setTotalAmount(total);
    };

    const addLineItem = () => {
        setLineItems([...lineItems, { description: '', quantity: '', price: '' }]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            type: 'INV',
            customerName,
            customerAddress,
            invoiceDate,
            dueDate,
            lineItems,
            totalAmount,
        };
        try {
            const response = await axios.post('http://localhost:5000/api/documents/generate', data);
            console.log(response.data); // Handle response (e.g., display success message)
        } catch (error) {
            console.error('Error generating invoice:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-xl mb-4 font-semibold">Invoice Form</h2>
            <div className="mb-4">
                <label className="block mb-1">Customer Name:</label>
                <input 
                    type="text" 
                    value={customerName} 
                    onChange={(e) => setCustomerName(e.target.value)} 
                    className="input border rounded p-2 w-full" 
                    required 
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Customer Address:</label>
                <input 
                    type="text" 
                    value={customerAddress} 
                    onChange={(e) => setCustomerAddress(e.target.value)} 
                    className="input border rounded p-2 w-full" 
                    required 
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Invoice Date:</label>
                <input 
                    type="date" 
                    value={invoiceDate} 
                    onChange={(e) => setInvoiceDate(e.target.value)} 
                    className="input border rounded p-2 w-full" 
                    required 
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Due Date:</label>
                <input 
                    type="date" 
                    value={dueDate} 
                    onChange={(e) => setDueDate(e.target.value)} 
                    className="input border rounded p-2 w-full" 
                    required 
                />
            </div>
            <h3 className="text-lg mb-2">Line Items</h3>
            {lineItems.map((item, index) => (
                <div key={index} className="flex mb-4">
                    <input 
                        type="text" 
                        name="description" 
                        placeholder="Description" 
                        value={item.description} 
                        onChange={(e) => handleLineItemChange(index, e)} 
                        className="input border rounded p-2 w-1/2 mr-2" 
                        required 
                    />
                    <input 
                        type="number" 
                        name="quantity" 
                        placeholder="Quantity" 
                        value={item.quantity} 
                        onChange={(e) => handleLineItemChange(index, e)} 
                        className="input border rounded p-2 w-1/4 mr-2" 
                        required 
                    />
                    <input 
                        type="number" 
                        name="price" 
                        placeholder="Price" 
                        value={item.price} 
                        onChange={(e) => handleLineItemChange(index, e)} 
                        className="input border rounded p-2 w-1/4" 
                        required 
                    />
                </div>
            ))}
            <button type="button" onClick={addLineItem} className="btn bg-green-500 text-white p-2 rounded hover:bg-green-600 transition mb-4">Add Line Item</button>
            <div className="font-semibold">Total Amount: ${totalAmount.toFixed(2)}</div>
            <button type="submit" className="btn bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition mt-2">Generate Invoice</button>
        </form>
    );
};

export default InvoiceForm;

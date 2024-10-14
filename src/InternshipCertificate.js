// InternshipCertificate.js
import React, { useState } from 'react';
import axios from 'axios';

const InternshipCertificate = () => {
    const [internName, setInternName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            type: 'INT',  // Document type for Internship Certificate
            internName,
            companyName,
            startDate,
            endDate,
        };
        try {
            const response = await axios.post('http://localhost:5000/api/documents/generate', data);
            console.log(response.data); // Handle the response (e.g., display success message)
        } catch (error) {
            console.error('Error generating internship certificate:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-xl mb-4 font-semibold">Internship Certificate Form</h2>
            <div className="mb-4">
                <label className="block mb-1">Intern Name:</label>
                <input 
                    type="text" 
                    value={internName} 
                    onChange={(e) => setInternName(e.target.value)} 
                    className="input border rounded p-2 w-full" 
                    required 
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Company Name:</label>
                <input 
                    type="text" 
                    value={companyName} 
                    onChange={(e) => setCompanyName(e.target.value)} 
                    className="input border rounded p-2 w-full" 
                    required 
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Start Date:</label>
                <input 
                    type="date" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                    className="input border rounded p-2 w-full" 
                    required 
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">End Date:</label>
                <input 
                    type="date" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)} 
                    className="input border rounded p-2 w-full" 
                    required 
                />
            </div>
            <button type="submit" className="btn bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">Generate Internship Certificate</button>
        </form>
    );
};

export default InternshipCertificate;

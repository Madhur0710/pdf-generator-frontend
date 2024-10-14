import React from 'react';
import QuotationForm from './QuotationForm';
import InvoiceForm from './InvoiceForm';
import InternshipCertificate from './InternshipCertificate';

const DocumentGenerator = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl">Document Generator</h1>
            <QuotationForm />
            <InvoiceForm />
            <InternshipCertificate />
        </div>
    );
};

export default DocumentGenerator;

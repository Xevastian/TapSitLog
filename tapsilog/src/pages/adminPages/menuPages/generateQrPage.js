import { QRCode } from 'react-qr-code';
import { useState } from 'react';
import axios from 'axios';
import { ipv4 } from '../../../ipv4.js';
import '../../../styles/qrPage.css';

export default function GenerateQrPage() {  
    const [url, setUrl] = useState('');

    const getURL = async () => {
        const tableNumber = document.getElementById('Table-Input').value;
        if (tableNumber === '') {
            alert("Please enter a table number.");
            return;
        }
        try{
            setUrl('');
            const response = await axios.post('http://localhost:5000/table/addTable', {
                Table_Number : tableNumber
            });
            if (response.status === 201) {
                const tableID = response.data._id;
                setUrl( `http://${ipv4}:3000/${tableID}/order`);
            }
        } catch(e){
            console.error("Error generating QR code:", e);
            alert("Failed to generate QR code. Please try again.");
        }
       
    }

    const printQR = () =>{
        const qr = document.getElementById('QR-Code').innerHTML;
        const page = document.body.innerHTML;
        document.body.innerHTML = qr;
        window.print();
        document.body.innerHTML = page;
    };


    const handleBack = () => {
        window.history.back();
    };


    return (
        <main className="route-container">

            {/* HEADER */}
            <div className="route-header">
                <span className="route-date">April 29, 2025</span>
                <h1>Generate QR Code</h1>
            </div>

            {/* CONTENT SECTIONS */}
            <div className="qr-page route-content">
            <div className="qr-controls">
            <h2>Enter Table Number</h2>
                <input type="number" placeholder="Enter Table Number" id="Table-Input"/>
                <button onClick={getURL}>
                    Generate QR
                </button>
                {url === ''? null :
                    <>
                        <div id='QR-Code'>
                        <QRCode
                        size={200}
                        bgColor="white"
                        fgColor="black"
                        value={url}/>
                        </div>
                        <button onClick={printQR}> Print QR </button>
                        <button className="navigate" onClick={handleBack} type="button">
                            Back
                        </button>
                    </>
                }
            </div>
        </div>
        </main>
    )
}


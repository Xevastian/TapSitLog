import { QRCode } from 'react-qr-code';
import { useState } from 'react';

export default function GenerateQrPage() {   
    const [url, setUrl] = useState('');

    const getURL = () => {
        setUrl(document.getElementById('url-input').value);
    }

    const printQR = () =>{
        const qr = document.getElementById('QR-Code').innerHTML;
        const page = document.body.innerHTML;
        document.body.innerHTML = qr;
        window.print();
        document.body.innerHTML = page;
    };

    return (
        <div>
            <h1>Generate QR Page</h1>
            <input type="text" placeholder="Enter URL" id="url-input"/>
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
                </>
            }
        </div>
    )
}
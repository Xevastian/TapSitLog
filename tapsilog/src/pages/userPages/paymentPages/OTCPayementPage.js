import { useParams } from "react-router-dom";
import { QRCode } from "react-qr-code";


export default function OTCPayementPage() {
    const {orderID} = useParams();

    return (
        <div>
            <h1>OTC Payement Page</h1>
            <div id='QR-Code'>
                    <QRCode 
                    size={200}
                    bgColor="white"
                    fgColor="black"
                    value={orderID}/>
                    </div>
            <h2>Order ID: {orderID}</h2>
        </div>
    )
}
import { useParams } from "react-router-dom";
import Barcode from "react-barcode";


export default function OTCPayementPage() {
    const {orderID} = useParams();

    return (
        <div>
            <h1>OTC Payement Page</h1>
            <Barcode value={orderID} />
            <h2>Order ID: {orderID}</h2>
        </div>
    )
}
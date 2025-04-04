import { useParams, useNavigate } from "react-router-dom"

export default function PayementPage() {  
    const {id,orderID} = useParams();
    const navigate = useNavigate();  
    const nav = (path) => {
        navigate(`/${id}/order/${orderID}/payment/${path}`);
    }
    return (
        <div>
            <h1>Payement Page</h1>
            <button onClick={() =>nav("online")}>online</button>
            <button onClick={() =>nav("otc")}>otc</button>
        </div>
    )
}
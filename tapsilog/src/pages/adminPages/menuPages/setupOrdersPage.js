import axios from "axios";
import { useState, useEffect } from "react";

export default function SetupOrdersPage() {
    const [menu, setMenu] = useState([]);
    const [foodName, setFoodName] = useState("");
    const [foodPrice, setFoodPrice] = useState("");

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        try {
            const response = await axios.get("http://localhost:5000/menu/getMenu");
            setMenu(response.data);
        } catch (e) {
            console.error("Error fetching menu:", e);
            alert("Failed to fetch menu.");
        }
    };

    const deleteMenu = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/menu/deleteMenu/${id}`);
            if (response.status === 200) {
                alert("Menu item deleted successfully.");
                fetchMenu();
            }
        } catch (e) {
            console.error("Error deleting menu item:", e);
            alert("Failed to delete menu item.");
        }
    };

    const addMenu = async () => {
        if (!foodName.trim() || !foodPrice.trim()) {
            alert("Please fill in both fields.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/menu/addMenu", {
                Food_Name: foodName,
                Food_Price: parseFloat(foodPrice),
            });

            if (response.status === 201) {
                alert("Menu item added successfully.");
                setMenu([...menu, response.data]); 
                setFoodName("");
                setFoodPrice("");
                fetchMenu();
            }
        } catch (e) {
            console.error("Error adding menu item:", e);
            alert("Failed to add menu item. Please try again.");
        }
    };

    return (
        <div>
            <h1>Setup Orders Page</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="FoodName">Food Name:</label><br />
                <input 
                    type="text" 
                    id="FoodName" 
                    value={foodName} 
                    onChange={(e) => setFoodName(e.target.value)} 
                    required 
                /><br />
                
                <label htmlFor="Price">Price:</label><br />
                <input 
                    type="number" 
                    min="2" 
                    step="0.01" 
                    id="Price" 
                    value={foodPrice} 
                    onChange={(e) => setFoodPrice(e.target.value)} 
                    required 
                />
                <button 
                    type="button" 
                    onClick={addMenu}
                    disabled={!foodName.trim() || !foodPrice.trim()}
                >
                    Submit
                </button>
            </form>

            <br /><br /><br />
            <h2>Menu Items</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Food Name</th>
                        <th>Price</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {menu.length > 0 ? (
                        menu.map((item) => (
                            <tr key={item._id}>
                                <td>{item.Food_Name}</td>
                                <td>${item.Food_Price.toFixed(2)}</td>
                                <td>
                                    <button onClick={() => deleteMenu(item._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No menu items available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
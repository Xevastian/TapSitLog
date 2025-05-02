import axios from "axios";
import { useState, useEffect } from "react";

export default function SetupOrdersPage() {
    const [menu, setMenu] = useState([]);
    const [foodName, setFoodName] = useState("");
    const [foodPrice, setFoodPrice] = useState("");
    const [foodImage, setFoodImage] = useState();

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

    const onInputChange = (e) => {
        console.log(e.target.files[0]);
        setFoodImage(e.target.files[0]);
    };

    const addMenu = async (e) => {
        e.preventDefault();

        if (!foodName.trim() || !foodPrice.trim() || !foodImage) {
            alert("Please fill in both fields.");
            return;
        }
        const formData = new FormData();
        formData.append("Food_Name", foodName);
        formData.append("Food_Price", foodPrice);
        formData.append("Food_Category", 0);
        formData.append("foodImage", foodImage);

        try {
            const response = await axios.post("http://localhost:5000/menu/addMenu", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log(response.data);

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
                <br/>
                <label htmlFor="Image">Image:</label><br />
                <input 
                    type="file" 
                    accept="image/*"
                    onChange={onInputChange}
                    required 
                />
                <button 
                    type="button" 
                    onClick={addMenu}
                    disabled={!foodName.trim() || !foodPrice.trim() || !foodImage}
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
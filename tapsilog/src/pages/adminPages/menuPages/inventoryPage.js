import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function InventoryPage() {
    const navigate = useNavigate();
    const [inventory, setInventory] = useState([]);
    const [sortBy, setSortBy] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    // Define newInventoryItem state that was missing
    const [newInventoryItem, setNewInventoryItem] = useState({
        Food_Name: "",
        Food_Category: "",
        Instruction: "",
        Items: "",
        Status: "Available" // Default status
    });

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const res = await axios.get("http://localhost:5000/inventory/getInventory");
            if (res.data && res.data.length > 0) {
                setInventory(res.data);
            } else {
                setInventory([]);
            }
        } catch (err) {
            console.error("Error fetching inventory:", err);
            setError("Failed to fetch inventory items.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSort = (type) => {
        setSortBy(type);
        let sorted = [...inventory];
        switch (type) {
            case "category":
                sorted.sort((a, b) => a.Food_Category.localeCompare(b.Food_Category));
                break;
            case "status":
                sorted.sort((a, b) => a.Status.localeCompare(b.Status));
                break;
            default:
                break;
        }
        setInventory(sorted);
    };

    // Add the missing handleAdd function
    const handleAdd = async () => {
        try {
            // Validate inputs
            if (!newInventoryItem.Food_Name || !newInventoryItem.Food_Category) {
                alert("Food name and category are required!");
                return;
            }

            const res = await axios.post("http://localhost:5000/inventory/addInventory", newInventoryItem);
            if (res.data) {
                // Refresh inventory after adding
                fetchInventory();
                // Reset form
                setNewInventoryItem({
                    Food_Name: "",
                    Food_Category: "",
                    Instruction: "",
                    Items: "",
                    Status: "Available"
                });
            }
        } catch (err) {
            console.error("Error adding inventory item:", err);
            alert("Failed to add inventory item.");
        }
    };

    return (
        <div className="inventory-container">
            <h1>Inventory Management</h1>

            {/* Loading State */}
            {isLoading && <p>Loading inventory...</p>}

            {/* Error State */}
            {error && <p className="error-message">{error}</p>}

            {/* Sort Options */}
            <div className="sort-options">
                <label>Sort by:</label>
                <select value={sortBy} onChange={(e) => handleSort(e.target.value)}>
                    <option value="">-- Select --</option>
                    <option value="category">Category</option>
                    <option value="status">Status</option>
                </select>
            </div>

            {/* No Data Available */}
            {inventory.length === 0 && !isLoading && !error && <p>No inventory items available.</p>}

            {/* Inventory Items */}
            <div className="inventory-items">
                {inventory.map((item) => (
                    <div key={item._id} className="inventory-item-card">
                        <h3>{item.Food_Name}</h3>
                        <p><strong>Category:</strong> {item.Food_Category}</p>
                        <p><strong>Status:</strong> {item.Status}</p>
                        <p><strong>Instruction:</strong> {item.Instruction}</p>
                        <p><strong>Items:</strong> {item.Items}</p>
                    </div>
                ))}
            </div>

            {/* Add New Item */}
            <div className="add-inventory-form">
                <h3>Add New Inventory Item</h3>
                <input
                    type="text"
                    placeholder="Food Name"
                    value={newInventoryItem.Food_Name}
                    onChange={(e) => setNewInventoryItem({ ...newInventoryItem, Food_Name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={newInventoryItem.Food_Category}
                    onChange={(e) => setNewInventoryItem({ ...newInventoryItem, Food_Category: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Instruction"
                    value={newInventoryItem.Instruction}
                    onChange={(e) => setNewInventoryItem({ ...newInventoryItem, Instruction: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Items"
                    value={newInventoryItem.Items}
                    onChange={(e) => setNewInventoryItem({ ...newInventoryItem, Items: e.target.value })}
                />
                <select
                    value={newInventoryItem.Status}
                    onChange={(e) => setNewInventoryItem({ ...newInventoryItem, Status: e.target.value })}
                >
                    <option value="Available">Available</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                </select>
                <button onClick={handleAdd}>Add</button>
            </div>
        </div>
    );
}
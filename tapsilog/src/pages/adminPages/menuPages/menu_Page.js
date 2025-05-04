import { useEffect, useState } from "react";
import axios from "axios";

export default function Menu_Page() {
    const [menu, setMenu] = useState([]);
    const [newFood, setNewFood] = useState({ Food_Name: "", Food_Price: "", Food_Category: "" });
    const [imageFile, setImageFile] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [showSortOptions, setShowSortOptions] = useState(false);

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        try {
            const res = await axios.get("http://localhost:5000/menu/getMenu");
            setMenu(res.data);
        } catch (err) {
            console.error("Error fetching menu:", err);
        }
    };

    const handleAdd = async () => {
        if (!newFood.Food_Name.trim() || !newFood.Food_Price || !newFood.Food_Category.trim() || !imageFile) {
            alert("Please fill in all fields and select an image.");
            return;
        }

        const formData = new FormData();
        formData.append("Food_Name", newFood.Food_Name);
        formData.append("Food_Price", newFood.Food_Price);
        formData.append("Food_Category", newFood.Food_Category);
        formData.append("foodImage", imageFile); // 'foodImage' matches the field name in multer

        try {
            const response = await axios.post("http://localhost:5000/menu/addMenu", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (response.status === 201) {
                alert("Menu item added successfully.");
                setNewFood({ Food_Name: "", Food_Price: "", Food_Category: "" });
                setImageFile(null);
                setIsAdding(false);
                fetchMenu();
            }
        } catch (err) {
            console.error("Error adding menu:", err);
            alert("Failed to add menu item.");
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/menu/deleteMenu/${id}`);
            if (res.status === 200) {
                alert("Menu item deleted.");
                fetchMenu();
            }
        } catch (err) {
            console.error("Delete error:", err);
            alert("Delete failed.");
        }
    };

    const handleEdit = (item) => {
        setEditItem({ ...item });
    };

    const handleEditSave = async () => {
        try {
            const res = await axios.put(`http://localhost:5000/menu/updateMenu/${editItem._id}`, editItem);
            if (res.status === 200) {
                setEditItem(null);
                fetchMenu();
            }
        } catch (err) {
            console.error("Update error:", err);
            alert("Update failed.");
        }
    };

    const handleSort = (type) => {
        let sorted = [...menu];
        switch (type) {
            case "price-high": 
                sorted.sort((a, b) => b.Food_Price - a.Food_Price); 
                break;
            case "price-low": 
                sorted.sort((a, b) => a.Food_Price - b.Food_Price); 
                break;
            default: return;
        }
        setMenu(sorted);
    };

    const renderStarRating = (rating) => rating ? <span className="star-rating">★ {rating.toFixed(1)}</span> : null;

    return (
        <div className="menu-container">
            <header className="menu-header">
                <h1>Menu</h1>
                <div className="menu-actions">
                    <button onClick={() => setEditMode(!editMode)}>✏️ Edit</button>
                    <button onClick={() => setShowSortOptions(!showSortOptions)}>Sort By</button>
                </div>
            </header>

            {showSortOptions && (
                <div className="sort-options">
                    <button onClick={() => handleSort("price-high")}>Price (High to Low)</button>
                    <button onClick={() => handleSort("price-low")}>Price (Low to High)</button>
                </div>
            )}

            <div className="menu-table">
                <div className="menu-table-header">
                    <div className="col">Food Name</div>
                    <div className="col">Price</div>
                    <div className="col">Category</div>
                </div>
                {menu.map((item) => (
                    <div key={item._id} className="menu-row">
                        {editItem && editItem._id === item._id ? (
                            <>
                                <div className="col"><input value={editItem.Food_Name} onChange={(e) => setEditItem({ ...editItem, Food_Name: e.target.value })} /></div>
                                <div className="col"><input type="number" value={editItem.Food_Price} onChange={(e) => setEditItem({ ...editItem, Food_Price: parseFloat(e.target.value) || 0 })} /></div>
                                <div className="col"><input value={editItem.Food_Category} onChange={(e) => setEditItem({ ...editItem, Food_Category: e.target.value })} /></div>
                                <div className="col">
                                    <input type="number" step="0.1" value={editItem.rating || ""} onChange={(e) => setEditItem({ ...editItem, rating: parseFloat(e.target.value) || 0 })} />
                                    <div className="edit-actions">
                                        <button onClick={handleEditSave}>Save</button>
                                        <button onClick={() => setEditItem(null)}>Cancel</button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="col">{item.Food_Name}</div>
                                <div className="col">₱{item.Food_Price.toFixed(2)}</div>
                                <div className="col">{item.Food_Category}</div>
                                <div className="col">
                                    {renderStarRating(item.rating)}
                                    {editMode && <button onClick={() => handleEdit(item)}>Edit</button>}
                                    {editMode && <button onClick={() => handleDelete(item._id)}>🗑️</button>}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {isAdding ? (
                <div className="add-item-form">
                    <input placeholder="Food Name" value={newFood.Food_Name} onChange={(e) => setNewFood({ ...newFood, Food_Name: e.target.value })} />
                    <input type="number" placeholder="Price" value={newFood.Food_Price} onChange={(e) => setNewFood({ ...newFood, Food_Price: parseFloat(e.target.value) || "" })} />
                    <input placeholder="Category" value={newFood.Food_Category} onChange={(e) => setNewFood({ ...newFood, Food_Category: e.target.value })} />
                    <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
                    <div className="form-buttons">
                        <button onClick={handleAdd}>Save</button>
                        <button onClick={() => setIsAdding(false)}>Cancel</button>
                    </div>
                </div>
            ) : (
                <button className="add-button" onClick={() => setIsAdding(true)}>+ Add</button>
            )}

            <style jsx>{`
                .menu-container {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 2rem;
                    font-family: Arial, sans-serif;
                }
                .menu-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .menu-actions button {
                    margin-left: 10px;
                    padding: 0.4rem 0.8rem;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                }
                .sort-options {
                    display: flex;
                    gap: 0.5rem;
                    margin: 10px 0;
                }
                .sort-options button {
                    background: #6c757d;
                    color: white;
                    border: none;
                    padding: 6px 12px;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .menu-table {
                    border: 1px solid #ddd;
                    border-radius: 10px;
                    margin-top: 1rem;
                    overflow: hidden;
                }
                .menu-table-header, .menu-row {
                    display: grid;
                    grid-template-columns: 2fr 1fr 1.5fr 2fr;
                    padding: 0.75rem 1rem;
                    border-bottom: 1px solid #eee;
                    align-items: center;
                }
                .menu-table-header {
                    background-color: #f5f5f5;
                    font-weight: bold;
                }
                .menu-row:nth-child(even) {
                    background: #fafafa;
                }
                .menu-row input {
                    width: 90%;
                    padding: 0.3rem;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                }
                .star-rating {
                    color: #f39c12;
                }
                .edit-actions {
                    margin-top: 5px;
                    display: flex;
                    gap: 6px;
                }
                .edit-actions button {
                    padding: 3px 6px;
                    border-radius: 4px;
                    border: none;
                    cursor: pointer;
                }
                .edit-actions button:first-child {
                    background: #28a745;
                    color: white;
                }
                .edit-actions button:last-child {
                    background: #ccc;
                }
                .add-button {
                    margin-top: 1rem;
                    background: none;
                    color: #007bff;
                    font-weight: bold;
                    border: none;
                    cursor: pointer;
                }
                .add-item-form {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-top: 1rem;
                    background: #f8f9fa;
                    padding: 1rem;
                    border-radius: 10px;
                }
                .add-item-form input {
                    padding: 0.5rem;
                    border: 1px solid #ccc;
                    border-radius: 6px;
                    min-width: 200px;
                }
                .form-buttons {
                    display: flex;
                    gap: 10px;
                    width: 100%;
                }
                .form-buttons button {
                    padding: 0.5rem 1rem;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                }
                .form-buttons button:first-child {
                    background: #28a745;
                    color: white;
                }
                .form-buttons button:last-child {
                    background: #ccc;
                }
            `}</style>
        </div>
    );
}

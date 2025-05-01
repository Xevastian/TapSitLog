import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Menu_Page() {
    const navigate = useNavigate();
    const [menu, setMenu] = useState([]);
    const [sortBy, setSortBy] = useState("");
    const [newFood, setNewFood] = useState({
        Food_Name: "",
        Food_Price: "",
        Food_Category: "",
    });
    const [isAdding, setIsAdding] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        fetchMenu();
    }, [sortBy]);

    const fetchMenu = async () => {
        try {
            const res = await axios.get("http://localhost:5000/menu/getMenu");
            setMenu(res.data);
        } catch (err) {
            console.error("Error fetching menu:", err);
        }
    };

    const handleSort = (type) => {
        setSortBy(type);
        let sorted = [...menu];
        switch (type) {
            case "price-high":
                sorted.sort((a, b) => b.Food_Price - a.Food_Price);
                break;
            case "price-low":
                sorted.sort((a, b) => a.Food_Price - b.Food_Price);
                break;
            case "category":
                sorted.sort((a, b) => a.Food_Category.localeCompare(b.Food_Category));
                break;
            case "rating-high":
                sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            default:
                break;
        }
        setMenu(sorted);
    };

    const handleAdd = async () => {
        const formData = new FormData();
        formData.append("Food_Name", newFood.Food_Name);
        formData.append("Food_Price", newFood.Food_Price);
        formData.append("Food_Category", newFood.Food_Category);
        if (imageFile) formData.append("image", imageFile);

        try {
            const response = await axios.post("http://localhost:5000/menu/addMenu", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (response.status === 201) {
                setNewFood({ Food_Name: "", Food_Price: "", Food_Category: "" });
                setImageFile(null);
                setIsAdding(false);
                fetchMenu();
            }
        } catch (err) {
            console.error("Add with image error:", err);
        }
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleEdit = (item) => {
        setEditItem({ ...item });
        navigate(`/edit/${item._id}`);
    };

    const handleEditSave = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/menu/updateMenu/${editItem._id}`, editItem);
            if (response.status === 200) {
                setEditItem(null);
                fetchMenu();
            }
        } catch (err) {
            console.error("Update error:", err);
        }
    };

    const handleEditCancel = () => {
        setEditItem(null);
    };

    const renderStarRating = (rating) => {
        if (!rating) return null;
        return (
            <span className="star-rating">
                ★ {rating.toFixed(1)}
            </span>
        );
    };

    return (
        <div className="menu-container">
            <header className="menu-header">
                <h1>Menu</h1>
                <div className="menu-actions">
                    <button 
                        className="edit-button" 
                        onClick={toggleEditMode}
                    >
                        ✏️ Edit
                    </button>
                    <button 
                        className="sort-button" 
                        onClick={() => {
                            const sortOptions = document.getElementById("sortOptions");
                            sortOptions.style.display = 
                                sortOptions.style.display === "block" ? "none" : "block";
                        }}
                    >
                        Sort By
                    </button>
                    <div id="sortOptions" className="sort-options" style={{ display: "none" }}>
                        <button onClick={() => handleSort("price-high")}>Price (High to Low)</button>
                        <button onClick={() => handleSort("price-low")}>Price (Low to High)</button>
                        <button onClick={() => handleSort("category")}>Category</button>
                        <button onClick={() => handleSort("rating-high")}>Rating</button>
                    </div>
                </div>
            </header>

            <div className="menu-table">
                <div className="menu-table-header">
                    <div className="col food-name">Food Name</div>
                    <div className="col price">Price</div>
                    <div className="col category">Category</div>
                    <div className="col ratings">Ratings</div>
                </div>

                <div className="menu-table-body">
                    {menu.map((item) => (
                        <div key={item._id} className="menu-row">
                            {editItem && editItem._id === item._id ? (
                                <>
                                    <div className="col food-name">
                                        <input
                                            type="text"
                                            value={editItem.Food_Name}
                                            onChange={(e) => setEditItem({...editItem, Food_Name: e.target.value})}
                                        />
                                    </div>
                                    <div className="col price">
                                        <input
                                            type="number"
                                            value={editItem.Food_Price}
                                            onChange={(e) => setEditItem({...editItem, Food_Price: parseFloat(e.target.value) || 0})}
                                        />
                                    </div>
                                    <div className="col category">
                                        <input
                                            type="text"
                                            value={editItem.Food_Category}
                                            onChange={(e) => setEditItem({...editItem, Food_Category: e.target.value})}
                                        />
                                    </div>
                                    <div className="col ratings">
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            value={editItem.rating || ""}
                                            onChange={(e) => setEditItem({...editItem, rating: parseFloat(e.target.value) || 0})}
                                        />
                                        <div className="edit-actions">
                                            <button onClick={handleEditSave}>Save</button>
                                            <button onClick={handleEditCancel}>Cancel</button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="col food-name">{item.Food_Name}</div>
                                    <div className="col price">₱{item.Food_Price.toFixed(2)}</div>
                                    <div className="col category">{item.Food_Category}</div>
                                    <div className="col ratings">
                                        {renderStarRating(item.rating)}
                                        {editMode && (
                                            <button className="edit-item-btn" onClick={() => handleEdit(item)}>Edit</button>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {isAdding ? (
                <div className="add-item-form">
                    <input
                        type="text"
                        placeholder="Food Name"
                        value={newFood.Food_Name}
                        onChange={(e) => setNewFood({ ...newFood, Food_Name: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={newFood.Food_Price}
                        onChange={(e) => setNewFood({ ...newFood, Food_Price: parseFloat(e.target.value) || "" })}
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        value={newFood.Food_Category}
                        onChange={(e) => setNewFood({ ...newFood, Food_Category: e.target.value })}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                    />
                    <div className="form-buttons">
                        <button onClick={handleAdd}>Save</button>
                        <button onClick={() => setIsAdding(false)}>Cancel</button>
                    </div>
                </div>
            ) : (
                <button 
                    className="add-button" 
                    onClick={() => setIsAdding(true)}
                >
                    + Add
                </button>
            )}

            <style jsx>{`
                .menu-container {
                    max-width: 100%;
                    margin: 0 auto;
                    padding: 20px;
                    font-family: Arial, sans-serif;
                }
                
                .menu-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }
                
                .menu-header h1 {
                    font-size: 32px;
                    margin: 0;
                }
                
                .menu-actions {
                    display: flex;
                    gap: 10px;
                    position: relative;
                }
                
                .edit-button, .sort-button {
                    padding: 8px 16px;
                    border-radius: 20px;
                    border: 1px solid #ccc;
                    background: white;
                    cursor: pointer;
                }
                
                .sort-options {
                    position: absolute;
                    right: 0;
                    top: 40px;
                    background: white;
                    border: 1px solid #eee;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    z-index: 10;
                }
                
                .sort-options button {
                    display: block;
                    width: 100%;
                    padding: 8px 16px;
                    text-align: left;
                    border: none;
                    background: none;
                    cursor: pointer;
                }
                
                .sort-options button:hover {
                    background: #f5f5f5;
                }
                
                .menu-table {
                    background: #f5f5f5;
                    border-radius: 12px;
                    overflow: hidden;
                    margin-bottom: 20px;
                }
                
                .menu-table-header {
                    display: flex;
                    padding: 15px;
                    background: #f0f0f0;
                    font-weight: bold;
                }
                
                .menu-row {
                    display: flex;
                    padding: 15px;
                    border-bottom: 1px solid #eee;
                    background: white;
                    margin: 5px 0;
                    border-radius: 8px;
                }
                
                .col {
                    flex: 1;
                }
                
                .food-name {
                    flex: 2;
                }
                
                .star-rating {
                    color: #4a6eb5;
                }
                
                .edit-item-btn {
                    margin-left: 10px;
                    padding: 2px 8px;
                    background: #f0f0f0;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 12px;
                    cursor: pointer;
                }
                
                .edit-actions {
                    display: flex;
                    gap: 8px;
                    margin-top: 8px;
                }
                
                .edit-actions button {
                    padding: 2px 8px;
                    border-radius: 4px;
                    border: none;
                    font-size: 12px;
                    cursor: pointer;
                }
                
                .edit-actions button:first-child {
                    background: #4a6eb5;
                    color: white;
                }
                
                .edit-actions button:last-child {
                    background: #f0f0f0;
                    border: 1px solid #ddd;
                }
                
                .menu-row input {
                    width: 90%;
                    padding: 6px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                }
                
                .add-button {
                    display: inline-block;
                    padding: 8px 16px;
                    border: none;
                    background: none;
                    color: #4a6eb5;
                    font-weight: bold;
                    cursor: pointer;
                }
                
                .add-item-form {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    background: #f5f5f5;
                    padding: 15px;
                    border-radius: 8px;
                }
                
                .add-item-form input {
                    flex: 1;
                    min-width: 200px;
                    padding: 8px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                }
                
                .form-buttons {
                    display: flex;
                    gap: 10px;
                    margin-top: 10px;
                    width: 100%;
                }
                
                .form-buttons button {
                    padding: 8px 16px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                
                .form-buttons button:first-child {
                    background: #4a6eb5;
                    color: white;
                }
                
                .form-buttons button:last-child {
                    background: #f5f5f5;
                    border: 1px solid #ddd;
                }
            `}</style>
        </div>
    );
}

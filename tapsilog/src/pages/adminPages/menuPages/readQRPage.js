import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";

const BarcodeScanner = () => {
  const [scannedId, setScannedId] = useState(null); // Store the scanned barcode ID
  const [order, setOrder] = useState([]); // Store the order items
  const [menus, setMenus] = useState([]); // Store the menu items
  const [manualId, setManualId] = useState(""); // State for manually typed ID

  // Initialize barcode scanner
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "barcode-reader",
      {
        fps: 10,
        qrbox: 250,
        videoConstraints: { facingMode: "environment" },
      },
      false
    );

    scanner.render(
      (decodedText) => {
        setScannedId(decodedText); // Set the scanned barcode ID
      },
      (error) => {
        console.warn("Scan error:", error);
      }
    );

    return () => {
      scanner.clear().catch((err) => console.error("Clear failed:", err));
    };
  }, []);

  // Fetch menu data on component mount
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("http://localhost:5000/menu/getMenu");
        setMenus(response.data);
      } catch (e) {
        console.error("Error fetching menu:", e);
        alert("Failed to fetch menu.");
      }
    };
    fetchMenu();
  }, []);

  // Fetch order data when scannedId changes
  useEffect(() => {
    const fetchOrderById = async (id) => {
      if (!id) return;
      try {
        const response = await axios.get(`http://localhost:5000/order/getCurOrder/${id}`);
        if (response.status === 200) {
          setOrder(response.data.Content || []); // Set the order content
        } else {
          setOrder([]); // Reset order if no data found
        }
      } catch (error) {
        console.error("Failed to fetch order:", error);
        setOrder([]); // Reset order in case of an error
      }
    };

    fetchOrderById(scannedId);
  }, [scannedId]);

  // Add an item to the order
  const addOrder = (foodID) => {
    const food = menus.find(item => item._id === foodID);
    if (!food) return;

    const existingOrderIndex = order.findIndex(item => item._id === foodID);
    if (existingOrderIndex !== -1) {
      const updatedOrder = [...order];
      updatedOrder[existingOrderIndex].quantity += 1;
      setOrder(updatedOrder);
    } else {
      setOrder([...order, { _id: food._id, Food_Name: food.Food_Name, Food_Price: food.Food_Price, quantity: 1 }]);
    }
  };

  // Remove an item from the order
  const removeOrder = (foodID) => {
    const food = order.find(item => item._id === foodID);
    if (!food) return;

    const updatedOrder = food.quantity > 1
      ? order.map(item => item._id === foodID ? { ...item, quantity: item.quantity - 1 } : item)
      : order.filter(item => item._id !== foodID);

    setOrder(updatedOrder);
  };

  // Calculate the total price of the order
  const calculateTotal = () => {
    return order.reduce((total, item) => total + item.Food_Price * item.quantity, 0).toFixed(2);
  };

  // Submit the order
  const submitOrder = async () => {
    try {
      const response = await axios.post("http://localhost:5000/order/addOrder", {
        Content: order,
        Total: calculateTotal(),
        Status: 'paid',
      });
      if (response.status === 201) {
        alert("Order submitted successfully.");
        setOrder([]); // Clear the order after submission
      }
    } catch (e) {
      console.error("Error submitting order:", e);
      alert("Failed to submit order. Please try again.");
    }
  };

  // Handle manual barcode ID input
  const handleManualIdSubmit = () => {
    setScannedId(manualId); // Update the scanned ID with the manually typed ID
  };

  return (
    <div>
      <h2>Barcode Scanner</h2>
      
      {/* Barcode scanner */}
      <div id="barcode-reader" style={{ width: "80%", margin: "0 auto" }} />
      
      {/* Manual barcode input */}
      <div>
        <input
          type="text"
          value={manualId}
          onChange={(e) => setManualId(e.target.value)}
          placeholder="Enter Barcode ID"
        />
        <button onClick={handleManualIdSubmit}>Submit ID</button>
      </div>

      {/* Menu Items */}
      {menus.length > 0 && (
        <div>
          <h3>Menu</h3>
          {menus.map((menu) => (
            <div key={menu._id}>
              <h4>{menu.Food_Name}</h4>
              <p>Price: ${menu.Food_Price.toFixed(2)}</p>
              <button onClick={() => addOrder(menu._id)}>Add to Order</button>
            </div>
          ))}
        </div>
      )}

      {/* Order Summary */}
      {order.length > 0 && (
        <div>
          <h3>Order Summary</h3>
          {order.map((item) => (
            <div key={item._id} style={{ marginBottom: "10px" }}>
              <p>{item.Food_Name}: {item.quantity} x ${item.Food_Price.toFixed(2)}</p>
              <button onClick={() => removeOrder(item._id)}>Remove</button>
            </div>
          ))}
          <h4>Total: ${calculateTotal()}</h4>
          <button onClick={submitOrder}>Submit Order</button>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;

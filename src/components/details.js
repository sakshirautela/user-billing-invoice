export default function AddDetails({ items, updateInvoiceData }) {
  const handleItemChange = (index, field, value) => {
    updateInvoiceData((prev) => {
      const updatedItems = [...prev.items];
      updatedItems[index][field] = field === "name" ? value : parseFloat(value) || 0;
      const subtotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return {
        ...prev,
        items: updatedItems,
        total: subtotal ,
      };
    });
  };

  const handleAddItem = () => {
    updateInvoiceData((prev) => {
      const hasInvalidItem = prev.items.some(
        (item) => !item.name || item.price <= 0 || item.quantity <= 0
      );
      if (hasInvalidItem) {
        alert("Please fill out all fields correctly before adding a new item.");
        return prev;
      }
      return {
        ...prev,
        items: [...prev.items, { name: "", price: '', quantity: '' }],
      };
    });
  };

  const removeItem = (index) => {
    updateInvoiceData((prev) => {
      const updatedItems = prev.items.filter((_, i) => i !== index);
      const subtotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return {
        ...prev,
        items: updatedItems,
        total: subtotal ,
      };
    });
  };

  const handleGstChange = (rate) => {
    updateInvoiceData((prev) => {
      const gstRate = parseFloat(rate);
      const subtotal = prev.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return {
        ...prev,
        gst: gstRate,
        total: subtotal ,
      };
    });
  };

  return (
    <>
      <h1>-----Billing Invoice-----</h1>
      <input
        type="text"
        placeholder="Customer Name"
        onChange={(e) =>
          updateInvoiceData((prev) => ({ ...prev, customerName: e.target.value }))
        }
      />
      <br />
      <input
        type="text"
        placeholder="Address"
        onChange={(e) =>
          updateInvoiceData((prev) => ({ ...prev, address: e.target.value }))
        }
      />
      <br />

      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, "name", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, "price", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => removeItem(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddItem}>Add Item</button>
      <br />

      <h3>GST:</h3>
      {[18, 0.25, 5, 12, 28].map((rate) => (
        <label key={rate} style={{ marginRight: "10px" }}>
          <input
            type="radio"
            name="gst"
            value={rate}
            onChange={(e) => handleGstChange(e.target.value)}
          />{" "}
          {rate}%
        </label>
      ))}
    </>
  );
}

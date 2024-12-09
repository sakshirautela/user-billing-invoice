import { useState } from "react";
export default function AddDetails({ invoiceData, invoiceItem, updateInvoiceData, idx, isEdit ,update,cancel}) {
  const [item, setItem] = useState(invoiceItem.name || '');
  console.log(item);
  const [price, setPrice] = useState(invoiceItem.price || 0);
  console.log(price);

  const [quantity, setQuantity] = useState(invoiceItem.quantity || 0);

  const handleAddItem = () => {
    if (item.trim() === "" || price < 0 || quantity < 0) {
      alert("Please enter valid item details.");
      return;
    }
    const newItem = {
      id: idx++,
      name: item,
      price: price,
      quantity: quantity,
    };
    updateInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, newItem],

    }));
    setItem('');
    setPrice(0);
    setQuantity(0);
  };
  return (
    <>
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
          <tr >
            <td>
              <input
                type="text" value={item} onChange={(val) => setItem(val.target.value)}
              />
            </td>
            <td>
              <input
                type="number" value={price} onChange={(val) => setPrice(val.target.value)}
              />
            </td>
            <td>
              <input
                type="number" value={quantity} onChange={(val) => setQuantity(val.target.value)}
              />
            </td>
            <td>
            </td>
          </tr>
        </tbody>
      </table>
      {(isEdit) ? (
        <>
          <button onClick={update}>update</button>
          <button onClick={cancel}>cancel</button>
        </>
      ) : (<button onClick={handleAddItem}>add</button>
      )}
      {/* <button onClick={handleAddItem}>{isEdit?"Update":"Add Item"}</button> */}
      {/* {isEdit && <button onClick={handleAddItem}>cancel</button>} */}
      {/* <button onClick={handleAddItem}>Add Item</button> */}

      {/* <h3>GST:</h3>
      {[18, 0.25, 5, 12, 28,0].map((rate) => (
        <label key={rate} style={{ marginRight: "10px" }}>
          <input
            type="radio"
            name="gst"
            value={rate}
            onChange={(e) => handleGstChange(e.target.value)}
          />{" "}
          {rate}%
        </label>
      ))} */}
    </>
  );
}

import { useState } from "react";
export default function EditDetails({ itemEdit, Update, Cancel }){
    const [item, setItem] = useState(itemEdit.name );
  const [price, setPrice] = useState(itemEdit.price );
  const [quantity, setQuantity] = useState(itemEdit.quantity );
  const handleUpdate = () => {
    if (item.trim() === "" || price <= 0 || quantity <= 0) {
        alert("Please enter valid item details.");
        return;
      }
    Update({
      id: itemEdit.id,
      name: item,
      price: price,
      quantity: quantity,
    });
  };
    return(
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
                type="text" onChange={(val) => setItem(val.target.value)}
              />
            </td>
            <td>
              <input
                type="number" onChange={(val) => setPrice(val.target.value)}
              />
            </td>
            <td>
              <input
                type="number" onChange={(val) => setQuantity(val.target.value)}
              />
            </td>
            <td>
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleUpdate}>update</button>
      <button onClick={Cancel}>cancle</button>
        </>
    )
}
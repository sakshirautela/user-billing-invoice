import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import ShowDetails from './components/showdetails'

export default function App() {
  const [invoiceItem, setInvoiceItem] = useState({ name: "", price: "", quantity: "" });
  const [invoiceData, setInvoiceData] = useState({
    items: [],
    total: 0,
  });
  const [gst, setGst] = useState(18);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null); 
  const [customerDetails, setCustomerDetails] = useState({ customerName: "", address: "" });

  const AddOrUpdateItem = () => {
    if (isEdit && editIndex !== null) {
      setInvoiceData((prev) => ({
        ...prev,
        items: prev.items.map((item, index) =>
          index === editIndex ? { ...invoiceItem } : item
        ),
      }));
    } else {
      setInvoiceData((prev) => ({
        ...prev,
        items: [...prev.items, invoiceItem],
      }));
    }
    setInvoiceItem({ name: "", price: "", quantity: "" });
    setIsEdit(false);
    setEditIndex(null);
  };

  const Edit = (index) => {
    setIsEdit(true);
    setEditIndex(index);
    setInvoiceItem(invoiceData.items[index]); 
    console.log(invoiceData.items[index])
  };

  const Delete = (index) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.filter((data, i) => i !== index),
    }));
  };
  const Cancel=()=>{
    setInvoiceItem({ name: "", price: "", quantity: "" });
    setIsEdit(false);
    setEditIndex(null);
  }

  return (
    <>
      <div className="background-image">
        <div className="split left">
          <div className="centered">
            <h1>-----Billing Invoice-----</h1>
            <input
              type="text"
              placeholder="Customer Name"
              value={customerDetails.customerName}
              onChange={(val) =>
                setCustomerDetails({ ...customerDetails, customerName: val.target.value })
              }
            />
            <br />
            <input
              type="text"
              placeholder="Address"
              value={customerDetails.address}
              onChange={(val) =>
                setCustomerDetails({ ...customerDetails, address: val.target.value })
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
                <tr>
                  <td>
                    <input
                      type="text"
                      value={invoiceItem.name }
                      onChange={(e) => setInvoiceItem({ ...invoiceItem, name: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={invoiceItem.price}
                      onChange={(e) =>
                        setInvoiceItem({ ...invoiceItem, price: parseFloat(e.target.value)  })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={invoiceItem.quantity}
                      onChange={(e) =>
                        setInvoiceItem({ ...invoiceItem, quantity: parseInt(e.target.value) })
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button onClick={AddOrUpdateItem}>{isEdit ? "Update" : "Add"}</button>
            {isEdit && <button onClick={Cancel}>Cancel</button>}
          </div>
        </div>

        <div className="split right">
          <div className="centered">
            <ShowDetails
              items={invoiceData.items}
              customerDetails={customerDetails}
              sum={invoiceData.items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              )}
              gst={gst}
              Edit={Edit}
              Delete={Delete}
            />
          </div>
        </div>
      </div>
    </>
  );
}  
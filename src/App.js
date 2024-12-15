import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import ShowDetails from "./components/showdetails";

export default function App() {
  const [invoiceItem, setInvoiceItem] = useState({
    name: "",
    price: "",
    quantity: "",
  });
  const gstOptions = [0, 0.25, 5, 18, 12, 28];
  const [invoiceNumber, setInvoiceNumber] = useState();
  
  const [invoiceData, setInvoiceData] = useState({
    items: [],
    total: 0,
  });
  const [gst, setGst] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [dates, setDates] = useState({ start: "", end: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [customerDetails, setCustomerDetails] = useState({
    customerName: "",
    address: "",
    phone: "",
  });

  const AddOrUpdateItem = () => {
    if (
      invoiceItem.name === "" ||
      invoiceItem.price <= 0 ||
      invoiceItem.quantity <= 0
    ) {
      alert("enter valid  details");
      return;
    }
    if (isEdit && editIndex !== null) {
      setInvoiceData((prev) => ({
        ...prev,
        items: prev.items.map((item, index) =>
          index === editIndex ? { ...invoiceItem } : item
        ),
      }));
    } else {
      const isDuplicate = invoiceData.items.some(
        (item) => item.name === invoiceItem.name
      );
      if (isDuplicate) {
        alert("Item already exists");
        return;
      }

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
    console.log(invoiceData.items[index]);
  };

  const Delete = (index) => {
    const todelete = invoiceData.items[index];
    if (
      invoiceItem.name === todelete.name &&
      invoiceItem.price === todelete.price &&
      invoiceItem.quantity === todelete.quantity
    ) {
      setInvoiceItem({ name: "", price: "", quantity: "" });
      setIsEdit(false);
      setEditIndex(null);
    }
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const Cancel = () => {
    setInvoiceItem({ name: "", price: "", quantity: "" });
    setIsEdit(false);
    setEditIndex(null);
  };

  return (
    <>
      <div className="background-image">
        <div className="split left">
          <div className="centered">
            <h1>-----Billing Invoice-----</h1>
            <h5>Name :</h5>

            <input
              type="text"
              placeholder="Customer Name"
              value={customerDetails.customerName}
              onChange={(val) =>
                setCustomerDetails({
                  ...customerDetails,
                  customerName: val.target.value,
                })
              }
            />
            <br />
            <h5>Phone :</h5>

            <input
              type="tel"
              pattern="[6-9]{1}[0-9]{9}"
              placeholder="Phone Number"
              value={customerDetails.phone}
              onChange={(val) =>
                setCustomerDetails({
                  ...customerDetails,
                  phone: val.target.value,
                })
              }
            />
            <br />
            <h5>Address :</h5>
            <input
              type="text"
              placeholder="Address"
              value={customerDetails.address}
              onChange={(val) =>
                setCustomerDetails({
                  ...customerDetails,
                  address: val.target.value,
                })
              }
            />
            <br />
            <h5>Date : </h5>
            <p>Start
            <input
              type="date"
              placeholder="Start"
              value={dates.start}
              onChange={(val) =>
                setDates({ ...dates, start: val.target.value })
              }
            />
            </p>
            End

            <input
              type="date"
              placeholder="End"
              value={dates.end}
              onChange={(val) => setDates({ ...dates, end: val.target.value })}
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
                      value={invoiceItem.name}
                      onChange={(e) =>
                        setInvoiceItem({ ...invoiceItem, name: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={invoiceItem.price}
                      onChange={(e) =>
                        setInvoiceItem({
                          ...invoiceItem,
                          price: parseFloat(e.target.value),
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={invoiceItem.quantity}
                      onChange={(e) =>
                        setInvoiceItem({
                          ...invoiceItem,
                          quantity: parseInt(e.target.value),
                        })
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="success" onClick={AddOrUpdateItem}>
              {isEdit ? "Update" : "Add"}
            </button>
            {isEdit && (
              <button className="cancel" onClick={Cancel}>
                Cancel
              </button>
            )}
            <h3>Select GST</h3>
            {gstOptions.map((value, index) => (
              <label>
                <input
                  type="radio"
                  value={value}
                  checked={gst === value}
                  onChange={() => setGst(value)}
                />
                {value}%
              </label>
            ))}
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
              invoiceNumber={invoiceNumber}
              setInvoiceNumber={setInvoiceNumber}
              dates={dates}
            />
          </div>
        </div>
      </div>
    </>
  );
}

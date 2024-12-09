import React, { useState } from "react";
import AddDetails from "./components/details";
import EditDetails from "./components/editDetails";
import ShowDetails from "./components/showdetails";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  // const [invoiceData, setInvoiceData] = useState({
  //   customerName: "",
  //   address: "",
  //   items: [{ name: "", price: 0, quantity: 0,id:0 }],
  //   gst: 18,
  //   total: 0,
  // });

  const [invoiceItem, setInvoiceItem] = useState({ name: "", price: '', quantity: '', id: 0 })
  const [invoiceData, setInvoiceData] = useState({
    items: [],
    total: 0,
  })
  const [gst, setGst] = useState(18);
  const [isEdit, setIsEdit] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({ customerName: "", address: "" });
  const Update = (updatedItem) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    }));
    setIsEdit(false);
  };
  const Edit=(item)=>{
    setIsEdit(true);
    setInvoiceItem({name:item.name,price:item.price,quantity:item.quantity,id:5});
    console.log(item)
    console.log(invoiceItem)
  }
  const Delete = (id) => {
    const updated = invoiceData.items.filter((items, index) => index !== id)
    setInvoiceData(updated)
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
              onChange={(val) => setCustomerDetails({ ...customerDetails, customerName: val.target.value })}
            />
            <br />
            <input
              type="text"
              placeholder="Address"
              value={customerDetails.address}
              onChange={(val) => setCustomerDetails({ ...customerDetails, address: val.target.value })}
            />
            <br />
            {/* {isEdit ? (
              <EditDetails itemEdit={invoiceItem}
                Update={Update}
                Cancel={() => setIsEdit(false)} />
            ) : ( */}
              <AddDetails
                invoiceData={invoiceData}
                invoiceItem={invoiceItem}
                updateInvoiceData={(updateFunc) =>
                  setInvoiceData((prev) => updateFunc(prev))
                }
                idx={0}
                isEdit={isEdit}
                update={Update}
                Cancel={() => setIsEdit(false)}
              />
            {/* )} */}
          </div>
        </div>

        <div className="split right">
          <div className="centered" >
            <ShowDetails items={invoiceData.items} customerDetails={customerDetails} sum={invoiceData.total} gst={gst} Edit={Edit} Delete={Delete}
            />
          </div>
        </div>
      </div>

    </>
  );
}

export default App;

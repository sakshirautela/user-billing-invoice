import React, { useState, useRef } from "react";
import AddDetails from "./components/details";
import ShowDetails from "./components/showdetails";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { useReactToPrint } from "react-to-print";

function App() {
  const componentRef = useRef();

  const handlToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [invoiceData, setInvoiceData] = useState({
    customerName: "",
    address: "",
    items: [{ name: "", price: '', quantity: '' }],
    gst: 0,
    total: 0,
  });

  return (
    <>
    <div class="background-image">
      <div className="split left">
        <div className="centered">
          <AddDetails
            items={invoiceData.items}
            updateInvoiceData={(updateFunc) =>
              setInvoiceData((prev) => updateFunc(prev))
            }
          />
        </div>
      </div>

      <div className="split right">
        <div className="centered" ref={componentRef}>
          <ShowDetails
            items={invoiceData.items}
            name={invoiceData.customerName}
            address={invoiceData.address}
            sum={invoiceData.total}
            gst={invoiceData.gst}
          />
          <button onClick={handlToPrint}>Print</button>
        </div>
      </div>
      </div>
    </>
  );
}

export default App;

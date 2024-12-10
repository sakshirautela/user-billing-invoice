import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
export default function ShowDetails({ items, customerDetails, sum, gst, Edit, Delete }) {
  const [showAction,setShowAction]=useState(true);
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforePrint:()=>setShowAction(false),
    onAfterPrint:()=>setShowAction(true),
  })
  const total = sum + (gst * sum) / 100;

  return (
    <>
    <style>
        {`
          @media print {
            .ButtonSlide {
              display: none !important;
            }
          }
        `}
      </style>
      <div >
        <div ref={componentRef}>
          <h1>Invoice</h1>
          <p>Name: {customerDetails.customerName}</p>
          <p>Address: {customerDetails.address}</p>
          <table style={{ border: '3px dotted black', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Price </th>
                <th>Quantity </th>
                <th>Total (Price*Quantity) </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>₹{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>₹{(item.price * item.quantity)}</td>
                    <td >
                      {showAction && <div className="ButtonSlide">
                          <button className="edit" onClick={() => Edit(index)}>
                            <EditNoteOutlinedIcon />
                          </button>
                          <button className="delete" onClick={() => Delete(index)}>
                            <DeleteForeverOutlinedIcon />
                          </button>
                      </div>}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No items available</td>
                </tr>
              )}
              <tr>
                <td>Sub Total:</td>
                <td></td>
                <td></td>
                <td>{sum}</td>
                <td></td>
              </tr>
              <tr>
                <td>GST:</td>
                <td></td>
                <td></td>
                <td>{gst}%</td>
                <td></td>
              </tr>
              <tr>
                <td>Total:</td>
                <td></td>
                <td></td>
                <td>{total}</td>
                <td></td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>

     { (items.length>0 && <button className="success" onClick={handlePrint}><LocalPrintshopOutlinedIcon /></button>)}

    </>

  );
}

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
export default function ShowDetails({ items, customerDetails, sum, gst, Edit, Delete }) {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })
  const total = sum + (gst * sum) / 100;

  return (
    <>
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
                      <div className="HoverConatiner">
                      <div className="ButtonSlide">
                          <button className="Hover" onClick={() => Edit(index)}>
                            <EditNoteOutlinedIcon />
                          </button>
                          <button className="Hover" onClick={() => Delete(index)}>
                            <DeleteForeverOutlinedIcon />
                          </button>
                        </div>
                      </div>
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
                <td>{sum}</td>
              </tr>
              <tr>
                <td>GST:</td>
                <td>{gst}%</td>
              </tr>
              <tr>
                <td>Total:</td>
                <td>{total}</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>

      <button onClick={handlePrint}><LocalPrintshopOutlinedIcon /></button>

    </>

  );
}

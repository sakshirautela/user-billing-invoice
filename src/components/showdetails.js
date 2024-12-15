import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
export default function ShowDetails({
  items,
  customerDetails,
  sum,
  gst,
  Edit,
  Delete,
  invoiceNumber,
  setInvoiceNumber,
  dates,
}) {
  const currentDate = new Date();
  const date = `${currentDate.getFullYear()}${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${currentDate.getDate().toString().padStart(2, "0")}`;

  const time = `${currentDate
    .getHours()
    .toString()
    .padStart(2, "0")}${currentDate
    .getMinutes()
    .toString()
    .padStart(2, "0")}${currentDate.getSeconds().toString().padStart(2, "0")}`;

  const invoice = `${date}${time}`;
  setInvoiceNumber(invoice);
  const [showAction, setShowAction] = useState(true);
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: customerDetails.customerName + invoiceNumber,
    onBeforePrint: () => {
      setShowAction(false);
    },
    onAfterPrint: () => setShowAction(true),
  });
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
      <div>
        <div ref={componentRef}>
          <h1>Invoice</h1>
          <p>Invoice no. : {invoiceNumber}</p>
          <p>
            <b>Name:</b> {customerDetails.customerName}
          </p>
          <p>
            <b>Phone:</b> {customerDetails.phone}
          </p>
          <p>
            <b>Address:</b> {customerDetails.address}
          </p>
          <p>
             Ordered : {dates.start} {"        ____    "} Order Delivered :{" "}
            {dates.end}
          </p>
          <table
            style={{ border: "3px dotted black", borderCollapse: "collapse" }}
          >
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
                    <td>₹{item.price * item.quantity}</td>
                    <td>
                      {showAction && (
                        <div className="ButtonSlide">
                          <button className="edit" onClick={() => Edit(index)}>
                            <EditNoteOutlinedIcon />
                          </button>
                          <button
                            className="delete"
                            onClick={() => Delete(index)}
                          >
                            <DeleteForeverOutlinedIcon />
                          </button>
                        </div>
                      )}
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

      {items.length > 0 && (
        <button className="success" onClick={handlePrint}>
          <LocalPrintshopOutlinedIcon />
        </button>
      )}
    </>
  );
}

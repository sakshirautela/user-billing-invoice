export default function ShowDetails({ items, name, address, sum, gst }) {
    const total = sum + (gst*sum)/100;
    return (
      <>
        <h1>Invoice</h1>
        <p>Name: {name}</p>
        <p>Address: {address}</p>
        <table style={{ border: '1px dotted black', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Price (Quantity * Price)</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity} x {item.price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No items available</td>
              </tr>
            )}
            <tr>
              <td>Sub Total:</td>
              <td>{sum }</td> {/* Ensure subtotal is not negative */}
            </tr>
            <tr>
              <td>GST:</td>
              <td>{gst }</td> {/* Ensure GST is not negative */}
            </tr>
            <tr>
              <td>Total:</td>
              <td>{total }</td> {/* Ensure total is not negative */}
            </tr>
          </tbody>
        </table>
      </>
    );
  }
  
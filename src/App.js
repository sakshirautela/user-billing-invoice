import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const ComponentToPrint = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <h1>Invoice</h1>
    <p>Customer Name: John Doe</p>
    <p>Address: 123 Main St</p>
    <p>Total: $100</p>
  </div>
));

function App() {
  const componentRef = useRef();

  const handleToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <ComponentToPrint ref={componentRef} />
      <button onClick={handleToPrint}>Print</button>
    </div>
  );
}

export default App;

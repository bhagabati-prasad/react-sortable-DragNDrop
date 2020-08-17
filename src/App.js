import React from "react";
import "./App.css";
import DragNDrop from "./components/DragNDrop";

const data = [
  { title: "group 1", items: ["1", "2"] },
  { title: "group 2", items: ["3", "4", "5"] },
];

function App() {
  return (
    <>
      <DragNDrop data={data} />
    </>
  );
}

export default App;

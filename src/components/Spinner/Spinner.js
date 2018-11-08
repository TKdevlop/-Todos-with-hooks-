import React from "react";
import "./spinner.css";
export default function Spinner() {
  return (
    <div style={{ marginLeft: "44vw", marginTop: "30vh" }}>
      <div class="lds-ripple">
        <div />
        <div />
      </div>
    </div>
  );
}

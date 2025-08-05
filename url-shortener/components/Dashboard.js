import React from "react";
import ShortenerForm from "./ShortenerForm";

export default function Dashboard() {
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>URL Shortener</h2>
      <ShortenerForm />
    </div>
  );
}

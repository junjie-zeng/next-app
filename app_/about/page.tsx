"use client";

import { useEffect, useState } from "react";

const SSRPage = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/api/about/1");
      const data = await res.json();
      setData(data);
    };
    fetchData();
  });

  return (
    <div>
      <h1>Server Side Rendered Page</h1>
      <p>Data: {JSON.stringify(data)}</p>
      <button
        onClick={() => {
          console.log("clicked");
        }}
      >
        点击
      </button>
    </div>
  );
};

export default SSRPage;

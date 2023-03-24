import React from "react";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ textAlign: "start", padding: "10px 20px" }}>
        <h1 style={{ color: "navy", textTransform: "uppercase" }}>Home Page</h1>
        <p>
          Our website offers a wide range of courses, tutorials, and resources
          in various subject areas, including business, technology, healthcare,
          education, arts, and more. Our team of expert educators and industry
          professionals have developed our content to provide you with the most
          up-to-date and relevant information.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;

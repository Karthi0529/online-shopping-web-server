import React, { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../Components/Navbar";
import Card from "../Components/Card";

const Dashboard = ({ setIsLoggedIn }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    totalStock: 0,
    totalValue: 0,
  });
  const [showViewModal, setShowViewModal] = useState(false);

  // ✅ Fetch Dashboard Data and Products
  useEffect(() => {
    API.get("/dashboard").then((res) => {
      const data = res.data;
      setCategories(data.categories || []);
      setDashboardData({
        totalProducts: data.totalProducts || 0,
        totalStock: data.totalItems || 0,
        totalValue: data.totalValue || 0,
      });
    });

    // To populate modal with product list
    API.get("/products").then((res) => setProducts(res.data || []));
  }, []);

  return (
    <div>
      <Navbar setIsLoggedIn={setIsLoggedIn} />
      <div style={{ padding: "20px" }}>
        <h2 style={{ marginBottom: "20px" }}>Dashboard</h2>

        {/* ✅ Summary Cards */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "30px",
          }}
        >
          <Card
            title="Total Products"
            value={dashboardData.totalProducts}
            icon="🛒"
            bgColor="#3b82f6"
          />
          <Card
            title="Total Stock"
            value={dashboardData.totalStock}
            icon="📦"
            bgColor="#10b981"
          />
          <Card
            title="Total Value"
            value={`₹${dashboardData.totalValue}`}
            icon="💰"
            bgColor="#f59e0b"
          />
        </div>

        {/* 👁️ View Products Button */}
        <div style={{ marginBottom: "20px" }}>
          <button
            onClick={() => setShowViewModal(true)}
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            👁️ View Products
          </button>
        </div>

        {/* 🎨 Modal Styles */}
        <style>
          {`
            .modal-overlay {
              position: fixed;
              top: 0; left: 0;
              width: 100%; height: 100%;
              background: rgba(0, 0, 0, 0.5);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 1000;
            }
            .modal-content {
              background: white;
              padding: 25px;
              border-radius: 10px;
              width: 80%;
              max-width: 800px;
              box-shadow: 0 4px 20px rgba(0,0,0,0.2);
              animation: fadeIn 0.3s ease;
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
            }
          `}
        </style>

        {/* 📋 View Products Modal */}
        {showViewModal && (
          <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Product List</h3>
              <table
                style={{
                  marginTop: "10px",
                  width: "100%",
                  borderCollapse: "collapse",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  backgroundColor: "white",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#3b82f6", color: "white", textAlign: "left" }}>
                    <th style={{ padding: "12px" }}>ID</th>
                    <th style={{ padding: "12px" }}>Name</th>
                    <th style={{ padding: "12px" }}>Price (₹)</th>
                    <th style={{ padding: "12px" }}>Stock</th>
                    <th style={{ padding: "12px" }}>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, index) => (
                    <tr
                      key={p.productId}
                      style={{
                        backgroundColor: index % 2 === 0 ? "#f9fafb" : "#ffffff",
                        transition: "0.2s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#e0f2fe")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          index % 2 === 0 ? "#f9fafb" : "#ffffff")
                      }
                    >
                      <td style={{ padding: "10px 12px" }}>{p.productId}</td>
                      <td style={{ padding: "10px 12px" }}>{p.productName}</td>
                      <td style={{ padding: "10px 12px" }}>₹{p.productPrice}</td>
                      <td style={{ padding: "10px 12px" }}>{p.totalItems}</td>
                      <td style={{ padding: "10px 12px" }}>
                        {p.category?.categoryName || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

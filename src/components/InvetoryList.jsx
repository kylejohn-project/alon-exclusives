import React, { useMemo, useState } from "react";

const InventoryList = ({
  inventories,
  loading
}) => {
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-80 gap-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-base-content/60">
          Loading data...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 m-4">
        <h1 className="text-2xl font-bold">Inventory</h1>
      </div>

      {/* Table */}
      <div className="overflow-x-auto m-4 border border-base-content/5 bg-base-50 rounded-lg">
        <table className="table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Color</th>
              <th>Size</th>
              <th>Stocks</th>
              <th>Reserved</th>
              <th>Available</th>
            </tr>
          </thead>

          <tbody>
            {inventories.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-8">
                 "No stocks found."
                </td>
              </tr>
            ) : (
              inventories.map((inventory) => (
                <tr key={inventory.id} className="hover:bg-base-300">
                    <td>{inventory.productid}</td>
                    <td>{inventory.color}</td>
                    <td>{inventory.size}</td>
                    <td>{inventory.stocks}</td>
                    <td>{inventory.reserved}</td>
                    <td>{inventory.available}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryList;
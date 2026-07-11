import React from "react";

const TableList = ({
  orders,
  loading,
  onAdd,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return <p className="m-4">Loading data...</p>;
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center m-4">
        <h1 className="text-2xl font-bold">Orders</h1>

        <button className="btn btn-primary" onClick={onAdd}>
          Add Order
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto m-4 border border-base-content/5 bg-base-50 rounded-lg">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Size</th>
              <th>Is Paid</th>
              <th>Amount</th>
              <th>Date Ordered</th>
              <th>Order From</th>
              <th>Delivered</th>
              <th>Notes</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-8">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-base-300">
                  <td>{order.id}</td>
                  <td>{order.name}</td>
                  <td>{order.size}</td>

                  <td>
                    <span
                      className={`badge ${
                        order.ispaid ? "badge-success" : "badge-error"
                      }`}
                    >
                      {order.ispaid ? "Yes" : "No"}
                    </span>
                  </td>

                  <td>₱{Number(order.amount).toLocaleString()}</td>

                  <td>{order.dateordered}</td>

                  <td>{order.orderfrom}</td>

                  <td>
                    <span
                      className={`badge ${
                        order.isdelivered
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {order.isdelivered ? "Yes" : "No"}
                    </span>
                  </td>

                  <td>{order.notes || "-"}</td>

                  <td>
                    <div className="flex justify-center gap-2">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => onEdit(order)}
                      >
                        Update
                      </button>

                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => onDelete(order)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableList;
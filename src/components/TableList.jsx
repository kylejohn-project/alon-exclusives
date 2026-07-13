import React, { useMemo, useState } from "react";

const TableList = ({
  orders,
  loading,
  onAdd,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-80 gap-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-base-content/60">
          Loading orders...
        </p>
      </div>
    );
  }

  const [search, setSearch] = useState("");
  const [paidFilter, setPaidFilter] = useState("all");
  const [deliveredFilter, setDeliveredFilter] = useState("all");

  const filteredOrders = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return orders.filter((order) => {
      // Search filter
      const matchesSearch =
        !keyword ||
        String(order.id).toLowerCase().includes(keyword) ||
        String(order.name).toLowerCase().includes(keyword) ||
        String(order.size).toLowerCase().includes(keyword) ||
        String(order.amount).toLowerCase().includes(keyword) ||
        String(order.orderfrom).toLowerCase().includes(keyword) ||
        String(order.notes ?? "").toLowerCase().includes(keyword) ||
        String(order.dateordered).toLowerCase().includes(keyword);

      // Paid filter
      const matchesPaid =
        paidFilter === "all" ||
        String(order.ispaid) === paidFilter;

      // Delivered filter
      const matchesDelivered =
        deliveredFilter === "all" ||
        String(order.isdelivered) === deliveredFilter;

      return matchesSearch && matchesPaid && matchesDelivered;
    });
  }, [orders, search, paidFilter, deliveredFilter]);

  return (
    <div className="w-full p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 m-4">
        <h1 className="text-2xl font-bold">Orders</h1>

        <div className="flex gap-2">

          <label className="input input-bordered flex items-center gap-2 w-72">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 opacity-70"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>

          <select
            className="select select-bordered w-28"
            value={paidFilter}
            onChange={(e) => setPaidFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="true">Paid</option>
            <option value="false">Unpaid</option>
          </select>

          <select
            className="select select-bordered w-28"
            value={deliveredFilter}
            onChange={(e) => setDeliveredFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="true">Delivered</option>
            <option value="false">Not Delivered</option>
          </select>

        </div>
        <button
            className="btn btn-primary"
            onClick={onAdd}
          >
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
                  {search
                    ? "No matching orders found."
                    : "No orders found."}
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
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
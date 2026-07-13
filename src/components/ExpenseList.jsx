import React, { useMemo, useState } from "react";

const ExpenseList = ({
  expenses,
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
          Loading data...
        </p>
      </div>
    );
  }

  const [search, setSearch] = useState("");
  const [paidFilter, setPaidFilter] = useState("all");

  const filteredExpenses = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return expenses.filter((expense) => {
      // Search filter
      const matchesSearch =
        !keyword ||
        String(expense.id).toLowerCase().includes(keyword) ||
        String(expense.name).toLowerCase().includes(keyword) ||
        String(expense.amount).toLowerCase().includes(keyword) ||
        String(expense.notes ?? "").toLowerCase().includes(keyword) ||
        String(expense.date).toLowerCase().includes(keyword);

      // Paid filter
      const matchesPaid =
        paidFilter === "all" ||
        String(expense.ispaid) === paidFilter;

      return matchesSearch && matchesPaid;
    });
  }, [expenses, search, paidFilter ]);

  return (
    <div className="w-full p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 m-4">
        <h1 className="text-2xl font-bold">Expenses</h1>

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

        </div>
        <button
            className="btn btn-primary"
            onClick={onAdd}
          >
            Add Expense
          </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto m-4 border border-base-content/5 bg-base-50 rounded-lg">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Is Paid</th>
              <th>Notes</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-8">
                  {search
                    ? "No matching expenses found."
                    : "No expenses found."}
                </td>
              </tr>
            ) : (
              filteredExpenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-base-300">
                  <td>{expense.id}</td>
                  <td>{expense.name}</td>
                  <td>₱{Number(expense.amount).toLocaleString()}</td>
                  <td>{expense.date}</td>

                  <td>
                    <span
                      className={`badge ${
                        expense.ispaid ? "badge-success" : "badge-error"
                      }`}
                    >
                      {expense.ispaid ? "Yes" : "No"}
                    </span>
                  </td>

                  <td>{expense.notes || "-"}</td>

                  <td>
                    <div className="flex justify-center gap-2">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => onEdit(expense)}
                      >
                        Update
                      </button>

                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => onDelete(expense)}
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

export default ExpenseList;
import React, { useEffect, useState } from "react";

const initialForm = {
  id: "",
  name: "",
  amount: "",
  date: false,
  ispaid: false,
  notes: "",
};

const ModalForm = ({
  isOpen,
  onClose,
  modalType,
  expense,
  onSubmit,
}) => {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (modalType === "edit" && expense) {
      setFormData({
        id: expense.id,
        name: expense.name || "",
        amount: expense.amount || "",
        date: expense.date || "",
        ispaid: Boolean(expense.ispaid),
        notes: expense.notes || "",
      });
    } else {
      setFormData({
        ...initialForm,
        date: new Date().toISOString().split("T")[0],
      });
    }
  }, [modalType, expense, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        value === "Yes"
          ? true
          : value === "No"
          ? false
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (!formData.name.trim()) {
      alert("Name is required.");
      return;
    }

    if (!formData.amount) {
      alert("Please enter amount");
      return;
    }

    if (!formData.notes) {
      alert("Please enter notes");
      return;
    }

    await onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">

        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>

        <h3 className="font-bold text-lg mb-4">
          {modalType === "add"
            ? "Add Expense"
            : "Edit expense"}
        </h3>

        <form onSubmit={handleSubmit}>

          <fieldset className="fieldset">
            <label className="label">Name</label>

            <input
              className="input w-full"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </fieldset>

          <fieldset className="fieldset">
            <label className="label">Amount</label>

            <input
              className="input w-full"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </fieldset>

          <fieldset className="fieldset">
            <label className="label">Date</label>

            <input
              className="input w-full"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </fieldset>

          <fieldset className="fieldset">
            <label className="label">Notes</label>

            <textarea
              className="textarea w-full"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </fieldset>

          <div className="flex justify-end gap-2 mt-6">

            <button
              type="button"
              className="btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-success"
            >
              {modalType === "add"
                ? "Add expense"
                : "Save Changes"}
            </button>

          </div>

        </form>

      </div>
    </dialog>
  );
};

export default ModalForm;
import React, { useEffect, useState } from "react";

const initialForm = {
  id: "",
  name: "",
  size: "",
  ispaid: false,
  amount: "",
  dateordered: "",
  orderfrom: "",
  isdelivered: false,
  notes: "",
};

const ModalForm = ({
  isOpen,
  onClose,
  modalType,
  order,
  onSubmit,
}) => {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (modalType === "edit" && order) {
      setFormData({
        id: order.id,
        name: order.name || "",
        size: order.size || "",
        ispaid: Boolean(order.ispaid),
        amount: order.amount || "",
        dateordered: order.dateordered || "",
        orderfrom: order.orderfrom || "",
        isdelivered: Boolean(order.isdelivered),
        notes: order.notes || "",
      });
    } else {
      setFormData({
        ...initialForm,
        dateordered: new Date().toISOString().split("T")[0],
      });
    }
  }, [modalType, order, isOpen]);

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

    if (!formData.size) {
      alert("Please select a size.");
      return;
    }

    if (!formData.orderfrom) {
      alert("Please select Order From.");
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
            ? "Add Order"
            : "Edit Order"}
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

          <div className="grid grid-cols-2 gap-4">

            <fieldset className="fieldset">
              <label className="label">Size</label>

              <select
                className="select w-full"
                name="size"
                value={formData.size}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>XS</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
                <option>2XL</option>
              </select>
            </fieldset>

            <fieldset className="fieldset">
              <label className="label">Is Paid?</label>

              <select
                className="select w-full"
                name="ispaid"
                value={formData.ispaid ? "Yes" : "No"}
                onChange={handleChange}
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </fieldset>

          </div>

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
            <label className="label">Date Ordered</label>

            <input
              className="input w-full"
              type="date"
              name="dateordered"
              value={formData.dateordered}
              onChange={handleChange}
            />
          </fieldset>

          <div className="grid grid-cols-2 gap-4">

            <fieldset className="fieldset">
              <label className="label">Order From</label>

              <select
                className="select w-full"
                name="orderfrom"
                value={formData.orderfrom}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>Ralph</option>
                <option>Kyle</option>
              </select>
            </fieldset>

            <fieldset className="fieldset">
              <label className="label">Delivered?</label>

              <select
                className="select w-full"
                name="isdelivered"
                value={formData.isdelivered ? "Yes" : "No"}
                onChange={handleChange}
              >
                <option>Yes</option>
                <option>No</option>
              </select>
            </fieldset>

          </div>

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
                ? "Add Order"
                : "Save Changes"}
            </button>

          </div>

        </form>

      </div>
    </dialog>
  );
};

export default ModalForm;
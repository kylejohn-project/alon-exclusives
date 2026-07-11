import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import TableList from "./components/TableList";
import ModalForm from "./components/ModalForm";

import {
  getOrders,
  addOrder,
  updateOrder,
  deleteOrder,
} from "./services/OrderServices";

function App() {
  const [orders, setOrders] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [loading, setLoading] = useState(true);

  /**
   * Load Orders
   */
  const loadOrders = async () => {
    try {
      setLoading(true);

      const data = await getOrders();

      setOrders(data);
    } catch (err) {
      console.error(err);
      alert("Unable to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  /**
   * Open Add Modal
   */
  const handleAdd = () => {
    setModalType("add");
    setSelectedOrder(null);
    setIsModalOpen(true);
  };

  /**
   * Open Edit Modal
   */
  const handleEdit = (order) => {
    setModalType("edit");
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  /**
   * Delete Order
   */
  const handleDelete = async (order) => {
    const confirmed = window.confirm(
      `Delete order #${order.id}?`
    );

    if (!confirmed) return;

    try {
      await deleteOrder(order.id);

      await loadOrders();
    } catch (err) {
      console.error(err);
      alert("Failed to delete order.");
    }
  };

  /**
   * Save (Add/Edit)
   */
  const handleSubmit = async (formData) => {
    try {
      if (modalType === "add") {
        await addOrder(formData);
      } else {
        await updateOrder(formData);
      }

      setIsModalOpen(false);

      await loadOrders();
    } catch (err) {
      console.error(err);
      alert("Unable to save order.");
    }
  };

  return (
    <>
      <NavBar />

      <TableList
        orders={orders}
        loading={loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ModalForm
        isOpen={isModalOpen}
        modalType={modalType}
        order={selectedOrder}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default App;
import { useEffect, useState } from 'react'
import TableList from '../components/TableList'
import ModalForm from '../components/ModalForm'

import {
  getOrders,
  addOrder,
  updateOrder,
  deleteOrder
} from "../services/OrderServices";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [loading, setLoading] = useState(true);

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

  const handleAdd = () => {
    setModalType("add");
    setSelectedOrder(null);
    setIsModalOpen(true);
  };

  
  const handleEdit = (order) => {
    setModalType("edit");
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

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
  )
}

export default Orders

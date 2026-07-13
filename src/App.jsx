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

import { getVariants, refreshVariants } from "./services/InventoryService";
import InventoryList from "./components/InvetoryList";

import Orders from "./pages/Orders";
import Inventory from "./pages/Inventory";
import Expenses from "./pages/Expenses";
import Dashboard from "./pages/Dashboard";

function App() {
  const [orders, setOrders] = useState([]);
  const [inventories, setInventories] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [loading, setLoading] = useState(true);
  const [loadingStocks, setLoadingStocks] = useState(true);

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

  const loadVariants = async () => {
    try {
      setLoadingStocks(true);
      const stocks = await getVariants();
      setInventories(stocks);
    } catch (err) {
      console.error(err);
      alert("Unable to load variants.");
    } finally {
      setLoadingStocks(false);
    }
  };

  useEffect(() => {
    loadOrders();
    loadVariants();
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
      await handleRefresh();
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
      await handleRefresh();
    } catch (err) {
      console.error(err);
      alert("Unable to save order.");
    }
  };

  const handleRefresh = async () => {
    try {
      await refreshVariants();
      await loadVariants();
    } catch (error) {
      console.error("error refreshing variants: ", error);
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

      <InventoryList
        inventories={inventories}
        loading={loadingStocks}
        onRefresh={handleRefresh}
      />
    </>
  );
}

export default App;
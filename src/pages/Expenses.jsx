import { useEffect, useState } from 'react';
import ExpenseList from "../components/ExpenseList";
import ExpenseModal from "../components/ExpenseModal";

import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense
} from "../services/ExpensesService"

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [selectedExpense, setSelectedExpense] = useState(null);

  const loadExpenses = async () => {
    try {
      setLoading(true);
      
      const data = await getExpenses();
      setExpenses(data);
    } catch (e) {
      console.error(e);
      alert("Unable to load expenses");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadExpenses();
  }, []);

  const handleAdd = () => {
    setModalType("add");
    setSelectedExpense(null);
    setIsModalOpen(true);
  };

  const handleEdit = (expense) => {
    setModalType("edit");
    setSelectedExpense(expense);
    setIsModalOpen(true);
  }

  const handleDelete = async (expense) => {
      const confirmed = window.confirm(
        `Delete order #${expense.id}?`
      );
  
      if (!confirmed) return;
  
      try {
        await deleteExpense(expense.id);
  
        await loadExpenses();
      } catch (err) {
        console.error(err);
        alert("Failed to delete expense.");
      }
    };

    const handleSubmit = async (formData) => {
        try {
          if (modalType === "add") {
            await addExpense(formData);
          } else {
            await updateExpense(formData);
          }
    
          setIsModalOpen(false);
    
          await loadExpenses();
        } catch (err) {
          console.error(err);
          alert("Unable to save expense.");
        }
      };

  return (
    <>
      <ExpenseList
        expenses={expenses}
        loading={loading}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ExpenseModal
          isOpen={isModalOpen}
          modalType={modalType}
          expense={selectedExpense}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
    </>
  )
}

export default Expenses

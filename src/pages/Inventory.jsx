import React from 'react'
import { useEffect, useState } from 'react'

import { getVariants, refreshVariants } from "../services/InventoryService";
import InventoryList from '../components/InvetoryList';

const Inventory = () => {
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadVariants = async () => {
    try {
      setLoading(true);
      const stocks = await getVariants();
      setInventories(stocks);
    } catch (err) {
      console.error(err);
      alert("Unable to load variants.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVariants();
  }, []);

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
      <InventoryList
        inventories={inventories}
        loading={loading}
        onRefresh={handleRefresh}
      />
    </>
  )
}

export default Inventory

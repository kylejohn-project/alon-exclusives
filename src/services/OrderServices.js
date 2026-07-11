const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx16XzhCC8jnzQwEf4KWBxdRr3UmFkB-N1Ei5DW52zkj9LvhpQu8vN6hLGtgOM88nc_9Q/exec";

/**
 * Fetch all orders
 */
export const getOrders = async () => {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch orders.");
    }

    const result = await response.json();

    if (result.result !== "success") {
      throw new Error(result.message || "Unable to load orders.");
    }

    return result.data;
  } catch (error) {
    console.error("getOrders:", error);
    throw error;
  }
};

/**
 * Add new order
 */
export const addOrder = async (order) => {
  try {
    const body = new URLSearchParams();

    body.append(
    "payload",
    JSON.stringify({
        action: "add",
        data: order,
    })
    );

    const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    body,
    });

    return await response.json();
  } catch (error) {
    console.error("addOrder:", error);
    throw error;
  }
};

/**
 * Update existing order
 */
export const updateOrder = async (order) => {
  try {
    const body = new URLSearchParams();

    body.append(
    "payload",
    JSON.stringify({
        action: "edit",
        data: order,
    })
    );

    const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    body,
    });

    return await response.json();
  } catch (error) {
    console.error("updateOrder:", error);
    throw error;
  }
};

/**
 * Delete order
 */
export const deleteOrder = async (id) => {
  try {
    const body = new URLSearchParams();

    body.append(
    "payload",
    JSON.stringify({
        action: "delete",
        id,
    })
    );

    const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    body,
    });

    return await response.json();
  } catch (error) {
    console.error("deleteOrder:", error);
    throw error;
  }
};
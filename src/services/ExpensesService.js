const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwZpuFMRQclPeg5CytOQjz-L9pRs9mNbp2UbjHBogYCh4cI57XIse7cL_w-Cm1Tx4mgpw/exec";

/**
 * Fetch all orders
 */
export const getExpenses = async () => {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL + "?sheet=expenses");

    if (!response.ok) {
      throw new Error("Failed to fetch expenses.");
    }

    const result = await response.json();

    if (result.result !== "success") {
      throw new Error(result.message || "Unable to load expenses.");
    }

    return result.data;
  } catch (error) {
    console.error("getExpenses:", error);
    throw error;
  }
};

/**
 * Add new order
 */
export const addExpense = async (expense) => {
  try {
    const body = new URLSearchParams();

    body.append(
    "payload",
    JSON.stringify({
        action: "addExpense",
        data: expense,
    })
    );

    const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    body,
    });

    return await response.json();
  } catch (error) {
    console.error("addExpense:", error);
    throw error;
  }
};

/**
 * Update existing order
 */
export const updateExpense = async (expense) => {
  try {
    const body = new URLSearchParams();

    body.append(
    "payload",
    JSON.stringify({
        action: "editExpense",
        data: expense,
    })
    );

    const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    body,
    });

    return await response.json();
  } catch (error) {
    console.error("updateExpense:", error);
    throw error;
  }
};

/**
 * Delete order
 */
export const deleteExpense = async (id) => {
  try {
    const body = new URLSearchParams();

    body.append(
    "payload",
    JSON.stringify({
        action: "deleteExpense",
        id,
    })
    );

    const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    body,
    });

    return await response.json();
  } catch (error) {
    console.error("deleteExpense:", error);
    throw error;
  }
};
import { getOrders } from "./OrderServices";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwZpuFMRQclPeg5CytOQjz-L9pRs9mNbp2UbjHBogYCh4cI57XIse7cL_w-Cm1Tx4mgpw/exec?sheet=variants";

/**
 * Fetch all variants
 */
export const getVariants = async () => {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch variants.");
    }

    const result = await response.json();

    if (result.result !== "success") {
      throw new Error(result.message || "Unable to load variants.");
    }

    return result.data;
  } catch (error) {
    console.error("getVariants:", error);
    throw error;
  }
};

export const refreshVariants = async () => { //will only work for one product for now, will need to update if we're going to have multiple products
    
    try {
        const data = await getOrders();
    
        var sizes = {
            'M': 0,
            'L': 0,
            'XL': 0,
            '2XL': 0
        }

        data.forEach(order => {
            sizes[order.size] += 1;
        });

        console.log("sizes: ", sizes);

    } catch (error) {
        console.error("error updating inventory: ", error);
    }
}

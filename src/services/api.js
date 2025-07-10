// API Service for Hope-Amel UAE
const API_BASE_URL = 'https://hope-amel-uae.onrender.com';

// Helper function to handle API responses
const handleResponse = async (response) => {
  // First check if response is ok
  if (!response.ok) {
    let errorData;
    try {
      // Try to parse error as JSON
      errorData = await response.json();
    } catch (e) {
      // If parsing fails, use status text
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    // Throw error with message from API if available
    throw new Error(errorData.error || `API Error: ${response.status}`);
  }
  
  // For successful responses, parse JSON
  try {
    return await response.json();
  } catch (e) {
    console.error("Failed to parse JSON response:", e);
    return { success: true }; // Return a simple success object if parsing fails
  }
};

// Test the API connection
export const testConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/test`);
    return await handleResponse(response);
  } catch (error) {
    console.error("Connection test failed:", error);
    throw error;
  }
};

// Event API calls
export const joinEvent = async (eventId, userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/events/${eventId}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error(`Failed to join event ${eventId}:`, error);
    throw error;
  }
};

// Donation API calls
export const createDonation = async (donationData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/donations/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(donationData)
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to create donation:', error);
    throw error;
  }
};

export default {
  testConnection,
  joinEvent,
  createDonation
};

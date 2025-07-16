
const API_BASE_URL = 'https://hope-amel-uae.onrender.com';


const handleResponse = async (response) => {
  
  if (!response.ok) {
    let errorData;
    try {
     
      errorData = await response.json();
    } catch (e) {
      
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    throw new Error(errorData.error || `API Error: ${response.status}`);
  }
  

  try {
    return await response.json();
  } catch (e) {
    console.error("Failed to parse JSON response:", e);
    return { success: true }; 
  }
};

export const testConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/test`);
    return await handleResponse(response);
  } catch (error) {
    console.error("Connection test failed:", error);
    throw error;
  }
};


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

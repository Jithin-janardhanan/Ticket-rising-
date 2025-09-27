const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const registerUser = async ({ username, email, password, phone }) => {
  const response = await fetch(`${BASE_URL}/users/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
      phone_number: phone,
    }),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return await response.json();
};
export const logoutUser = async (authToken, refreshToken, logout) => {
  if (!authToken || !refreshToken) {
    logout();
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/users/logout/`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (res.ok) logout();
  } catch (err) {
    console.error("Logout error:", err);
  }
};

export const getProfile = async (authToken) => {
  const res = await fetch(`${BASE_URL}/tickets/profile/`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
};

export const createTicket = async (authToken, subject, description, file) => {
  const formData = new FormData();
  formData.append("subject", subject);
  formData.append("description", description);
  if (file) formData.append("image", file);

  const res = await fetch(`${BASE_URL}/tickets/complaints/create/`, {
    method: "POST",
    headers: { Authorization: `Bearer ${authToken}` },
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to create ticket");
  return res.json();
};

export const raiseTicket = async (formData, file = null) => {
  const formdata = new FormData();

  // Append form fields
  Object.keys(formData).forEach((key) => {
    formdata.append(key, formData[key]);
  });

  // Append file if present
  if (file) {
    formdata.append("image", file);
  }

  try {
    const response = await fetch(`${BASE_URL}/tickets/complaints/create/`, {
      method: "POST",
      body: formdata,
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Failed to raise ticket");
    }

    return await response.json(); // return success data
  } catch (error) {
    console.error("Raise Ticket API error:", error);
    throw error;
  }
};

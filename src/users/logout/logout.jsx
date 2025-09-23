const handleLogout = async () => {
  const token = localStorage.getItem("authToken");
  const refreshToken = localStorage.getItem("refreshToken"); // assuming you store it

  if (!token || !refreshToken) {
    navigate("/login");
    return;
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const raw = JSON.stringify({
    refresh: refreshToken,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch("http://192.168.1.5:8003/api/users/logout/", requestOptions);
    if (response.ok) {
      // Clear tokens from localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");

      // Navigate to login page
      navigate("/login");
    } else {
      const result = await response.text();
      console.error("Logout failed:", result);
      alert("Logout failed. Please try again.");
    }
  } catch (error) {
    console.error("Error during logout:", error);
    alert("Error during logout. Please try again.");
  }
};

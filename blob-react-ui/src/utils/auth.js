  const logoutUser = () => {
  // Clear user session logic here
  localStorage.removeItem('authToken'); // Remove auth token from local storage
  sessionStorage.clear(); // Clear all session storage
  document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Clear auth token cookie
  alert("User logged out");
};
export default logoutUser;
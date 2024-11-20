export async function loginUser(email, password) {
    const url = 'http://localhost:8080/api/users/login';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
    const data = await response.json();
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return data; 
    } catch (error) {
      console.error('Error logging in:', error);
    }
}
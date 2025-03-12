export async function registerUser(name, email, password) {
  const url = 'http://localhost:8080/api/users/register';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    console.log('User registered successfully:', data);
    return data;
  } catch (error) {
    console.error('Error registering user:', error);
  }
}

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

export async function forgotPassword(email) {
  const url = 'http://localhost:8080/api/users/forgot-password';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Pastikan respons berbentuk JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error requesting password reset:', error);
    return { message: 'Failed to send reset email. Please try again.' }; // Fallback agar tidak error di frontend
  }
}


export async function fetchUserProfile(token) {
  const url = 'http://localhost:8080/api/users/profile';

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('User profile:', data);
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
  }
}

export async function updateUserProfile(token, profileData) {
  const url = 'http://localhost:8080/api/users/profile';

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': '*/*',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Profile updated successfully:', data);
    return data;
  } catch (error) {
    console.error('Error updating profile:', error);
  }
}

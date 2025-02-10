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

export async function createTask(token, taskData) {
    const url = 'http://localhost:8080/api/tasks';
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': '*/*', 
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Task created successfully:', data);
      return data;
    } catch (error) {
      console.error('Error creating task:', error);
    }
}

export async function fetchTasks(token) {
    const url = 'http://localhost:8080/api/tasks';
  
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
      console.log('Tasks fetched successfully:', data);
      return data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
}
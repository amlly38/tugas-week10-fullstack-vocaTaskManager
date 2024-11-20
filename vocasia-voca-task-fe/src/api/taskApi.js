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

export async function updateTaskAsDone(token, taskId) {
    try {
      const url = `http://localhost:8080/api/tasks/${taskId}/done`;
      const response = await fetch( url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to mark task as done");
      }
    } catch (error) {
      console.error("Error marking task as done:", error);
      throw error;
    }
  }

  export async function deleteTaskApi(token, taskId) {
    const url = `http://localhost:8080/api/tasks/${taskId}`; 

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Task deleted:', data); 
        return data;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error; 
    }
}
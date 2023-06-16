export const signUpUser = async (username: string, email: string, password: string) => {
  try {
    const response = await fetch('https://planpalbackend-production.up.railway.app/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password
      }),
      credentials: 'include'
    });
    const userData = await response.json();
    return response;
  }
  catch (error) {
    console.error(error);
    return false;
  }
};

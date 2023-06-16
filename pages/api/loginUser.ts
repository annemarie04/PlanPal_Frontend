export const loginUser = async(email: string, password: string) => {
    try {
        const response = await fetch('https://planpalbackend-production.up.railway.app/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
            credentials: 'include'
        });
        const userData = await response.json();
        localStorage.setItem('userId', userData.userId);
        localStorage.setItem('username', userData.username);
        return response;
    }
    catch (error) {
        console.error(error);
        return false;
    }
};

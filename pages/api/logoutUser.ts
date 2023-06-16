export const logoutUser = async () => {
    try {
        console.log("logging out...");
        const response = await fetch('https://planpalbackend-production.up.railway.app/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        })
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        return response.ok;
    }
    catch (error) {
        console.error(error);
        return false;
    }
};
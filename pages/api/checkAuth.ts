
export const checkAuth = async() => {
    try {
        const response = await fetch('https://planpalbackend-production.up.railway.app/checkauth', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        const data = await response.json();
        if(response.ok)
            return !!data.isAuthenticated;
        else
            throw new Error("request to backend fail");
    }
    catch (error) {
        console.error(error);
        return false;
    }
}
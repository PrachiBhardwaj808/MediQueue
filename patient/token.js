document.addEventListener('DOMContentLoaded', () => {
    const tokenNumberDisplay = document.getElementById('tokenNumber');
    
    // Retrieve token from localStorage
    const lastGeneratedToken = localStorage.getItem('lastGeneratedToken');
    
    if (lastGeneratedToken) {
        tokenNumberDisplay.textContent = lastGeneratedToken;
    } else {
        tokenNumberDisplay.textContent = "N/A";
    }
});

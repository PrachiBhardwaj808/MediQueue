document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    
    // Simple state to keep track of token
    let currentToken = localStorage.getItem('mediQueueToken') 
                       ? parseInt(localStorage.getItem('mediQueueToken')) 
                       : 1;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Generate Token logic
        const condition = document.getElementById('condition').value;
        const prefix = condition.charAt(0).toUpperCase(); // N, S, or E
        
        const tokenString = `${prefix}-${currentToken.toString().padStart(3, '0')}`;
        
        // Save to localStorage
        localStorage.setItem('mediQueueToken', (currentToken + 1).toString());
        localStorage.setItem('lastGeneratedToken', tokenString);
        
        // Redirect to token page
        window.location.href = 'token.html';
    });
});

// 9. Display Output
document.addEventListener('DOMContentLoaded', () => {
    const tokenNumberDisplay = document.getElementById('tokenNumber');
    const tokenConditionDisplay = document.getElementById('tokenCondition');
    const tokenScoreDisplay = document.getElementById('tokenScore');
    
    // Retrieve patients from localStorage safely
    const patients = JSON.parse(localStorage.getItem('patients'));
    
    if (Array.isArray(patients) && patients.length > 0) {
        // Get the latest added patient to show their specific generated token
        const latestPatient = patients[patients.length - 1];
        
        // Show Token, Calculated Condition, and Total Score
        tokenNumberDisplay.textContent = latestPatient.token;
        tokenConditionDisplay.textContent = latestPatient.condition;
        tokenScoreDisplay.textContent = latestPatient.totalScore;
        
        // Optional: Color code the condition for better visual clarity
        if (latestPatient.condition === 'Emergency') {
            tokenConditionDisplay.style.color = '#ef4444'; // Red for Emergency
        } else if (latestPatient.condition === 'Serious') {
            tokenConditionDisplay.style.color = '#f59e0b'; // Orange for Serious
        } else {
            tokenConditionDisplay.style.color = '#3EB489'; // Mint Green for Normal
        }
    } else {
        // Fallback UI if accessed directly without existing data
        tokenNumberDisplay.textContent = "N/A";
        tokenConditionDisplay.textContent = "N/A";
        tokenScoreDisplay.textContent = "N/A";
    }
});

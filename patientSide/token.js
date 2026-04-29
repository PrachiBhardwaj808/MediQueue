document.addEventListener('DOMContentLoaded', () => {
    const tokenNumberDisplay = document.getElementById('tokenNumber');
    const tokenConditionDisplay = document.getElementById('tokenCondition');
    const tokenScoreDisplay = document.getElementById('tokenScore');
    
    function updateQueuePosition() {
        const patients = JSON.parse(localStorage.getItem('patients')) || [];
        const myId = sessionStorage.getItem('currentUserId');

        if (patients.length > 0 && myId) {
            // CRITICAL: Sort by priority, then by time
            patients.sort((a, b) => {
                if (a.priority === b.priority) {
                    return new Date(a.time) - new Date(b.time);
                }
                return a.priority - b.priority;
            });

            // Find current user's position in the sorted list
            const myIndex = patients.findIndex(p => p.id === myId);
            const myData = patients.find(p => p.id === myId);

            if (myIndex !== -1) {
                tokenNumberDisplay.textContent = `#${myIndex + 1}`;
                tokenConditionDisplay.textContent = myData.condition;
                tokenScoreDisplay.textContent = myData.totalScore;

                // Color coding
                const colors = { 'Emergency': '#ef4444', 'Serious': '#f59e0b', 'Normal': '#3EB489' };
                tokenConditionDisplay.style.color = colors[myData.condition] || '#000';
            }
        } else {
            tokenNumberDisplay.textContent = "N/A";
        }
    }

    // Run once on load
    updateQueuePosition();

    // LIVE UPDATE: Listen for other patients joining from other tabs/devices
    window.addEventListener('storage', (e) => {
        if (e.key === 'patients') updateQueuePosition();
    });
});
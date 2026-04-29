document.addEventListener('DOMContentLoaded', () => {
    const tokenNumberDisplay = document.getElementById('tokenNumber');
    const tokenConditionDisplay = document.getElementById('tokenCondition');
    const tokenScoreDisplay = document.getElementById('tokenScore');
    
    function updateMyLiveRank() {
        const patients = JSON.parse(localStorage.getItem('patients')) || [];
        const myId = sessionStorage.getItem('currentUserId');

        if (patients.length > 0 && myId) {
            patients.sort((a, b) => {
                if (b.totalScore !== a.totalScore) {
                    return b.totalScore - a.totalScore;
                }
                return new Date(a.time) - new Date(b.time);
            });

            const myIndex = patients.findIndex(p => p.id == myId);
            const myData = patients.find(p => p.id == myId);

            if (myIndex !== -1) {
                tokenNumberDisplay.textContent = `#${myIndex + 1}`;
                tokenConditionDisplay.textContent = myData.condition;
                tokenScoreDisplay.textContent = myData.totalScore;
                
                tokenNumberDisplay.style.transition = "all 0.5s";
            } else {
                tokenNumberDisplay.textContent = "DONE";
                tokenConditionDisplay.textContent = "Please proceed to cabin";
            }
        }
    }

    window.addEventListener('storage', (e) => {
        if (e.key === 'patients') updateMyLiveRank();
    });

    updateMyLiveRank();
    
    setInterval(updateMyLiveRank, 1000);
});
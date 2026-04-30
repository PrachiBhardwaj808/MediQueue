// =======================================
//   MediQueue - Token Display JS
// =======================================

document.addEventListener('DOMContentLoaded', () => {
    const tokenNumberDisplay  = document.getElementById('tokenNumber');
    const tokenConditionDisplay = document.getElementById('tokenCondition');
    const tokenScoreDisplay   = document.getElementById('tokenScore');

    function updateMyLiveRank() {
        const patients = JSON.parse(localStorage.getItem('patients')) || [];
        const myId = sessionStorage.getItem('currentUserId');

        if (!myId) {
            tokenNumberDisplay.textContent = '?';
            tokenConditionDisplay.textContent = 'Session expired';
            tokenScoreDisplay.textContent = '-';
            return;
        }

        // Sort: highest score first, then earliest arrival as tiebreaker
        patients.sort((a, b) => {
            if (b.totalScore !== a.totalScore) {
                return b.totalScore - a.totalScore;
            }
            return new Date(a.time) - new Date(b.time);
        });

        const myIndex = patients.findIndex(p => String(p.id) === String(myId));
        const myData  = patients.find(p => String(p.id) === String(myId));

        if (myIndex !== -1 && myData) {
            tokenNumberDisplay.textContent    = `#${myIndex + 1}`;
            tokenConditionDisplay.textContent = myData.condition;
            tokenScoreDisplay.textContent     = myData.totalScore;
        } else {
            // Patient was called / removed from queue
            tokenNumberDisplay.textContent    = 'DONE';
            tokenConditionDisplay.textContent = 'Please proceed to the cabin';
            tokenScoreDisplay.textContent     = '-';
        }
    }

    // Update when another tab changes localStorage
    window.addEventListener('storage', (e) => {
        if (e.key === 'patients') updateMyLiveRank();
    });

    // Initial render
    updateMyLiveRank();

    // Poll every second (same-tab updates don't fire storage event)
    setInterval(updateMyLiveRank, 1000);
});

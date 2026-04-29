// =======================================
//   MediQueue - Receptionist Dashboard JS
// =======================================

document.addEventListener('DOMContentLoaded', () => {
    const queueTableBody      = document.getElementById('queueTableBody');
    const currentlyServingDiv = document.getElementById('currentlyServing');
    const noServingDiv        = document.getElementById('noServing');
    const servingName         = document.getElementById('servingName');
    const servingToken        = document.getElementById('servingToken');
    const emptyMessage        = document.getElementById('emptyMessage');

    const btnCallNext    = document.getElementById('btnCallNext');
    const btnClearQueue  = document.getElementById('btnClearQueue');

    // --- Sort patients: highest score first, earliest arrival as tiebreaker ---
    function getSortedPatients() {
        const patients = JSON.parse(localStorage.getItem('patients')) || [];
        patients.sort((a, b) => {
            if (b.totalScore !== a.totalScore) {
                return b.totalScore - a.totalScore;
            }
            return new Date(a.time) - new Date(b.time);
        });
        return patients;
    }

    // --- Render the queue table ---
    function refreshQueue() {
        const patients = getSortedPatients();

        queueTableBody.innerHTML = '';

        if (patients.length === 0) {
            emptyMessage.style.display = 'block';
            return;
        }

        emptyMessage.style.display = 'none';

        patients.forEach((p, index) => {
            const tr = document.createElement('tr');

            let badgeClass = 'badge-normal';
            if (p.condition === 'Emergency') badgeClass = 'badge-emergency';
            else if (p.condition === 'Serious') badgeClass = 'badge-serious';

            tr.innerHTML = `
                <td><strong>#${index + 1}</strong></td>
                <td>${p.name}</td>
                <td>${p.age}</td>
                <td><span class="badge ${badgeClass}">${p.condition}</span></td>
                <td>${p.totalScore}</td>
            `;
            queueTableBody.appendChild(tr);
        });
    }

    // --- Call Next Patient ---
    btnCallNext.addEventListener('click', () => {
        const patients = getSortedPatients();

        if (patients.length === 0) {
            // No one left
            currentlyServingDiv.style.display = 'none';
            noServingDiv.style.display = 'flex';
            return;
        }

        // The first patient in sorted order is next
        const next = patients[0];

        // Show in "Currently Serving" box
        servingName.textContent  = next.name;
        servingToken.textContent = `Score: ${next.totalScore} | ${next.condition}`;
        currentlyServingDiv.style.display = 'flex';
        noServingDiv.style.display = 'none';

        // Remove this patient from the queue
        const remaining = patients.slice(1);
        localStorage.setItem('patients', JSON.stringify(remaining));

        refreshQueue();
    });

    // --- Clear Entire Queue ---
    btnClearQueue.addEventListener('click', () => {
        if (!confirm('Are you sure you want to clear the entire queue?')) return;

        localStorage.removeItem('patients');

        // Reset serving display
        currentlyServingDiv.style.display = 'none';
        noServingDiv.style.display = 'flex';

        refreshQueue();
    });

    // --- Live update when patient page adds someone (cross-tab) ---
    window.addEventListener('storage', (e) => {
        if (e.key === 'patients') refreshQueue();
    });

    // --- Initial render ---
    refreshQueue();

    // --- Poll every second for same-tab updates ---
    setInterval(refreshQueue, 1000);
});
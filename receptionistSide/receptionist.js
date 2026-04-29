document.addEventListener('DOMContentLoaded', () => {
    const queueTableBody = document.getElementById('queueTableBody');

    function refreshQueue() {
        let patients = JSON.parse(localStorage.getItem('patients')) || [];

        patients.sort((a, b) => {
            if (b.totalScore !== a.totalScore) {
                return b.totalScore - a.totalScore;
            }
            return new Date(a.time) - new Date(b.time);
        });

        queueTableBody.innerHTML = '';
        patients.forEach((p, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>#${index + 1}</strong></td>
                <td>${p.name}</td>
                <td>${p.age}</td>
                <td>${p.condition}</td>
                <td><span class="badge ${p.priority === 1 ? 'badge-emergency' : 'badge-normal'}">Score: ${p.totalScore}</span></td>
            `;
            queueTableBody.appendChild(tr);
        });
    }

    window.addEventListener('storage', (e) => {
        if (e.key === 'patients') refreshQueue();
    });


    refreshQueue();
    
    setInterval(refreshQueue, 1000);
});
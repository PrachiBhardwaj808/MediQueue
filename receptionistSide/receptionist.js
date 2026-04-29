document.addEventListener('DOMContentLoaded', () => {
    const queueTableBody = document.getElementById('queueTableBody');
    const btnCallNext = document.getElementById('btnCallNext');

    function loadAndRender() {
        let patients = JSON.parse(localStorage.getItem('patients')) || [];

        // SORTING LOGIC: High Priority (1) first, then older timestamp
        patients.sort((a, b) => {
            if (a.priority === b.priority) {
                return new Date(a.time) - new Date(b.time);
            }
            return a.priority - b.priority;
        });

        queueTableBody.innerHTML = '';
        patients.forEach((p, index) => {
            const tr = document.createElement('tr');
            const badgeClass = p.priority === 1 ? 'badge-emergency' : 'badge-normal';
            
            tr.innerHTML = `
                <td><strong>#${index + 1}</strong></td>
                <td>${p.name}</td>
                <td>${p.age}</td>
                <td>${p.condition}</td>
                <td><span class="badge ${badgeClass}">P-${p.priority}</span></td>
            `;
            queueTableBody.appendChild(tr);
        });
        
        return patients;
    }

    btnCallNext.addEventListener('click', () => {
        let patients = loadAndRender();
        if (patients.length > 0) {
            const next = patients.shift(); // Removes the top (highest priority) patient
            localStorage.setItem('patients', JSON.stringify(patients));
            
            document.getElementById('servingName').textContent = next.name;
            document.getElementById('currentlyServing').style.display = 'flex';
            document.getElementById('noServing').style.display = 'none';
            
            loadAndRender();
        } else {
            alert("No patients in queue!");
        }
    });

    // Initial load and sync
    loadAndRender();
    window.addEventListener('storage', loadAndRender);
});
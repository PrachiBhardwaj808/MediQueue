function loadAndRender() {
    let patients = JSON.parse(localStorage.getItem('patients')) || [];

    patients.sort((a, b) => {
        // 1. Sort by Priority (1 is highest)
        if (a.priority !== b.priority) return a.priority - b.priority;
        
        // 2. TIE-BREAKER: Sort by Age Score (Higher age score jumps ahead)
        if (a.ageScore !== b.ageScore) return b.ageScore - a.ageScore;

        // 3. Last Resort: First come, first served
        return new Date(a.time) - new Date(b.time);
    });

    const tbody = document.getElementById('queueTableBody');
    tbody.innerHTML = '';
    patients.forEach((p, index) => {
        tbody.innerHTML += `
            <tr>
                <td><strong>#${index + 1}</strong></td>
                <td>${p.name}</td>
                <td>${p.age}</td>
                <td>${p.condition}</td>
                <td><span class="badge ${p.priority === 1 ? 'badge-emergency' : 'badge-normal'}">High (${p.priority})</span></td>
            </tr>`;
    });
}
document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const queueTableBody = document.getElementById('queueTableBody');
    const emptyMessage = document.getElementById('emptyMessage');
    const btnCallNext = document.getElementById('btnCallNext');
    const btnClearQueue = document.getElementById('btnClearQueue');
    const currentlyServing = document.getElementById('currentlyServing');
    const noServing = document.getElementById('noServing');
    const servingName = document.getElementById('servingName');
    const servingToken = document.getElementById('servingToken');

    // Load and render patients globally
    let patients = [];

    // 3A. Load Patients Function
    function loadPatients() {
        // Fetch from shared localStorage using the same key "patients"
        patients = JSON.parse(localStorage.getItem('patients')) || [];
        
        // 3B. Sort Queue by Priority and Time
        // Priority 1 = Emergency, Priority 2 = Serious, Priority 3 = Normal
        patients.sort((a, b) => {
            if (a.priority === b.priority) {
                // If priorities are equal, compare by timestamp
                return new Date(a.time) - new Date(b.time);
            }
            return a.priority - b.priority;
        });

        // Re-render UI
        renderTable();
    }

    // 3C. Display Patients
    function renderTable() {
        queueTableBody.innerHTML = '';

        if (patients.length === 0) {
            emptyMessage.style.display = 'block';
        } else {
            emptyMessage.style.display = 'none';

            // Dynamically render patients into rows
            patients.forEach(patient => {
                const tr = document.createElement('tr');
                
                // Determine badge color
                let badgeClass = 'badge-normal';
                if (patient.condition === 'Emergency') {
                    badgeClass = 'badge-emergency';
                } else if (patient.condition === 'Serious') {
                    // Serious is closer to emergency look, or could use default
                    badgeClass = 'badge-emergency'; 
                    // Let's manually style 'Serious' via inline style or rely on badge-normal
                }

                // Table row HTML injection
                tr.innerHTML = `
                    <td><strong>${patient.token}</strong></td>
                    <td>${patient.name}</td>
                    <td>${patient.age}</td>
                    <td>${patient.condition}</td>
                    <td><span class="badge ${badgeClass}">${patient.priority === 1 ? 'High (1)' : (patient.priority === 2 ? 'Med (2)' : 'Low (3)')}</span></td>
                `;
                queueTableBody.appendChild(tr);
            });
        }
    }

    // 3D. Call Next Patient
    function callNextPatient() {
        if (patients.length === 0) {
            alert('No patients in the queue to call.');
            return;
        }

        // Remove first patient from the queue array using shift()
        const nextPatient = patients.shift();

        // Save updated queue back to localStorage
        localStorage.setItem('patients', JSON.stringify(patients));

        // Display in "Currently Serving"
        servingName.textContent = nextPatient.name;
        servingToken.textContent = nextPatient.token;
        currentlyServing.style.display = 'flex';
        noServing.style.display = 'none';

        // Refresh UI table
        renderTable();
    }

    // 3E. Clear Queue
    function clearQueue() {
        if (confirm('Are you sure you want to completely clear the queue?')) {
            // Remove all patients
            patients = [];
            localStorage.setItem('patients', JSON.stringify(patients));

            // Clear currently serving visual
            currentlyServing.style.display = 'none';
            noServing.style.display = 'flex';

            // Render cleared table
            renderTable();
        }
    }

    // Event Listeners
    btnCallNext.addEventListener('click', callNextPatient);
    btnClearQueue.addEventListener('click', clearQueue);

    // Initial Load
    loadPatients();

    // 4. Real-Time Sync Simulation via Polling Interval
    // Refresh queue every 2 seconds to fetch newly added patients safely
    setInterval(loadPatients, 2000);
});

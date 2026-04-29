document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const age = parseInt(document.getElementById('age').value);
        const symptomsInput = document.getElementById('symptoms').value.toLowerCase();

        let symptomScore = 0;
        const symptomPoints = { 'fever': 2, 'headache': 1, 'cough': 2, 'cold': 1, 'breathing': 5, 'chest pain': 5, 'vomiting': 3, 'dizziness': 3 };
        for (const [symptom, points] of Object.entries(symptomPoints)) {
            if (symptomsInput.includes(symptom)) symptomScore += points;
        }

        let ageScore = (age <= 12) ? 2 : (age >= 60 ? 3 : 0);
        const totalScore = symptomScore + ageScore;

        let priority = 3; // Normal
        if (totalScore >= 7) priority = 1; // Emergency
        else if (totalScore >= 4) priority = 2; // Serious

        let patients = JSON.parse(localStorage.getItem('patients')) || [];
        const userId = "USER-" + Date.now(); // Unique ID
        sessionStorage.setItem('currentUserId', userId);

        patients.push({
            id: userId,
            name: name,
            age: age,
            totalScore: totalScore,
            condition: priority === 1 ? 'Emergency' : (priority === 2 ? 'Serious' : 'Normal'),
            priority: priority,
            ageScore: ageScore, // Saved for tie-breaking
            time: new Date().toISOString()
        });

        localStorage.setItem('patients', JSON.stringify(patients));
        window.location.href = 'token.html'; // Go to display page
    });
});
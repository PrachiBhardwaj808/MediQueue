document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const age = parseInt(document.getElementById('age').value);
        const symptomsInput = document.getElementById('symptoms').value.toLowerCase();

        // 1. Scoring Logic
        let symptomScore = 0;
        const symptomPoints = {
            'fever': 2, 'headache': 1, 'cough': 2, 'cold': 1,
            'breathing': 5, 'chest pain': 5, 'vomiting': 3, 'dizziness': 3
        };

        for (const [symptom, points] of Object.entries(symptomPoints)) {
            if (symptomsInput.includes(symptom)) symptomScore += points;
        }

        let ageScore = (age <= 12) ? 2 : (age >= 60 ? 3 : 0);
        const totalScore = symptomScore + ageScore;

        // 2. Priority Logic (1 is highest)
        let condition = 'Normal';
        let priority = 3;
        if (totalScore >= 7) { condition = 'Emergency'; priority = 1; }
        else if (totalScore >= 4) { condition = 'Serious'; priority = 2; }

        // 3. Storage Logic
        let patients = JSON.parse(localStorage.getItem('patients')) || [];
        
        // Create Unique ID for THIS specific session
        const userId = Date.now().toString();
        sessionStorage.setItem('currentUserId', userId);

        const newPatient = {
            id: userId,
            name: name,
            age: age,
            totalScore: totalScore,
            condition: condition,
            priority: priority,
            time: new Date().toISOString()
        };

        patients.push(newPatient);
        localStorage.setItem('patients', JSON.stringify(patients));

        window.location.href = 'token.html';
    });
});
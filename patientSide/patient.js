document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Read input
        const name = document.getElementById('name').value.trim();
        const age = parseInt(document.getElementById('age').value);
        const symptomsInput = document.getElementById('symptoms').value.toLowerCase();

        // 2. Symptom Scoring System
        let symptomScore = 0;
        
        // Symptom mapping and points
        const symptomPoints = {
            'fever': 2,
            'headache': 1,
            'cough': 2,
            'cold': 1,
            'breathing': 5,
            'chest pain': 5,
            'vomiting': 3,
            'dizziness': 3
        };

        // Check using includes() to detect multiple symptoms & flexible matching
        const detectedSymptoms = [];
        for (const [symptom, points] of Object.entries(symptomPoints)) {
            if (symptomsInput.includes(symptom)) {
                symptomScore += points;
                detectedSymptoms.push(symptom);
            }
        }

        // 3. Age-Based Extra Priority
        let ageScore = 0;
        if (age <= 12) {
            ageScore = 2; // child
        } else if (age >= 60) {
            ageScore = 3; // elderly
        } // Others -> 0 points

        // 4. Total Score Calculation
        const totalScore = symptomScore + ageScore;

        // 5. Assign Condition & Priority
        let condition = '';
        let priority = 3;

        if (totalScore >= 7) {
            condition = 'Emergency';
            priority = 1;
        } else if (totalScore >= 4) { // 4 to 6
            condition = 'Serious';
            priority = 2;
        } else { // 0 to 3
            condition = 'Normal';
            priority = 3;
        }

        // Optional constraint: Log detected symptoms and score breakdown in console
        console.log("--- Patient Registration ---");
        console.log("Detected Symptoms:", detectedSymptoms.length > 0 ? detectedSymptoms.join(', ') : 'None matching priority terms');
        console.log("Symptom Score:", symptomScore);
        console.log("Age Score:", ageScore);
        console.log("Total Score:", totalScore);

        // 8. Store Data
        // Retrieve existing data safely if empty
        let patients = JSON.parse(localStorage.getItem('patients'));
        if (!Array.isArray(patients)) {
            patients = []; // Initialize as array if empty
        }

        // 6. Token Generation
        // Using a persistent sequential counter instead of array length so 
        // deleted items via receptionist's shift() don't cause duplicate tokens
        let globalTokenCounter = parseInt(localStorage.getItem('globalTokenCounter')) || 0;
        globalTokenCounter++;
        localStorage.setItem('globalTokenCounter', globalTokenCounter.toString());
        
        const token = `T${globalTokenCounter}`;

        // 7. Create Patient Object
        const newPatient = {
            id: Date.now().toString(), // unique id
            name: name,
            age: age,
            symptoms: symptomsInput,
            symptomScore: symptomScore,
            ageScore: ageScore,
            totalScore: totalScore,
            condition: condition,
            priority: priority,
            token: token,
            time: new Date().toISOString()
        };

        // Add patient object to the array list
        patients.push(newPatient);

        // Save back into localStorage under key "patients"
        localStorage.setItem('patients', JSON.stringify(patients));

        // Redirect to token page
        window.location.href = 'token.html';
    });
});

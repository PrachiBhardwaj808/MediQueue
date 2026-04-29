document.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value);
    const symptoms = document.getElementById('symptoms').value.toLowerCase();

    // Scoring
    let score = 0;
    if (symptoms.includes('chest pain') || symptoms.includes('breathing')) score += 5;
    if (symptoms.includes('fever') || symptoms.includes('cough')) score += 2;
    
    // Age factor
    if (age >= 60) score += 3;
    if (age <= 12) score += 2;

    const newPatient = {
        id: Date.now(),
        name: name,
        age: age,
        totalScore: score,
        condition: score >= 7 ? 'Emergency' : (score >= 4 ? 'Serious' : 'Normal'),
        priority: score >= 7 ? 1 : (score >= 4 ? 2 : 3),
        time: new Date().toISOString()
    };

    let patients = JSON.parse(localStorage.getItem('patients')) || [];
    patients.push(newPatient);
    localStorage.setItem('patients', JSON.stringify(patients));
    window.location.href = 'token.html';
});
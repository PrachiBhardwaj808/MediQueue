// =======================================
//   MediQueue - Patient Registration JS
// =======================================

document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const age = parseInt(document.getElementById('age').value);
    const symptomsRaw = document.getElementById('symptoms').value.toLowerCase();

    // --- Symptom Scoring ---
    let score = 0;

    if (symptomsRaw.includes('chest pain'))     score += 5;
    if (symptomsRaw.includes('breathing'))       score += 5;
    if (symptomsRaw.includes('fever'))           score += 2;
    if (symptomsRaw.includes('cough'))           score += 2;
    if (symptomsRaw.includes('headache'))        score += 1;
    if (symptomsRaw.includes('vomiting'))        score += 2;
    if (symptomsRaw.includes('unconscious'))     score += 5;
    if (symptomsRaw.includes('bleeding'))        score += 4;

    // --- Age Factor ---
    if (age <= 12) score += 2;
    if (age >= 60) score += 3;

    // --- Condition Label ---
    let condition;
    if (score >= 7)      condition = 'Emergency';
    else if (score >= 4) condition = 'Serious';
    else                 condition = 'Normal';

    // --- Build Patient Object ---
    const patientId = Date.now();

    const newPatient = {
        id: patientId,
        name: name,
        age: age,
        symptoms: symptomsRaw,
        totalScore: score,
        condition: condition,
        time: new Date().toISOString()
    };

    // --- Save to localStorage ---
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    patients.push(newPatient);
    localStorage.setItem('patients', JSON.stringify(patients));

    // --- Pass ID to token page via sessionStorage ---
    sessionStorage.setItem('currentUserId', patientId);

    // --- Redirect to token page ---
    window.location.href = 'token.html';
});
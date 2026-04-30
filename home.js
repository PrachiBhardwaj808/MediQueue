function goToPatient() {
    window.location.href = "../patientSide/patient.html";
}

function goToReceptionist() {
    window.location.href = "../receptionistSide/receptionist.html";
}

// Optional: Smooth scroll correction for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    });
});

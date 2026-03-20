async function loadCertificates() {
    try {
        const response = await fetch('/data/certificates.json');
        const data = await response.json();
        const gallery = document.getElementById('cert-gallery');

        gallery.innerHTML = data.map(cert => `
            <div class="cert-card">
                <div class="cert-image">
                    <img src="${cert.image}" alt="${cert.title}" onerror="this.src='https://via.placeholder.com/400x250?text=Certificate+Image'">
                </div>
                <div class="cert-info">
                    <span class="cert-date">${cert.date}</span>
                    <h3>${cert.title}</h3>
                    <p class="issuer">${cert.issuer}</p>
                    <a href="${cert.verify_link}" class="verify-btn" target="_blank">[VERIFY_ID: ${cert.id}]</a>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error("Failed to load certificate vault:", error);
    }
}

loadCertificates();
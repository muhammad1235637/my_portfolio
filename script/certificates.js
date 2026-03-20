/**
 * Helper: Converts the first page of a PDF into a Base64 PNG string
 */
async function convertPdfToPng(pdfUrl) {
    try {
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1); // Get the first page

        const viewport = page.getViewport({ scale: 2.0 }); // High-quality scale
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        
        await page.render(renderContext).promise;
        return canvas.toDataURL('image/png');
    } catch (error) {
        console.error("PDF Conversion Error:", error);
        return 'images/placeholder.png'; // Fallback if conversion fails
    }
}

/**
 * Main: Loads certificates and handles dynamic conversion
 */
async function loadCertificates() {
    try {
        const response = await fetch('/data/certificates.json');
        const data = await response.json();
        const gallery = document.getElementById('cert-gallery');

        // We use Promise.all because some items might need async PDF conversion
        const certCards = await Promise.all(data.map(async (cert) => {
            let displayImage = cert.image;

            // Check if the file is a PDF
            if (cert.image.toLowerCase().endsWith('.pdf')) {
                displayImage = await convertPdfToPng(cert.image);
            }

            return `
                <div class="cert-card">
                    <div class="cert-image">
                        <img src="${displayImage}" alt="${cert.title}">
                    </div>
                    <div class="cert-info">
                        <span class="cert-date">${cert.date}</span>
                        <h3>${cert.title}</h3>
                        <p class="issuer">${cert.issuer}</p>
                        <a href="${cert.image}" class="verify-btn" target="_blank">[VIEW_ORIGINAL_PDF]</a>
                    </div>
                </div>
            `;
        }));

        gallery.innerHTML = certCards.join('');
    } catch (error) {
        console.error("Failed to sync credential vault:", error);
    }
}

// Initialize
loadCertificates();
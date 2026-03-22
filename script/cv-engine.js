async function buildMasterCV() {
    try {
        // Fetch all three data sources in parallel
        const [aboutRes, projectsRes, certsRes] = await Promise.all([
            fetch('/data/about.json'),
            fetch('/data/projects.json'),
            fetch('/data/certificates.json')
        ]);

        const about = await aboutRes.json();
        const projects = await projectsRes.json();
        const certs = await certsRes.json();

        // 1. Map About Data
        document.getElementById('cv-name').textContent = "MUHAMMAD";
        document.getElementById('cv-title').textContent = about.identity.title.replace('<br>', ' ');
        document.getElementById('cv-bio').textContent = about.identity.bio.replace(/\*\*/g, '');

        // 2. Map Skills to Sidebar
        const skillsTarget = document.getElementById('cv-skills-js');
        skillsTarget.innerHTML = about.skills.map(s => `
            <div style="margin-top:30px">
                <span class="label" style="font-size:0.7rem">${s.category}</span>
                <p style="font-size:0.85rem; color:var(--text-dim); margin-top:5px">${s.items}</p>
            </div>
        `).join('');

        // 3. Map Experience
        const expTarget = document.getElementById('cv-experience-js');
        about.experience.forEach(exp => {
            expTarget.innerHTML += `
                <div class="cv-item">
                    <h3>${exp.title}</h3>
                    <span class="meta">${exp.time}</span>
                    <p style="font-size:0.9rem">${exp.description}</p>
                </div>
            `;
        });

        // 4. Map Projects
        const projTarget = document.getElementById('cv-projects-js');
        projects.slice(0, 3).forEach(proj => { // Take top 3
            projTarget.innerHTML += `
                <div class="cv-item">
                    <h3>${proj.title}</h3>
                    <span class="meta">${proj.tech.join(' • ')}</span>
                    <p style="font-size:0.9rem">${proj.desc}</p>
                </div>
            `;
        });

        // 5. Map Certs
        const certTarget = document.getElementById('cv-certs-js');
        certs.forEach(c => {
            certTarget.innerHTML += `
                <div style="margin-bottom:10px; font-size:0.9rem">
                    <span style="color:var(--accent)">[${c.date}]</span> ${c.title} — ${c.issuer}
                </div>
            `;
        });

    } catch (err) {
        console.error("Data integrity failure. Check JSON sources.", err);
    }
}

document.addEventListener('DOMContentLoaded', buildMasterCV);
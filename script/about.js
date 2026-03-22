async function loadAbout() {
    try {
        const response = await fetch('/data/about.json');
        const data = await response.json();

        // Load Identity
        document.getElementById('id-title').innerHTML = data.identity.title;
        document.getElementById('id-bio').innerHTML = data.identity.bio.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        const statsRow = document.getElementById('stats-row');
        statsRow.innerHTML = data.identity.stats.map(s => `
            <div class="stat">
                <span class="val">${s.val}</span>
                <span class="key">${s.key}</span>
            </div>
        `).join('');

        // Load Skills
        const stackTarget = document.getElementById('stack-target');
        stackTarget.innerHTML = '<span class="label">SKILL_MANIFEST</span>' + 
            data.skills.map(s => `
            <div class="stack-category">
                <h4>${s.category}</h4>
                <p>${s.items}</p>
            </div>
        `).join('');

        // Load Experience
        const logTarget = document.getElementById('log-target');
        logTarget.innerHTML = '<span class="label">SYSTEM_LOGS</span>' + 
            data.experience.map(e => `
            <div class="log-entry">
                <span class="timestamp">${e.time}</span>
                <div class="log-content">
                    <h3>${e.title}</h3>
                    <p>${e.description}</p>
                </div>
            </div>
        `).join('');

    } catch (err) {
        console.error("System Error: Could not sync identity nodes.", err);
    }
}

document.addEventListener('DOMContentLoaded', loadAbout);
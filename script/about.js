async function loadAboutData() {
    try {
        const response = await fetch('/data/about.json');
        const data = await response.json();

        // 1. Populate Identity (Sidebar & Header)
        document.querySelector('.profile-section h1').textContent = data.identity.name;
        document.querySelector('.subtitle').textContent = data.identity.title;
        document.querySelector('.cv-section p').textContent = data.identity.bio;

        // 2. Populate Skills (Sidebar Blocks)
        const sidebar = document.querySelector('.cv-sidebar');
        // Clear existing skill blocks if any
        const existingBlocks = sidebar.querySelectorAll('.sidebar-block.dynamic-skill');
        existingBlocks.forEach(b => b.remove());

        data.skills.forEach(skillGroup => {
            const block = document.createElement('div');
            block.className = 'sidebar-block dynamic-skill';
            block.innerHTML = `
                <h3>${skillGroup.category}</h3>
                <ul class="skill-list">
                    ${skillGroup.items.map(item => `<li>${item}</li>`).join('')}
                </ul>
            `;
            sidebar.appendChild(block);
        });

        // 3. Populate Experience (Main Content)
        const experienceContainer = document.querySelector('.cv-section.experience-list');
        experienceContainer.innerHTML = '<h2>PROFESSIONAL EXPERIENCE</h2>'; // Reset header

        data.experience.forEach(job => {
            const item = document.createElement('div');
            item.className = 'cv-item';
            item.innerHTML = `
                <div class="item-header">
                    <span class="title">${job.role}</span>
                    <span class="date">${job.period}</span>
                </div>
                <p class="org">${job.org}</p>
                <ul>
                    ${job.details.map(detail => `<li>${detail}</li>`).join('')}
                </ul>
            `;
            experienceContainer.appendChild(item);
        });

    } catch (error) {
        console.error("Critical System Error: Unable to load Identity Manifest.", error);
    }
}

document.addEventListener('DOMContentLoaded', loadAboutData);
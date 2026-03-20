// Store projects globally so we don't have to fetch every time we filter
let allProjects = [];

async function initProjects() {
    try {
        const response = await fetch('/data/projects.json');
        allProjects = await response.json();
        renderProjects(allProjects); // Initial render
        setupFilters();
    } catch (err) {
        console.error("Data node offline: ", err);
    }
}

function renderProjects(data) {
    const container = document.querySelector('.projects-feed');
    
    // Map the database objects to your Techish HTML structure
    container.innerHTML = data.map(project => `
        <div class="project-entry" data-category="${project.category}">
            <div class="project-meta">
                <span class="id">ID: ${project.id}</span>
                <span class="tag">${project.category}</span>
            </div>
            <h2>${project.title}</h2>
            <p>${project.desc}</p>
            <div class="tech-used">
                ${project.tech.map(t => `<span>${t}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${project.link}" target="_blank">[VIEW_SOURCE]</a>
            </div>
        </div>
    `).join('');
}

function setupFilters() {
    const filters = document.querySelectorAll('#filter-menu li');
    
    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            // UI: Change active class
            filters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            
            // Logic: Filter data
            const category = filter.getAttribute('data-filter');
            if (category === 'all') {
                renderProjects(allProjects);
            } else {
                const filtered = allProjects.filter(p => p.category === category);
                renderProjects(filtered);
            }
        });
    });
}

// Initialize on load
initProjects();
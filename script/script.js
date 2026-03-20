async function loadProjects() {
    const response = await fetch('/data/projects.json');
    const projects = await response.json();
    const container = document.querySelector('.projects-feed');
    
    container.innerHTML = projects.map(project => `
        <div class="project-entry">
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
                <!--<a href="${project.link}">[VIEW_SOURCE]</a>-->
            </div>
        </div>
    `).join('');
}
loadProjects();
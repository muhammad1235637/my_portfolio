async function loadProjects() {
    const response = await fetch('/data/projects.json');
    const projects = await response.json();
    const container = document.querySelector('.projects-feed');
    
    container.innerHTML = projects.map(project => `
        <div class="grid-item">
            <div class="header">
                <span class="num">${project.id}</span>
                <span class="category">${project.category}</span>
            </div>
            <h3>${project.title}</h3>
            <p>${project.desc}</p>
            <!--<div class="footer">${project.link}</div>-->
        </div>
    `).join('');
}
loadProjects();
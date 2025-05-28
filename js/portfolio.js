document.addEventListener('DOMContentLoaded', function() {
    // Get projects data from the script tag
    const projectsData = JSON.parse(document.getElementById('projects-data').textContent);
    
    // Handle modal show event
    $('#project-modal').on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget);
        const projectId = button.data('project');
        const project = projectsData.find(p => p.id === projectId);
        
        if (project) {
            populateModal(project);
        }
    });
    
    function populateModal(project) {
        // Update modal content
        document.getElementById('modal-image').src = project.image;
        document.getElementById('modal-image').alt = project.alt || project.name;
        document.getElementById('modal-title').textContent = project.name;
        document.getElementById('modal-category').textContent = project.category;
        document.getElementById('modal-description').textContent = project.description;
        document.getElementById('modal-details').textContent = project.details || '';
        
        // Tech stack using Bootstrap badges
        const techStackElement = document.getElementById('modal-tech-stack');
        if (project.tech_stack && project.tech_stack.length > 0) {
            const techHTML = '<h5>Technologies:</h5>' + 
                project.tech_stack.map(tech => 
                    `<span class="label label-primary tech-badge">${tech}</span>`
                ).join(' ');
            techStackElement.innerHTML = techHTML;
        } else {
            techStackElement.innerHTML = '';
        }
        
        // Links using Bootstrap buttons
        const linksElement = document.getElementById('modal-links');
        let linksHTML = '';
        if (project.github_url) {
            linksHTML += `<a href="${project.github_url}" target="_blank" class="btn btn-primary btn-sm">
                <span class="glyphicon glyphicon-link"></span> View Code
            </a> `;
        }
        if (project.demo_url) {
            linksHTML += `<a href="${project.demo_url}" target="_blank" class="btn btn-success btn-sm">
                <span class="glyphicon glyphicon-play"></span> Live Demo
            </a>`;
        }
        linksElement.innerHTML = linksHTML;
    }
});
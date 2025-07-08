// Archivo JS para posibles interacciones futuras en la réplica de NatGeo Latam
// Por ahora, solo scroll suave para navegación

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.ng-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const section = document.querySelector(href);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

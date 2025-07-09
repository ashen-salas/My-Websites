document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.querySelector(".toggleDarkMode");
    const html = document.documentElement; // <html>
    const icon = toggleBtn.querySelector("i");
    const bgMusic = document.getElementById('bg-music');
    const mutedBtn = document.querySelector(".mutedButton");
    const mutedIcon = mutedBtn ? mutedBtn.querySelector("i") : null;
    let lastVolume = 0.5 ; // Volumen predeterminado

    html.classList.add("dark-mode"); // Forzar modo oscuro

    // Música de fondo: siempre inicia activa
    if (bgMusic) {
        bgMusic.volume = lastVolume;
        bgMusic.play().catch(() => {});
        localStorage.setItem("musicState", "playing");
    }

    // Botón play/pause con iconos
    if (mutedBtn && bgMusic && mutedIcon) {
        mutedBtn.addEventListener("click", function (e) {
            e.preventDefault();
            if (bgMusic.paused) {
                bgMusic.play();
                localStorage.setItem("musicState", "playing");
                mutedIcon.classList.remove("bx-volume-mute");
                mutedIcon.classList.add("bx-volume-full");
            } else {
                bgMusic.pause();
                localStorage.setItem("musicState", "paused");
                mutedIcon.classList.remove("bx-volume-full");
                mutedIcon.classList.add("bx-volume-mute");
            }
        });
        // Estado inicial del icono
        setTimeout(() => {
            mutedIcon.classList.remove("bx-volume-mute");
            mutedIcon.classList.add("bx-volume-full");
        }, 100);
    }

    // Predeterminado: dark mode
    if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", "dark");
    }

    // Aplica el tema guardado
    if (localStorage.getItem("theme") === "dark") {
        html.classList.add("dark-mode");
        icon.classList.remove("bx-moon");
        icon.classList.add("bx-sun");
    }

    toggleBtn.addEventListener("click", function (e) {
        e.preventDefault();

        html.classList.toggle("dark-mode");

        if (html.classList.contains("dark-mode")) {
            icon.classList.remove("bx-moon");
            icon.classList.add("bx-sun");
            localStorage.setItem("theme", "dark");
        } else {
            icon.classList.remove("bx-sun");
            icon.classList.add("bx-moon");
            localStorage.setItem("theme", "light");
        }
    });

    // Cambiar dinámicamente la palabra final del h1
    const frases = ["Developer", "Gamer", "Artista"];
    let fraseIndex = 0;
    const h1 = document.querySelector(".main_content header h1");
    if (h1) {
        setInterval(() => {
            fraseIndex = (fraseIndex + 1) % frases.length;
            h1.innerHTML = "&lt;/&gt; Hola, soy...  <br>un  " + frases[fraseIndex];
        }, 2000);
    }

    document.querySelector('.navbar-toggle').addEventListener('click', function() {
        document.querySelector('.navbar-links').classList.toggle('active');
    });
});

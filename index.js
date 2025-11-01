// Configuración de rutas y títulos
const routes = {
  home: "home",
  articles: "articles",
  work: "work",
  contact: "contact"
};

// Estado actual
let currentRoute = "home";

// Función para cambiar de página
function navigateTo(route) {
  if (currentRoute === route) return;
  
  const pageContent = document.querySelector(".page-content");
  const pageTitle = document.querySelector(".page-title");
  
  // Animación de salida
  pageContent.classList.add("fade-out");
  
  setTimeout(() => {
    // Actualizar el título
    pageTitle.textContent = routes[route];
    
    // Cambiar estado
    currentRoute = route;
    
    // Actualizar botones activos con animación
    document.querySelectorAll(".nav-button").forEach(btn => {
      const bg = btn.querySelector(".nav-button-bg");
      if (btn.dataset.route === route) {
        btn.classList.add("active");
        gsap.to(bg, {
          scaleX: 1,
          duration: 0.4,
          ease: "power2.out",
          transformOrigin: "left center"
        });
      } else {
        btn.classList.remove("active");
        gsap.to(bg, {
          scaleX: 0,
          duration: 0.3,
          ease: "power2.in",
          transformOrigin: "left center"
        });
      }
    });
    
    // Animación de entrada
    pageContent.classList.remove("fade-out");
    pageContent.classList.add("fade-in");
    
    setTimeout(() => {
      pageContent.classList.remove("fade-in");
    }, 300);
  }, 150);
}

// Inicializar navegación y animaciones de hover
document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav-button");
  
  navButtons.forEach(button => {
    const bg = button.querySelector(".nav-button-bg");
    let hoverTween = null;
    
    // Animación de hover (entrada)
    button.addEventListener("mouseenter", () => {
      if (hoverTween) hoverTween.kill();
      
      hoverTween = gsap.to(bg, {
        scaleX: 1,
        duration: 0.6,
        ease: "power2.out",
        transformOrigin: "left center"
      });
    });
    
    // Animación de salida (cuando quitas el mouse)
    button.addEventListener("mouseleave", () => {
      if (!button.classList.contains("active")) {
        if (hoverTween) hoverTween.kill();
        
        hoverTween = gsap.to(bg, {
          scaleX: 0,
          duration: 0.4,
          ease: "power2.in",
          transformOrigin: "left center"
        });
      }
    });
    
    // Click handler
    button.addEventListener("click", () => {
      const route = button.dataset.route;
      navigateTo(route);
      
      // Asegurar que el fondo activo esté visible
      if (button.classList.contains("active")) {
        gsap.to(bg, {
          scaleX: 1,
          duration: 0.3,
          ease: "power2.out",
          transformOrigin: "left center"
        });
      }
    });
  });
  
  // Inicializar el fondo del botón activo
  const activeButton = document.querySelector(".nav-button.active");
  if (activeButton) {
    const activeBg = activeButton.querySelector(".nav-button-bg");
    gsap.set(activeBg, { scaleX: 1 });
  }
});


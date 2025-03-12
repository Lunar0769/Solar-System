const solarSystem = document.getElementById("solar-system");
const speedInput = document.getElementById("speed");
const applyTimeBtn = document.getElementById("apply-time");
const resetBtn = document.getElementById("reset");
const timeInput = document.getElementById("set-time");
const infoBox = document.getElementById("info-box");
let timeMultiplier = 1;
let timeElapsed = Date.now() / 86400000;

const centerX = 500;
const centerY = 500;

const sun = document.createElementNS("http://www.w3.org/2000/svg", "circle");
sun.setAttribute("cx", centerX);
sun.setAttribute("cy", centerY);
sun.setAttribute("r", 40);
sun.setAttribute("fill", "yellow");
solarSystem.appendChild(sun);

const planets = [
    { name: "Mercury", distance: 80, period: 88, color: "gray" },
    { name: "Venus", distance: 120, period: 225, color: "orange" },
    { name: "Earth", distance: 160, period: 365, color: "blue" },
    { name: "Mars", distance: 200, period: 687, color: "red" },
    { name: "Jupiter", distance: 300, period: 4333, color: "brown" },
    { name: "Saturn", distance: 400, period: 10759, color: "gold" },
    { name: "Uranus", distance: 500, period: 30687, color: "cyan" },
    { name: "Neptune", distance: 600, period: 60190, color: "blue" }
];

planets.forEach(planet => {
    const orbit = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    orbit.setAttribute("cx", centerX);
    orbit.setAttribute("cy", centerY);
    orbit.setAttribute("r", planet.distance);
    orbit.setAttribute("class", "orbit");
    solarSystem.appendChild(orbit);
    
    planet.element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    planet.element.setAttribute("r", 10);
    planet.element.setAttribute("fill", planet.color);
    solarSystem.appendChild(planet.element);
    
    planet.element.addEventListener("mouseenter", (event) => {
        infoBox.style.left = `${event.clientX + 10}px`;
        infoBox.style.top = `${event.clientY + 10}px`;
        infoBox.innerHTML = `<strong>${planet.name}</strong>`;
        infoBox.style.display = "block";
    });
    planet.element.addEventListener("mouseleave", () => {
        infoBox.style.display = "none";
    });
});

function updatePositions() {
    planets.forEach((planet) => {
        const angle = (timeElapsed / planet.period) * 2 * Math.PI;
        const x = centerX + planet.distance * Math.cos(angle);
        const y = centerY + planet.distance * Math.sin(angle);
        planet.element.setAttribute("cx", x);
        planet.element.setAttribute("cy", y);
    });
}

speedInput.addEventListener("input", () => {
    timeMultiplier = parseFloat(speedInput.value);
});

applyTimeBtn.addEventListener("click", () => {
    const selectedTime = new Date(timeInput.value).getTime() / 86400000;
    if (!isNaN(selectedTime)) {
        timeElapsed = selectedTime;
        updatePositions();
    }
});

resetBtn.addEventListener("click", () => {
    timeElapsed = Date.now() / 86400000;
    updatePositions();
});

function animate() {
    timeElapsed += timeMultiplier;
    updatePositions();
    requestAnimationFrame(animate);
}

animate();
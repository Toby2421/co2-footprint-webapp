// Funktion zum Umschalten des Dropdown-Menüs für die Sortieroptionen
function toggleDropdown(id) {
    const dropdown = document.getElementById(id);
    dropdown.classList.toggle("show");
}

// Funktion zum Schließen des Dropdowns
function closeDropdown() {
    document.getElementById("filterDropdown").classList.remove("show");
}

// Funktion zum Bereinigen der Benutzereingabe (Sanitization)
function sanitizeInput(input) {
    return input.replace(/[^a-zA-Z0-9äöüÄÖÜß\s-]/g, ""); // Entfernt alle unerlaubten Zeichen außer Buchstaben, Zahlen, Leerzeichen und Bindestriche
}

// Funktion für die Echtzeitsuche in der Tabelle
document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("searchInput");
    const table = document.getElementById("co2Table");

    if (!searchInput || !table) {
        console.error("Suchfeld oder Tabelle konnte nicht gefunden werden.");
        return;
    }

    searchInput.addEventListener("keyup", function() {
        let filter = sanitizeInput(searchInput.value.toLowerCase()); // Bereinige die Eingabe
        const rows = table.querySelectorAll("tbody tr");

        rows.forEach(row => {
            const companyCell = row.cells[0]?.textContent.toLowerCase() || "";
            const countryCell = row.cells[1]?.textContent.toLowerCase() || "";
            
            row.style.display = (companyCell.includes(filter) || countryCell.includes(filter)) ? "" : "none";
        });
    });
});

// Funktion zum Sortieren der Tabelle nach CO2-Emissionen
function sortTable(ascending) {
    const table = document.getElementById("co2Table");
    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    rows.sort((row1, row2) => {
        const cell1 = parseInt(row1.cells[2].textContent.replace(/\D/g, ''), 10);
        const cell2 = parseInt(row2.cells[2].textContent.replace(/\D/g, ''), 10);
        return ascending ? cell1 - cell2 : cell2 - cell1;
    });

    rows.forEach(row => tbody.appendChild(row));
}

// Event-Listener für Sortieroptionen
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".dropdown-item").forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault(); // Verhindert das Springen der Seite

            if (this.textContent.includes("aufsteigend")) {
                sortTable(true);
            } else {
                sortTable(false);
            }

            // Dropdown nach Auswahl schließen
            closeDropdown();
        });
    });

    // Schließt das Dropdown-Menü, wenn außerhalb geklickt wird
    document.addEventListener("click", function(event) {
        const dropdown = document.getElementById("filterDropdown");
        const button = document.querySelector(".btn.dropdown-toggle");

        if (dropdown && !dropdown.contains(event.target) && !button.contains(event.target)) {
            closeDropdown();
        }
    });
});

// Funktion zum Umschalten des mobilen Burger-Menüs
document.addEventListener("DOMContentLoaded", function() {
    const burgerMenu = document.querySelector('.navbar-toggler');
    const menuContent = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            setTimeout(() => {
                menuContent.classList.remove('show');
                burgerMenu.classList.add('collapsed');
            }, 100);
        });
    });
});

// Sticky Header Scroll Effekt
document.addEventListener("scroll", function () {
    document.body.classList.toggle("scrolled", window.scrollY > 50);
});

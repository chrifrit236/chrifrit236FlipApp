import { Inventory } from './modules/inventory.js';
import { Builds } from './modules/builds.js';
import { Bundles } from './modules/bundles.js';
import { Finance } from './modules/finance.js';

// Dark Mode Toggle
const toggleBtn = document.getElementById('toggleDark');
toggleBtn.addEventListener('click', () => document.body.classList.toggle('dark'));

// Tab Navigation
document.querySelectorAll('nav button').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        document.getElementById(btn.dataset.tab).classList.add('active');
    });
});

// Initialisiere Module
Inventory.init();
Builds.init();
Bundles.init();
Finance.init();
// =============================
// Export / Import Funktionen
// =============================

// Exportiert alle gespeicherten Daten als JSON-Datei
function exportData() {
  const data = {
    inventory: JSON.parse(localStorage.getItem("inventory")) || [],
    builds: JSON.parse(localStorage.getItem("builds")) || [],
    bundles: JSON.parse(localStorage.getItem("bundles")) || [],
    finances: JSON.parse(localStorage.getItem("finances")) || []
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `pc-flipping-data-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Importiert eine JSON-Datei und überschreibt lokale Daten
function importData(file) {
  const reader = new FileReader();
  reader.onload = function (event) {
    try {
      const data = JSON.parse(event.target.result);
      if (data.inventory) localStorage.setItem("inventory", JSON.stringify(data.inventory));
      if (data.builds) localStorage.setItem("builds", JSON.stringify(data.builds));
      if (data.bundles) localStorage.setItem("bundles", JSON.stringify(data.bundles));
      if (data.finances) localStorage.setItem("finances", JSON.stringify(data.finances));

      alert("Import erfolgreich! Seite wird neu geladen.");
      location.reload();
    } catch (err) {
      alert("Fehler beim Import: Ungültige JSON-Datei.");
    }
  };
  reader.readAsText(file);
}

// Event Listener für Buttons
document.getElementById("export-data").addEventListener("click", exportData);
document.getElementById("import-data-btn").addEventListener("click", () => {
  document.getElementById("import-data").click();
});
document.getElementById("import-data").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) importData(file);
});

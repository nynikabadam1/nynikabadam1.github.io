import showCards from './editable_js/template_cards.js';
import showCategories from './editable_js/template_category.js';
import showStats from './editable_js/template_stats.js';
import showTable from './editable_js/template_table.js';

import loadData from './editable_js/load_data.js';
let objects = [];

// ============================================
// DISPLAY MANAGEMENT - PROVIDED
// ============================================

/**
 * Update the display with new content
 */
function updateDisplay(content) {
  document.getElementById("data-display").innerHTML = content;
}

/**
 * Update button states
 */
function updateButtonStates(activeView) {
  document.querySelectorAll(".view-button").forEach((button) => {
    button.classList.remove("active");
  });
  document.getElementById(`btn-${activeView}`).classList.add("active");
}

/**
 * Show loading state
 */
function showLoading() {
  updateDisplay('<div class="loading">Loading data from API...</div>');
}

/**
 * Show error state
 */
 /*html*/ 
function showError(message) {
  updateDisplay(`
                <div class="error">
                    <h3>Error Loading Data</h3>
                    <p>${message}</p>
                    <button onclick="location.reload()">Try Again</button>
                </div>
            `);
}

// ============================================
// APPLICATION INITIALIZATION - PROVIDED
// ============================================

/**
 * Main application function - handles data loading and button setup
 * This pattern always works - no timing issues!
 */
document.addEventListener("DOMContentLoaded", async () => {
  console.log("Starting application...");

  try {
    // Load data once
    showLoading();
    const data = await loadData();
    // keep a reference available for other modules if needed
    objects = data;
    console.log(`Loaded ${data.length} items from API`);

    // Set up button event handlers - this pattern always works!
    document.getElementById("btn-cards").onclick = () => {
      updateDisplay(showCards(data));
      updateButtonStates("cards");
    };

    document.getElementById("btn-table").onclick = () => {
      // Insert a table skeleton into the display first so that
      // template_table.js can select '#inspection-table' and populate it.
      updateDisplay(`
        <h2 class="view-title"> ☄️ Table View</h2>
        <p class="view-description">Compare items in a table</p>
        <table class="restaurant-table" id="restaurant-table">
          <thead>
            <tr>
                <th>Name</th>
                <th>Diameter</th>
                <th>Hazardous</th>
                <th>Close Approach Date</th>
                <th>Miss Distance</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      `);
      // showTable expects an array of objects (not a Promise)
      showTable(data);
      updateButtonStates("table");
    };

    document.getElementById("btn-categories").onclick = () => {
      updateDisplay(`
        <h2 class="view-title"> ☄️ Category View</h2>
        <p class="view-description">Categorize asteroids by how much distance they missed Earth by on their path.</p>
        <div id="categories"></div>
        `);
        showCategories(data);
      updateButtonStates("categories");
    };

    document.getElementById("btn-stats").onclick = () => {
      updateDisplay(`
        <h2 class="view-title"> ☄️ Stats View</h2>
        <p class="view-description">Analyze patterns: Non-Hazardous vs Hazardous asteroids and asteroid that would and wouldn't leave a crater IF it hit Earth according to NASA</p>
        <div id="stats-grid" class="stats-grid">
        </div>
      `);
        showStats(data);
      updateButtonStates("stats");
    };

    // Show initial view
    updateDisplay(showCards(data));
    updateButtonStates("cards");

    console.log("Application ready!");
  } catch (error) {
    console.error("Application failed to start:", error);
    showError(error.message);
  }
});

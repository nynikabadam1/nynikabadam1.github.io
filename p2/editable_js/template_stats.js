/**
 * STATS VIEW - STUDENTS IMPLEMENT
 * Show aggregate statistics and insights - good for understanding the big picture
 */

import data from "./load_data.js";
let objects = [];
objects = data();

function showStats(objects) {
  // TODO: Students implement this function
  // Requirements:
  // - Calculate meaningful statistics from the dataset
  // - Present insights visually
  // - Show distributions, averages, counts, etc.
  // - Help users understand patterns in the data

    const statsGrid = document.querySelector('#stats-grid');

    statsGrid.innerHTML = '';    
    const hazardData = objects.reduce((acc, object) => {
    const isHazardous = object.is_potentially_hazardous_asteroid;
        
        // Count hazardous
        if (isHazardous === true) {
            acc.hazardous++;
        } else {
            acc.nonHazardous++;
        }
        acc.total++;
        
        return acc;
    }, { total: 0, hazardous: 0, nonHazardous: 0 });

    const hazardousRate = ((hazardData.hazardous / hazardData.total) * 100).toFixed(1);
    const nonHazardousRate = ((hazardData.nonHazardous / hazardData.total) * 100).toFixed(1);

    const crater = objects.reduce((acc, object) => {
        const diameter = object.estimated_diameter.meters.estimated_diameter_max;
    
    if (diameter) {
      if (diameter >= 140) {
        acc.wouldCrater++;
      } else {
        acc.noCrater++;
      }
    }
    
    return acc;
    }, { wouldCrater: 0, noCrater: 0 });
  
    const craterRate = ((crater.wouldCrater / hazardData.total) * 100).toFixed(1);
    const noCraterRate = ((crater.noCrater / hazardData.total) * 100).toFixed(1);
    
    statsGrid.innerHTML = `

  <div id="stats-grid">
    <!-- Row 1: Total only -->
    <div class="stats-row">
      <div class="stat-card">
        <p class="stat-label">Total Asteroids</p>
        <p class="stat-number">${hazardData.total}</p>
      </div>
    </div>
    
    <!-- Row 2: Two cards -->
    <div class="stats-row">
      <div class="stat-card">
        <p class="stat-label">Potentially Hazardous</p>
        <p class="stat-number">${hazardData.hazardous}</p>
        <p class="stat-rate">${hazardousRate}%</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">Non-Hazardous</p>
        <p class="stat-number">${hazardData.nonHazardous}</p>
        <p class="stat-rate">${nonHazardousRate}%</p>
      </div>
    </div>
    
    <!-- Row 3: Two cards -->
    <div class="stats-row">
      <div class="stat-card">
        <p class="stat-label">Would Leave Crater</p>
        <p class="stat-number">${crater.wouldCrater}</p>
        <p class="stat-rate">${craterRate}% (≥140m)</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">No Crater Impact</p>
        <p class="stat-number">${crater.noCrater}</p>
        <p class="stat-rate">${noCraterRate}% (<140m)</p>
      </div>
    </div>
  </div>

`;

  /*html*/
  return `
                <h2 class="view-title">📈 Statistics View</h2>
                <div class="todo-implementation">
                    <h3>TODO: Implement Statistics View</h3>
                    <p><strong>Your task:</strong> Calculate and display key insights from the data</p>
                    <p><strong>Good for:</strong> Understanding trends, making data-driven decisions, seeing the big picture</p>
                    <p><strong>Consider:</strong> Average ratings? Price distribution? Most common cuisines? Geographic spread?</p>
                    <p><strong>Total records:</strong> ${data.length} items to analyze</p>
                </div>
            `;
}

export default showStats
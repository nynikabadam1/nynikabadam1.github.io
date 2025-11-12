/**
 * STATS VIEW - STUDENTS IMPLEMENT
 * Show aggregate statistics and insights - good for understanding the big picture
 */

import data from "./load_data.js";
let objects = [];
objects = data();

let myChart = null;
let myChart2 = null;

function showStats(objects) {
  const statsGrid = document.querySelector('#stats-grid');
  statsGrid.innerHTML = '';    
  
  const hazardData = objects.reduce((acc, object) => {
    const isHazardous = object.is_potentially_hazardous_asteroid;
    
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

  // First chart
  setTimeout(() => {
    const ctx = document.getElementById('hazardChart');
    if (ctx) {
      if (myChart) {
        myChart.destroy();
      }
      
      myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Hazardous', 'Non-Hazardous'],
          datasets: [{
            label: 'Count',
            data: [hazardData.hazardous, hazardData.nonHazardous],
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(235, 166, 54, 0.7)'
            ],
            borderWidth: 1,
            hoverOffset: 15
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Asteroid Hazard Status Distribution',
              color: '#000',
              font: {
                size: 16
              }
            }
          }
        }
      });
    }
  }, 0);

  // Second chart - Scatter plot
const craterAsteroids = [];
const noCraterAsteroids = [];

objects.forEach(obj => {
  const diameter = obj.estimated_diameter?.meters?.estimated_diameter_max;
  const missDistance = obj.close_approach_data?.[0]?.miss_distance?.kilometers;
  
  if (diameter && missDistance) {
    const point = {
      x: parseFloat(diameter),
      y: parseFloat(missDistance)
    };
    
    if (diameter >= 140) {
      craterAsteroids.push(point);
    } else {
      noCraterAsteroids.push(point);
    }
  }
});

// Second chart - Scatter plot with two datasets
setTimeout(() => {
  const ctx = document.getElementById('craterChart');
  if (ctx) {
    if (myChart2) {
      myChart2.destroy();
    }
    
    myChart2 = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Would Leave Crater',
            data: craterAsteroids,
            backgroundColor: 'rgba(56, 144, 42, 0.7)',
            borderColor: 'rgba(91, 161, 92, 1)',
            borderWidth: 1,
            pointRadius: 5,
            pointHoverRadius: 7
          },
          {
            label: 'No Crater Impact',
            data: noCraterAsteroids,
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            pointRadius: 5,
            pointHoverRadius: 7
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            title: {
              display: true,
              text: 'Asteroid Diameter (meters)',
              color: '#000',
              font: {
                size: 14
              }
            }
          },
          y: {
            title: {
              display: true,
              text: 'Miss Distance (km)',
              color: '#000',
              font: {
                size: 14
              }
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              usePointStyle: true, // Use colored dots instead of rectangles
              padding: 15,
              font: {
                size: 12
              }
            }
          },
          title: {
            display: true,
            text: 'Asteroid Size vs Miss Distance',
            color: '#000',
            font: {
              size: 16
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ${context.parsed.x.toFixed(2)}m diameter, ${context.parsed.y.toLocaleString()}km miss distance`;
              }
            }
          }
        }
      }
    });
  }
}, 0);


    // checkStudentProgress();
    
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
    <div class="chart-container">
      <canvas id="hazardChart"></canvas>
    </div>
    <div class="chart-container">
      <canvas id="craterChart"></canvas>
    </div>
    
    <!-- Row 3: Two cards -->
 
  </div>


`;
    // <div class="stats-row">
    //   <div class="stat-card">
    //     <p class="stat-label">Potentially Hazardous</p>
    //     <p class="stat-number">${hazardData.hazardous}</p>
    //     <p class="stat-rate">${hazardousRate}%</p>
    //   </div>
    //   <div class="stat-card">
    //     <p class="stat-label">Non-Hazardous</p>
    //     <p class="stat-number">${hazardData.nonHazardous}</p>
    //     <p class="stat-rate">${nonHazardousRate}%</p>
    //   </div>
    // </div>
    //    <div class="stats-row">
    //   <div class="stat-card">
    //     <p class="stat-label">Would Leave Crater</p>
    //     <p class="stat-number">${crater.wouldCrater}</p>
    //     <p class="stat-rate">${craterRate}% (≥140m)</p>
    //   </div>
    //   <div class="stat-card">
    //     <p class="stat-label">No Crater Impact</p>
    //     <p class="stat-number">${crater.noCrater}</p>
    //     <p class="stat-rate">${noCraterRate}% (<140m)</p>
    //   </div>
    // </div>

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

export function checkStudentProgress() {
    // Check if they have global variables defined
    console.log('Student variables defined:');
    console.log('- myChart:', typeof window.myChart);
    
    // Check if their functions exist
    console.log('Student functions defined:');
    console.log('- createMyChart:', typeof createMyChart);
    }

export default showStats
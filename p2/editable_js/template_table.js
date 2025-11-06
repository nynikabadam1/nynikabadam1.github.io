
/**
 * TABLE VIEW - STUDENTS IMPLEMENT
 * Display data in sortable rows - good for scanning specific information
 */

import data from "./load_data.js";
let objects = [];
objects = data();

function showTable(objects) {
  // TODO: Students implement this function
  // Requirements:
  // - Show data in a table format
  // - Include all important fields
  // - Make it easy to scan and compare
  // - Consider adding sorting functionality
    const tableBody = document.querySelector('#restaurant-table tbody');
    tableBody.innerHTML = '';

    objects.forEach((object, index) => {
            if (index >= 50) return;

            const newRow = document.createElement("tr");

            const name = document.createElement("td");
            name.textContent = object.name;

            const diameter = document.createElement("td");
            diameter.textContent = object.estimated_diameter.meters.estimated_diameter_max;


            const hazard = document.createElement("td");
            hazard.textContent = object.is_potentially_hazardous_asteroid;

            const observation = document.createElement("td");
            observation.textContent = object.close_approach_data[0].close_approach_date_full;

            const miss = document.createElement("td");
            miss.textContent = object.close_approach_data[0].miss_distance.kilometers;
            
            newRow.appendChild(name);
            newRow.appendChild(diameter);
            newRow.appendChild(hazard);
            newRow.appendChild(observation);
            newRow.appendChild(miss);


            tableBody.appendChild(newRow);
        })
        
        console.log('Table view: Emphasizing safety record comparison');

          // return `
          //       <h2 class="view-title">📊 Table View</h2>
          //       <p class="view-description">Scan and compare asteroid data in a structured format</p>
          //       <div class="table-container">
          //       <table class="inspection-table">
          //           <thead>
          //           <tr>
          //               <th>Name</th>
          //               <th>Diameter</th>
          //               <th>Hazardous</th>
          //               <th>Close Approach Date</th>
          //               <th>Miss Distance</th>
          //           </tr>
          //           </thead>
          //           <tbody>
          //           ${tableBody}
          //           </tbody>
          //       </table>
          //       </div>
          //   `;
    }

export default showTable;
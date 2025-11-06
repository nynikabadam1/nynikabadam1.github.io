/**
 * CATEGORY VIEW - STUDENTS IMPLEMENT
 * Group data by categories - good for understanding relationships and patterns
 */

import data from "./load_data.js";
let objects = [];
objects = data();

function showCategories(objects) {
  const categorySection = document.querySelector('#categories');
  categorySection.innerHTML = '';    

  const categories = {
    'Less than 5 million km': [],
    '5-10 million km': [],
    '10-20 million km': [],
    '20-30 million km': [],
    '30-40 million km': [],
    '40-50 million km': [],
    '50-60 million km': [],
    'More than 60 million km': []
  };

  // Group objects into categories
  objects.forEach(object => {
    const missDistance = object.close_approach_data[0].miss_distance.kilometers;
    if (missDistance < 5000000) {
      categories['Less than 5 million km'].push(object);
    } else if (missDistance >= 5000000 && missDistance < 10000000) {
      categories['5-10 million km'].push(object);   
    } else if (missDistance >= 10000000 && missDistance < 20000000) { 
      categories['10-20 million km'].push(object);   
    } else if (missDistance >= 20000000 && missDistance < 30000000) {
      categories['20-30 million km'].push(object);
    } else if (missDistance >= 30000000 && missDistance < 40000000) {
      categories['30-40 million km'].push(object);
    } else if (missDistance >= 40000000 && missDistance < 50000000) {
      categories['40-50 million km'].push(object);
    } else if (missDistance >= 50000000 && missDistance < 60000000) {
      categories['50-60 million km'].push(object);
    } else {
      categories['More than 60 million km'].push(object);
    }
  });

  // Create tabs container
  const tabsContainer = document.createElement('div');
  tabsContainer.classList.add('tabs-container');
  
  // Create content container
  const contentContainer = document.createElement('div');
  contentContainer.classList.add('tab-content-container');

  // Create tabs and content for each category
  let firstTab = true;
  Object.entries(categories).forEach(([category, items], index) => {
    // Create tab button
    const tabButton = document.createElement('button');
    tabButton.classList.add('tab-button');
    if (firstTab) {
      tabButton.classList.add('active');
      firstTab = false;
    }
    tabButton.textContent = `${category} (${items.length})`;
    tabButton.dataset.category = category;
    
    // Create tab content
    const tabContent = document.createElement('div');
    tabContent.classList.add('tab-content');
    tabContent.dataset.category = category;
    if (index === 0) {
      tabContent.classList.add('active');
    }
    
    // Add items to tab content
    items.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('restaurant-card');
      itemDiv.innerHTML = `
        <p><strong>Name:</strong> ${item.name}</p>
        <p><strong>Last Observation Date:</strong> ${item.close_approach_data[0].close_approach_date_full}</p>
        <p><strong>Hazardous:</strong> ${item.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>
        <p><strong>Diameter (m):</strong> ${item.estimated_diameter.meters.estimated_diameter_max.toFixed(2)}</p>
        <p><strong>Miss Distance (km):</strong> ${parseFloat(item.close_approach_data[0].miss_distance.kilometers).toFixed(2)}</p>
      `;
      tabContent.appendChild(itemDiv);
    });
    
    tabsContainer.appendChild(tabButton);
    contentContainer.appendChild(tabContent);
  });

  tabsContainer.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
      tabsContainer.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
      contentContainer.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
      
      button.classList.add('active');
      const category = button.dataset.category;
      contentContainer.querySelector(`[data-category="${category}"]`).classList.add('active');
    });
  });

  categorySection.appendChild(tabsContainer);
  categorySection.appendChild(contentContainer);


  /*html*/
  // return `
  //               <h2 class="view-title">📂 Category View</h2>
  //               <div class="todo-implementation">
  //                   <h3>TODO: Implement Category View</h3>
  //                   <p><strong>Your task:</strong> Group the data by categories to show relationships</p>
  //                   <p><strong>Good for:</strong> Understanding patterns, finding similar items, exploring by type</p>
  //                   <p><strong>Consider:</strong> Group by cuisine? Neighborhood? Price range? What tells the best story?</p>
  //                   <p><strong>Available categories:</strong> ${[
  //                     ...new Set(data.map((item) => item.cuisine)),
  //                   ].join(", ")}</p>
  //               </div>
  //           `;
}

export default showCategories;
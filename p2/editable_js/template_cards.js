
/**
 * CARD VIEW - PROVIDED AS EXAMPLE
 * Display data as browsable cards - good for comparing individual items
 */
function showCards(data) {
  const cardHTML = data
    .map(
       /*html*/ 
      (object) => `
                <div class="restaurant-card">
                    <h3>${object.name} </h3>
                    <p><strong>Last Observation Date:</strong> ${object.close_approach_data[0].close_approach_date_full} </p>
                    <p><strong>Hazardous Material:</strong> ${object.is_potentially_hazardous_asteroid} </p>
                    <p><strong>Diameter(m):</strong> ${object.estimated_diameter.meters.estimated_diameter_max}</p>
                    <p><strong>Miss Distance(km):</strong> ${object.close_approach_data[0].miss_distance.kilometers}</p>
                </div>
            `
    )
    .join("");
     /*html*/ 
  return `
                <h2 class="view-title">☄️ Card View</h2>
                <p class="view-description">Browse asteroids as individual cards - perfect for comparing options</p>
                <div class="card-grid">
                    ${cardHTML}
                </div>
            `;
}

export default showCards;
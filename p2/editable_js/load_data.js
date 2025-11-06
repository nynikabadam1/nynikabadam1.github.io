// ============================================
// DATA LOADING - Students modify this
// ============================================
/**
 * Load data from API - Students replace with their chosen endpoint
 */
async function loadData() {
  try {
    // TODO: Replace with student's chosen API
    // Examples:
    // const response = await fetch('https://data.princegeorgescountymd.gov/resource/xxxx.json');
    // const response = await fetch('https://api.nasa.gov/neo/rest/v1/feed?api_key=DEMO_KEY');
    // const data = await response.json();

    const startDate = '2024-10-01';
    const endDate = '2024-10-08'; 
    
    const response = await fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=8lNHKymNOBUpMXTZKIZRhVdsTE5ykbWzAsJ3TU8J`
    );
    const result = await response.json();
    console.log("data loaded", result);

    const data = [];
    Object.keys(result.near_earth_objects).forEach(date => {
      result.near_earth_objects[date].forEach(neo => {
        data.push(neo);
      });
    });
    
    console.log("Flattened data:", data);
    console.log("Total asteroids:", data.length);
    console.log("Sample asteroid:", data[0]);

    return data;
    
    // Simulate API delay
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // return mockRestaurantData;
  } catch (error) {
    console.error("Failed to load data:", error);
    throw new Error("Could not load data from API");
  }
}

export default loadData

// async function loadData() {
//   try {
//     const url = 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+top+100+pl_name,hostname,sy_dist,pl_orbper,pl_rade,st_teff,disc_year,discoverymethod+from+ps+where+default_flag=1&format=csv';
    
//     const response = await fetch(url);
//     const csvText = await response.text();
    
//     // Parse CSV
//     const lines = csvText.trim().split('\n');
//     const headers = lines[0].split(',');
//     const data = lines.slice(1).map(line => {
//       const values = line.split(',');
//       return headers.reduce((obj, header, i) => {
//         obj[header.trim()] = values[i];
//         return obj;
//       }, {});
//     });
    
//     return data;
//   } catch (error) {
//     console.error("API failed:", error);
//   }
// }
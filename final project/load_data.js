//sunrise, sunset, daylength data from https://www.timeanddate.com/sun/usa/baltimore
//for every other day from Dec 1 to Dec 13, 2024

let sunsets =[];
let sunrises =[];
let daylengths =[];

async function loadData() {
  try {
    const response = await fetch('data.json');
    if (!response.ok)
      throw new Error(`HTTP error! status: ${response.status}`)

    const result = await response.json();
    sunsets = result.sunsets;

    console.log("data loaded", result);
    return result;
  
} catch (error) {
    statusDisplay.className = 'status-display error';
    console.error(error);
}
}

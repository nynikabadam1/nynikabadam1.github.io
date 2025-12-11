
let sunsets =[];
let sunrises =[];
let daylengths =[];

async function loadData() {
  try {
    console.log("loading data...");
    const response = await fetch('data.json');
    if (!response.ok)
      throw new Error(`HTTP error! status: ${response.status}`)

    const result = await response.json();
    sunsets = result.map(item => item.sunset);
    sunrises = result.map(item => item.sunrise);
    daylengths = result.map(item => item.daylength);

    console.log("data loaded", result);
    return result;
  
} catch (error) {
    statusDisplay.className = 'status-display error';
    console.error(error);
}
}

gsap.registerPlugin(ScrollTrigger);

(async () => {
  await loadData();

//INTRO
gsap.to(".intro", {
  scrollTrigger:{
    trigger: ".intro",
    start: "center center",
    end: "bottom top",
    pin: true,
    scrub: true,
    markers: true
  },
  x: 2000,
  duration: 5
}, 0);

gsap.to(".intro2", {
  scrollTrigger:{
    trigger: ".intro2",
    start: "center center",
    end: "bottom top",
    pin: true,
    scrub: true,
    markers: true
  },
  x: 2000,
  duration: 5
}, 0);

gsap.to(".intro3", {
  scrollTrigger:{
    trigger: ".intro3",
    start: "center center",
    end: "bottom top",
    pin: true,
    scrub: true,
    markers: true
  },
  x: 2000,
  duration: 5
}, 0);

//change background color
gsap.timeline({
  scrollTrigger: {
    trigger: ".intro-section",
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
        // markers: true
  }
})
.to(".intro-section", 
  {
  backgroundColor: gsap.getProperty("html", "--background-color3"),
  duration:1
  }, 0)
.to(".intro-section", {
  backgroundColor: gsap.getProperty("html", "--background-color1"),
  duration:1
}, 1);

//SUNSET TIME SCROLL
const sunsetText = document.querySelector('.time-text');

if (sunsetText && sunsets.length > 0) {
  sunsetText.textContent = sunsets[0];
  let currentIndex = 0; 

  const sunImage = document.querySelector('.sun-image');
  const sunHeight = sunImage ? sunImage.offsetHeight : 450; 

  gsap.timeline({
    scrollTrigger: {
      trigger: ".intro4", 
      start: "top top",
      end: `+=${sunsets.length * 100}%`,        
      pin: true,
      scrub: 1,
      markers: true,
      onUpdate: (self) => {
        // TIME CHANGING
        const newIndex = Math.min(
          Math.floor(self.progress * sunsets.length),
          sunsets.length - 1
        );
        
        if (newIndex !== currentIndex) {
          gsap.to(sunsetText, {
            y: -50,
            opacity: 0,
            duration: 0.1,
            ease: "power2.in",
            onComplete: () => {
              sunsetText.textContent = sunsets[newIndex];
              gsap.set(sunsetText, { y: 50, opacity: 0 });
              gsap.to(sunsetText, {
                y: 0,
                opacity: 1,
                duration: 0.1,
                ease: "power2.out"
              });
            }
          });
          currentIndex = newIndex; 
        }

        // SUN CLIPPING AND MOVEMENT 
        const progress = self.progress;
        const pixelsMoved = progress * sunHeight; 
        
        gsap.set(".sun-image", {
          y: pixelsMoved,
          clipPath: `inset(0 0 ${pixelsMoved}px 0)` 
        });
      } 
    }
  });
}

//NO CHOICE PAGE
function splitText1(selector) {
  const element = document.querySelector(selector);
  const text = element.textContent;
  const chars = text.split('');
  
  element.innerHTML = chars
    .map(char => {
      if (char === ' ') {
        return '<span class="char">&nbsp;</span>';
      }
      return `<span class="char">${char}</span>`;
    })
    .join('');
  
  return document.querySelectorAll(`${selector} .char`);
}

const chars1 = splitText1(".nochoice p");
const chars2 = splitText1(".whatif p");

gsap.set(chars1, { opacity: 1 });
gsap.set(chars2, { opacity: 0 });

gsap.to(chars1, {
  opacity: 0,
  duration: 0,
  stagger: 0.05,
  scrollTrigger: {
    trigger: "#nochoice-section",
    start: "top top",
    end: "+=150%",
    pin: true,
    scrub: true,
    // markers: true
  }
});

gsap.set(".candle2", { opacity: 0 });
gsap.set(".candle1", { opacity: 1 });
//WHAT IF PAGE
gsap.timeline({
  scrollTrigger: {
    trigger: "#whatif-section",
    start: "top top",
    end: "+=150%",
    pin: true,
    scrub: true,
    // markers: true
  }
})
.to(chars2, {
  opacity: 1,
  duration: 0,
  stagger: 0.05
}, 0)
.to(".candle1", {
  opacity: 1,
  duration: 0
}, 0)
.to(".candle1", {
  opacity: 0,
  duration: 0
}, 0.9)
.to(".candle2", {
  opacity: 1,
  duration: 0
}, 0.9);

})();


// const sunsetText = document.querySelector('.time-text');

// if (sunsetText && sunsets.length > 0) {
//   sunsetText.textContent = sunsets[0];
//   let currentIndex = 0; 

//   gsap.to({}, {
//     scrollTrigger: {
//       trigger: ".intro4", 
//       start: "top top",
//       end: `+=${sunsets.length * 100}%`,        
//       pin: true,
//       scrub: 1,
//       markers: true,
//       onUpdate: (self) => {
//         const newIndex = Math.min(
//           Math.floor(self.progress * sunsets.length),
//           sunsets.length - 1
//         );
        
//         if (newIndex !== currentIndex) {
//           gsap.to(sunsetText, {
//             y: -50,
//             opacity: 0,
//             duration: 0.1,
//             ease: "power2.in",
//             onComplete: () => {
//               sunsetText.textContent = sunsets[newIndex];
//               gsap.set(sunsetText, { y: 50, opacity: 0 });
//               gsap.to(sunsetText, {
//                 y: 0,
//                 opacity: 1,
//                 duration: 0,
//                 ease: "power2.out"
//               });
//             }
//           });
//           currentIndex = newIndex; 
//         }
//       } 
//     } 
//   }); 
// }

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
const mm = gsap.matchMedia();


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
    // markers: true
  },
  x: 2500,
  duration: 5
}, 0);

gsap.to(".intro2", {
  scrollTrigger:{
    trigger: ".intro2",
    start: "center center",
    end: "bottom top",
    pin: true,
    scrub: true,
    pinSpacing: true,
    anticipatePin: 1,
    // markers: true
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
    pinSpacing: true,
    anticipatePin: 1,
    // markers: true
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
  // const scrollMultiplier = getScrollMultiplier();

  gsap.timeline({
    scrollTrigger: {
      trigger: ".intro4", 
      start: "top top",
      // end: `+=${sunsets.length * 100 * scrollMultiplier}%`,        
      end: `+=${sunsets.length * 100}%`,        
      pin: true,
      scrub: 1,
      pinSpacing: true,
      anticipatePin: 1,
      // markers: true,
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
  if (!element) return [];

  const text = element.textContent;
  const chars = text.split('');
  
  element.innerHTML = chars
    .map(char => char === ' '
      ? '<span class="char">&nbsp;</span>'
      : `<span class="char">${char}</span>`
    )
    .join('');

  return element.querySelectorAll('.char');
}

const chars1 = splitText1(".nochoice p");
const chars2 = splitText1(".whatif p");

if (chars1.length && chars2.length) {
  gsap.set(chars1, { opacity: 1 });
  gsap.set(chars2, { opacity: 0 });
}

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
    pinSpacing: true,
    anticipatePin: 1,
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
    pinSpacing: true,
    anticipatePin: 1,
    // markers: true
  }
})
.to(chars2, {
  opacity: 1,
  duration: 0,
  stagger: 0.05,
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

//SWITCH CLICK
const switchImage = document.querySelector('.switch-image');
const switchImageOn = document.querySelector('.switch2-image');
const lightsImage = document.querySelector('.lights-image');
const lightsImageOn = document.querySelector('.lights2-image');
const oval1 = document.querySelector('.oval1-image');
const text1 = document.querySelector('.activities1-text');
const text2 = document.querySelector('.activities2-text');
const arrow1 = document.querySelector('.arrow1-image');
const arrow2 = document.querySelector('.arrow2-image');

let isLightsOn = false;

if (switchImage) {
  switchImage.addEventListener('click', () => {
    if (!isLightsOn) {
      gsap.to(switchImage, { opacity: 0, duration: 0.3 });
      gsap.to(switchImageOn, { display: 'block', opacity: 1, duration: 0.3 });
      
      gsap.to(lightsImage, { opacity: 0, duration: 0.5 });
      gsap.to(lightsImageOn, { display: 'block', opacity: 1, duration: 0.5 });

      gsap.to(text1, { opacity: 0, duration: 0.1 });
      gsap.to(text2, { opacity: 1, duration: 0.1, delay: 0.2 });
      gsap.to(arrow2, { opacity: 1, duration: 0.1, delay: 0.2 });
      gsap.to(arrow1, { opacity: 0, duration: 0.1 });
      
      // Reveal new elements
      gsap.to(oval1, { opacity: 1, duration: 0.2, delay: 0.2 });

      isLightsOn = true;
    } else {
      // Switch to OFF state
      gsap.to(switchImage, { opacity: 1, duration: 0.3 });
      gsap.to(switchImageOn, { opacity: 0, duration: 0.3, onComplete: () => {
        gsap.set(switchImageOn, { display: 'none' });
      }});
      
      gsap.to(lightsImage, { opacity: 1, duration: 0.5 });
      gsap.to(lightsImageOn, { opacity: 0, duration: 0.5, onComplete: () => {
        gsap.set(lightsImageOn, { display: 'none' });
      }});
      
      // Hide elements
      gsap.to(oval1, { opacity: 0, duration: 0.3 });
      
      isLightsOn = false;
    }
  });
  
  // Make switch clickable
  switchImage.style.cursor = 'pointer';
}

//RECORD CLICK
const recordImage = document.querySelector('.record-image');
const recordImageOn = document.querySelector('.record2-image');
const musicNotes = document.querySelectorAll('.music-notes');
const text3 = document.querySelector('.activities3-text');
const oval2 = document.querySelector('.oval2-image');

let recordPressed = false;

if (recordImage) {
  recordImage.addEventListener('click', () => {
    if (!recordPressed) {
      gsap.to(recordImage, { opacity: 0, duration: 0.3 });
      gsap.to(recordImageOn, { display: 'block', opacity: 1, duration: 0.3 });

      gsap.to(text2, { opacity: 0, duration: 0.1 });
      gsap.to(arrow2, { opacity: 0, duration: 0.1 });
      gsap.to(text3, { opacity: 1, duration: 0.1, delay: 0.2 });
      
      gsap.to(oval2, { opacity: 1, duration: 0.2, delay: 0.2 });
      gsap.to(musicNotes, { opacity:1, duration: 0.5, delay: 0.2 });
      
      recordPressed = true;
    } else {
      gsap.to(recordImage, { opacity: 1, duration: 0.3 });
      gsap.to(arrow2, { opacity: 1, duration: 0.1 });
      gsap.to(recordImageOn, { opacity: 0, duration: 0.3, onComplete: () => {
        gsap.set(recordImageOn, { display: 'none' });
      }});
      
      gsap.to(oval2, { opacity: 0, duration: 0.3 });
      
      recordPressed = false;
    }
  });
    recordImage.style.cursor = 'pointer';

}

})();

//RESPONSIVENESS
mm.add("(min-width: 769px)", () => {

  gsap.utils.toArray(".reveal").forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

});

mm.add("(max-width: 768px)", () => {

  gsap.utils.toArray(".reveal").forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power1.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

});





// import loadData from "./load_data";

// async function main() {
//     const data = await loadData();
//     console.log(data);
// }
// main();

//change background color
gsap.registerPlugin(ScrollTrigger);

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

// gsap.to(".intro4", {
//   scrollTrigger:{
//     trigger: ".intro4",
//     start: "center center",
//     end: "bottom top",
//     pin: true,
//     scrub: true,
//     markers: true
//   },
//   x: 2000,
//   duration: 5
// }, 0);

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

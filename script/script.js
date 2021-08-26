const locoScroller = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
  });

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);
  
  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("[data-scroll-container]", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
  });



// *********************************************************************************************
//                              Hier de scrolltrigger code
// *********************************************************************************************

function headingscene () {
  let headingtl = gsap.timeline();
  headingtl.from('.appearingtext', {
    y: 100,
    duration: .3,
    stagger: .5,
    ease: Power4.easeOut
  })
  .from('.textduplication', {
    opacity: 0
  }, '-=0.07')
  .from('.textduplication', {
    y: -60,
    duration: .3,
    ease: Back.easeOut.config(1.7)
  })
  .from('.appearingtext2', {
    y: 100,
    duration: .3,
    ease: Power4.easeOut
  })
  .to('.fontweight', {
    fontWeight: 500,
    duration: 1
  })
  .from('.appearingtext90deg', {
    x: 300,
    duration: .3,
    ease: Back.easeOut.config(1.7)
  }, '<.8')

  .from('.navbtn', {
    opacity: 0,
    duration: 2,
    ease: Power4.easeOut
  })
}

let master = gsap.timeline()
.add(headingscene())

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
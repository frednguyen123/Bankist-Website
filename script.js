'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);  

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Scrolling

// 1
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e){
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);

  // Scrolling
  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // })

  section1.scrollIntoView({behavior: 'smooth'});

})

// Hovering Heading
// const h1 = document.querySelector('h1');

// const alertH1 = function(e) {
//   alert('addEventListener: Great! You are reading the heading :D')
//   h1.removeEventListener('mouseenter', alertH1)
// }

// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000)

// h1.onmouseenter = function(e){
//   alert('onmouseenter: Great you are reading the heading :D')
// }

///////////////////////////////////////
// Page Navigation

/**
 * This would be incorrect because if we have 100 event listeners it would
 * create a function for all of them which would be inefficient 
 */
// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click', function(e) {
//     e.preventDefault();
//     // console.log('LINK');
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault();
  // console.log(e.target);

  // Matching Strategy
  if (e.target.classList.contains('nav__link')){
    // console.log('LINK');
    const id = e.target.getAttribute('href');
    // console.log(id);
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
});

///////////////////////////////////////
// Tabbed Component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// Not Efficient to add event listener to each tab, if 100 tabs.
// tabs.forEach(t=>t.addEventListener('click', ()=> console.log('TAB')));

tabsContainer.addEventListener('click', function(e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  // Guard Clause
  if(!clicked) return;

  // Remove Active tab
  tabs.forEach(t=>t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c=>c.classList.remove(`operations__content--active`));
 
  // Active Tab
  clicked.classList.add('operations__tab--active');

  // Active content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add(`operations__content--active`);
})

///////////////////////////////////////
// Menu Fade Animation

const nav = document.querySelector('.nav');

// MAKE DRY
// nav.addEventListener('mouseover', function(e){
//   if(e.target.classList.contains('nav__link')){
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach((el) => {
//       if(el !== link){
//         // console.log(el);
//         el.style.opacity = 0.5;
//       }
//     });
//     logo.style.opactity = 0.5;
//   }
// });

// nav.addEventListener('mouseout', function(e){
//   if(e.target.classList.contains('nav__link')){
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach((el) => {
//       if(el !== link){
//         // console.log(el);
//         el.style.opacity = 1;
//       }
//     });
//     logo.style.opactity = 1;
//   }
// })

const handleHover = function(e) {
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach((el) => {
      if(el !== link){
        // console.log(el);
        el.style.opacity = this;
      }
    });
    logo.style.opactity = this;
  }
}

// GET RID OF CALLBACK FUNCTION
// nav.addEventListener('mouseover', function(e){
//   handleHover(e, 0.5);
// })
// nav.addEventListener('mouseout', function(e){
//   handleHover(e, 1);
// })

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

///////////////////////////////////////
// Sticky Navigation
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function (e){
//   console.log(window.scrollY);

//   if(window.scrollY > initialCoords.top){
//     nav.classList.add('sticky');
//   }
//   else{
//     nav.classList.remove('sticky');
//   }
// })

///////////////////////////////////////
// Sticky Navigation: Intersection Observer API

// const obsCallback = function (entries, observer){
//   entries.forEach(entry => {
//     console.log(entry)
//   })
// }

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2]
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');

const stickyNav = function(entries){
  const [entry] = entries;
  // console.log(entry);

  if(!entry.isIntersecting)
    nav.classList.add('sticky');
  else
    nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver
(
  stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: '-90px',
  });

  headerObserver.observe(header);

///////////////////////////////////////
// Reveal Elements on Scroll

const allSections = document.querySelectorAll('.section')

const revealSection = function(entries, observer){
  const [entry] = entries;
  // console.log(entry);

  if(!entry.isIntersecting)
    return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver
(revealSection, {
    root: null,
    threshold: 0.15
});

allSections.forEach(function(section){
  sectionObserver.observe(section);
  // section.classList.add('section--hidden')
})

///////////////////////////////////////
// Lazy Loading Images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries; 
  // console.log(entry);

  if(!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src

  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, 
{
  root: null,
  threshold: 0,
  rootMargin: '200px'
});

imgTargets.forEach(img => imgObserver.observe(img))

///////////////////////////////////////
// Slider

const slider = function(){
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // ALL SLIDES VISIBLE
  // const slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.4) translateX(-800px)';
  // slider.style.overflow = 'visible'

  // ORIGINAL TRANSLATE ON IMAGES
  // slides.forEach((s, i) => s.style.transform = `translateX(${100 * i}%)`);
  // 0%, 100%, 200%, 300%

  const createDots = function(){
    slides.forEach(function(_, i){
      dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
    });
  };

  const activateDot = function(slide) {
    document.querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList
    .remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`) 
    .classList.add('dots__dot--active');
  }

  const goToSlide = function(slide){
    slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`);
  }

  // // Next slide
  // // curSlide = 1: -100%, 0%, 100%, 200%
  // btnRight.addEventListener('click', function(){

  //   if(curSlide === maxSlide - 1){
  //     curSlide = 0;
  //   }
  //   else{
  //     curSlide++;
  //   }

  //   goToSlide(curSlide);
  // })

  // Refactored Next slide
  const nextSlide = function() {
    if(curSlide === maxSlide - 1){
      curSlide = 0;
    }
    else{
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  }

  const prevSlide = function(){
    // curSlide--;
    if(curSlide === 0){
      curSlide = maxSlide-1;
    }
    else{
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  }

  const init = function(){
    goToSlide(0);
    createDots();
    activateDot(0);
  }
  init();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    // console.log(e);
    if(e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowFight' && nextSlide();
  });

  dotContainer.addEventListener('click', function(e){
    if(e.target.classList.contains('dots__dot')){
      const {slide} = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
}

slider();

///////////////////////////////////////
// Lifecycle DOM

document.addEventListener('DOMContentLoaded',
  function(e){
  console.log('HTML parsed and DOM tree built!', e);
});

window.addEventListener('load', function(e){
  console.log('Page fully loaded', e);
})

// window.addEventListener('beforeunload', function(e){
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// })





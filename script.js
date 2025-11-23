function locoScroll() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
locoScroll();

function cursorEffect() {
    var content = document.querySelector('.main-content');
    var circle = document.querySelector('.circle');

    content.addEventListener('mousemove', function (dets) {
        gsap.to(circle, {
            x: dets.x,
            y: dets.y
        })
    })
    content.addEventListener('mouseenter', function (dets) {
        gsap.to(circle, {
            scale: 1,
            opacity: 1
        })
    })
    content.addEventListener('mouseleave', function (dets) {
        gsap.to(circle, {
            scale: 0,
            opacity: 0
        })
    })
}
cursorEffect();

function Page2Animation() {
    gsap.from('.element h1', {
        y: 120,
        opacity: 0,      // start invisible
        stagger: 0.2,
        duration: 3,     // slow animation
        scrollTrigger: {
            trigger: '#page-2',
            start: 'top 46%',
            scroller: '.main',
            end: 'top 47%',
            // markers: true,
            scrub: 1
        }
    });
}
Page2Animation();

function SvgAnimation() {

    // If SMIL animateTransform isn't running (some browsers or environments),
    // use JS fallback: rotate the dot group via requestAnimationFrame.
    const smil = document.getElementById('smilOrbit');
    const dotGroup = document.getElementById('dotGroup');
    let smilWorks = false;

    // Quick detection: try to get current transform from the SMIL animation
    // or check computed animations via getAnimations (where supported)
    try {
        if (smil && typeof smil.getCurrentTime === 'function') {
            // Some engines expose methods; try to poke it.
            smilWorks = true; // optimistic: assuming it's present will usually work
        } else if (dotGroup.getAnimations) {
            // If there is an active animation produced by SMIL, it will be reported
            const anims = dotGroup.getAnimations().filter(a => a.animationName === 'smilOrbit' || true);
            if (anims && anims.length) smilWorks = anims.some(a => a.playState !== 'idle');
        }
    } catch (e) {
        smilWorks = false;
    }

    // Also respect prefers-reduced-motion: if user requests reduction, disable animation
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
        // do not run fallback
        return;
    }

    // If SMIL is not supported or disabled, run JS fallback
    if (!smilWorks) {
        // Remove smil element to avoid any partial behavior
        if (smil && smil.parentNode) smil.parentNode.removeChild(smil);

        // We'll rotate around center (50,50). Keep duration in ms
        const duration = 2800; // 2.8s
        let start = null;
        function tick(ts) {
            if (!start) start = ts;
            const elapsed = (ts - start) % duration;
            const t = elapsed / duration; // 0..1
            const deg = 360 * t;
            // apply rotation transform centered at 50 50 (SVG coords)
            // we set the transform attribute on the group
            dotGroup.setAttribute('transform', 'rotate(' + deg.toFixed(3) + ' 50 50)');
            window.requestAnimationFrame(tick);
        }
        window.requestAnimationFrame(tick);
    } else {
        // SMIL seems active — ensure it is playing
        try {
            if (dotGroup.getAnimations) {
                dotGroup.getAnimations().forEach(a => a.play());
            }
        } catch (e) {/*ignore*/ }
    }
}
SvgAnimation()

function cursorEffectBlack() {
    var content = document.querySelector('#page4');
    var circleBlack = document.querySelector('.circleBlack');

    content.addEventListener('mousemove', function (dets) {
        gsap.to(circleBlack, {
            x: dets.x,
            y: dets.y
        })
    })
    content.addEventListener('mouseenter', function (dets) {
        gsap.to(circleBlack, {
            scale: 1,
            opacity: 1
        })
    })
    content.addEventListener('mouseleave', function (dets) {
        gsap.to(circleBlack, {
            scale: 0,
            opacity: 0
        })
    })
}
cursorEffectBlack();

function swiperAnimation() {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: true,
        },
    });
}
swiperAnimation();

function loderAnimation() {
    var tl = gsap.timeline();
    tl.from("#loader h3", {
        x: 40,
        opacity: 0,
        stagger: 0.3,
        duration: 1,
    })
    tl.to("#loader", {
        opacity: 0
    })
    tl.to("#loader", {
        display: "none"
    })
    tl.from(".main-content h1 span", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
    })
}
loderAnimation()
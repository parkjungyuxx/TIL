import React, { useEffect, useRef, useState } from "react";
import toyStory from "../../assets/images/toystory.png";
import penguin from "../../assets/images/penguin.png";
import brush from "../../assets/images/brush.svg";
import jungyu from "../../assets/images/jungyu.png";
import suji from "../../assets/images/suji.png";
import yebin from "../../assets/images/yebin.png";
import youbin from "../../assets/images/youbin.png";
import cat from "../../assets/images/cat.jpeg";
import background from "../../assets/images/background.svg";
import text from "../../assets/images/text.svg";
import darkmode from "../../assets/images/darkmode.svg";
import card from "../../assets/images/card.svg";
import fire from "../../assets/images/fire.svg";

const GsapExample = () => {
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const slidingTextRef = useRef(null);
  const imageMotionRef = useRef(null);
  const imageSimpleRef = useRef(null);
  const sectionRefs = useRef([]);
  const cardRefs = useRef([]);
  const teamSectionRef = useRef([]);
  const leftTextRefs = useRef([]);
  const rightTextRefs = useRef([]);
  const teamImageRefs = useRef([]);
  const fireLeftRef = useRef(null);
  const fireRightRef = useRef(null);

  useEffect(() => {
    // GSAP 로드
    if (!window.gsap) {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
      script.async = true;
      script.onload = () => {
        // ScrollTrigger 플러그인도 로드
        const scrollTriggerScript = document.createElement("script");
        scrollTriggerScript.src =
          "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js";
        scrollTriggerScript.async = true;
        scrollTriggerScript.onload = () => {
          window.gsap.registerPlugin(window.ScrollTrigger);
          setGsapLoaded(true);
        };
        document.head.appendChild(scrollTriggerScript);
      };
      document.head.appendChild(script);
    } else {
      setGsapLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (gsapLoaded && window.gsap) {
      // 약간의 지연 후 애니메이션 실행
      const timer = setTimeout(() => {
        initAnimations();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [gsapLoaded]);

  const initAnimations = () => {
    if (!window.gsap) return;

    const { gsap } = window;

    // 초기 상태 설정
    if (titleRef.current) {
      gsap.set(titleRef.current, { y: 60, opacity: 0 });
    }
    if (subtitleRef.current) {
      gsap.set(subtitleRef.current, { y: 40, opacity: 0 });
    }

    // 슬라이딩 텍스트 초기 상태
    if (slidingTextRef.current) {
      gsap.set(slidingTextRef.current, { y: 20, opacity: 0 });
    }

    // 이미지들 초기 상태 - 화면 밖에서 시작
    if (imageMotionRef.current) {
      gsap.set(imageMotionRef.current, {
        x: -200,
        y: -100,
        opacity: 0,
        scale: 0.3,
        rotation: -45,
      });
    }
    if (imageSimpleRef.current) {
      gsap.set(imageSimpleRef.current, {
        x: 200,
        y: 100,
        opacity: 0,
        scale: 0.3,
        rotation: 45,
      });
    }

    // 섹션들 초기 상태
    sectionRefs.current.forEach((section) => {
      if (section) {
        gsap.set(section, { y: 80, opacity: 0 });
      }
    });

    // 카드들 초기 상태
    cardRefs.current.forEach((card) => {
      if (card) {
        gsap.set(card, { y: 60, opacity: 0, scale: 0.9 });
      }
    });

    // 팀 섹션 요소들 초기 상태
    leftTextRefs.current.forEach((leftText) => {
      if (leftText) {
        gsap.set(leftText, { x: -200, opacity: 0 });
      }
    });

    rightTextRefs.current.forEach((rightText) => {
      if (rightText) {
        gsap.set(rightText, { x: 200, opacity: 0 });
      }
    });

    teamImageRefs.current.forEach((image) => {
      if (image) {
        gsap.set(image, { scale: 0, opacity: 0, rotation: 180 });
      }
    });

    // 페이지 로드 애니메이션
    const mainTl = gsap.timeline();

    // 히어로 섹션 애니메이션
    if (titleRef.current) {
      mainTl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      });
    }

    if (subtitleRef.current) {
      mainTl.to(
        subtitleRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.7"
      );
    }

    // 슬라이딩 텍스트 애니메이션
    if (slidingTextRef.current) {
      mainTl.to(
        slidingTextRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      );

      // 슬라이딩 텍스트 무한 루프 시작
      mainTl.call(() => {
        startSlidingTextAnimation();
      });
    }

    // 이미지 애니메이션 - 텍스트 완료 후 날아오기
    if (imageMotionRef.current) {
      mainTl.to(
        imageMotionRef.current,
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );
    }

    if (imageSimpleRef.current) {
      mainTl.to(
        imageSimpleRef.current,
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "back.out(1.7)",
        },
        "-=0.8"
      ); // Motion 이미지와 겹치게
    }

    // 섹션별 애니메이션
    sectionRefs.current.forEach((section, index) => {
      if (section) {
        mainTl.to(
          section,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          index * 0.3 + 1.5
        );
      }
    });

    // 카드 애니메이션
    const validCards = cardRefs.current.filter(
      (card) => card !== null && card !== undefined
    );
    if (validCards.length > 0) {
      mainTl.to(
        validCards,
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      );
    }

    // 팀 섹션 애니메이션 - 스크롤 트리거 사용
    setupTeamSectionAnimation();

    // 불꽃 애니메이션 시작
    startFireAnimation();
  };

  const setupTeamSectionAnimation = () => {
    if (!window.gsap) return;

    const { gsap } = window;

    // 각 팀 멤버별로 애니메이션 설정
    teamSectionRef.current.forEach((teamMember, index) => {
      if (teamMember) {
        const leftText = leftTextRefs.current[index];
        const rightText = rightTextRefs.current[index];
        const image = teamImageRefs.current[index];

        // 스크롤 시 순차적으로 애니메이션
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: teamMember,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });

        // 왼쪽 텍스트 애니메이션
        if (leftText) {
          tl.to(leftText, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          });
        }

        // 이미지 애니메이션 (중앙에서 회전하며 나타남)
        if (image) {
          tl.to(
            image,
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 0.6,
              ease: "back.out(1.7)",
            },
            "-=0.6"
          );
        }

        // 오른쪽 텍스트 애니메이션
        if (rightText) {
          tl.to(
            rightText,
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.6"
          );
        }
      }
    });
  };

  const startFireAnimation = () => {
    if (!window.gsap) return;

    const { gsap } = window;

    // 왼쪽 불꽃 애니메이션
    if (fireLeftRef.current) {
      gsap.to(fireLeftRef.current, {
        scale: 1.1,
        rotation: "5deg",
        duration: 0.8,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        transformOrigin: "bottom center",
      });

      // 추가적인 흔들림 효과
      gsap.to(fireLeftRef.current, {
        x: "random(-3, 3)",
        y: "random(-2, 2)",
        duration: 0.5,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });
    }

    // 오른쪽 불꽃 애니메이션 (약간 다른 타이밍으로)
    if (fireRightRef.current) {
      gsap.to(fireRightRef.current, {
        scale: 1.15,
        rotation: "-8deg",
        duration: 1,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        transformOrigin: "bottom center",
        delay: 0.2,
      });

      // 추가적인 흔들림 효과
      gsap.to(fireRightRef.current, {
        x: "random(-4, 4)",
        y: "random(-3, 3)",
        duration: 0.6,
        ease: "none",
        repeat: -1,
        yoyo: true,
        delay: 0.3,
      });
    }
  };

  const startSlidingTextAnimation = () => {
    if (!window.gsap || !slidingTextRef.current) return;

    const { gsap } = window;
    const container = slidingTextRef.current;

    // 텍스트 배열
    const textArray = [
      "🏆 Park Jungyu",
      "🏆 Hwang Suji",
      "🏆 Lee Yebin",
      "🏆 Han Youbin",
      "🏆 Kim Kisu",
    ];

    // 텍스트를 반복해서 매끄러운 루프 만들기
    const repeatedTexts = [...textArray, ...textArray];

    // 컨테이너에 텍스트들을 동적으로 생성
    container.innerHTML = repeatedTexts
      .map(
        (text) =>
          `<span class="inline-block px-8 whitespace-nowrap">${text}</span>`
      )
      .join("");

    // 전체 너비 계산
    const totalWidth = container.scrollWidth;
    const singleSetWidth = totalWidth / 2; // 텍스트 배열이 2번 반복되므로

    // 무한 슬라이드 애니메이션
    gsap.fromTo(
      container,
      { x: 0 },
      {
        x: -singleSetWidth,
        duration: 15, // 천천히 움직임
        ease: "none",
        repeat: -1,
      }
    );
  };

  return (
    <div className="bg-white min-h-screen w-full">
      {/* Hero Section */}
      <section
        ref={heroRef}
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
        className="min-h-screen w-full flex flex-col justify-start items-center px-6 bg-gradient-to-b from-white to-white pt-40 bg-no-repeat relative"
      >
        <img src={text} alt="" className="absolute right-60" />
        <button className="absolute bottom-56 left-224 cursor-pointer">
          <img src={darkmode} alt="" />
        </button>
        <button className="bg-[#F45A5A] absolute bottom-36 left-198 px-[98px] py-3 rounded-[4.73px] border-2 border-black border-b-5 cursor-pointer">
          Start To Draw
        </button>
      </section>
      {/* Whats hot */}
      <div className="flex justify-center items-center mt-20 ">
        <section className="py-20 px-6 relative  bg-[#222222]/[0.87] w-[1156px] h-[569px] flex flex-col justify-center items-center rounded-[24px]">
          <div className="text-[64px] text-white flex justify-center items-center gap-[24px]">
            <img
              ref={fireLeftRef}
              src={fire}
              alt="fire left"
              className="-mt-[124px]"
            />
            What's Hot
            <img
              ref={fireRightRef}
              src={fire}
              alt="fire right"
              className="-mt-[124px]"
            />
          </div>
          <div className="flex gap-[50px] mt-[18px]">
            <img src={card} alt="" />
            <img src={card} alt="" />
            <img src={card} alt="" />
            <img src={card} alt="" />
          </div>
        </section>
      </div>

      {/* Team Section with Animation */}
      <section className="mt-64">
        <div className="flex flex-col justify-center items-center gap-10">
          <div
            ref={(el) => (teamSectionRef.current[0] = el)}
            className="flex items-center text-9xl"
          >
            <span ref={(el) => (leftTextRefs.current[0] = el)}>Yu</span>
            <img
              ref={(el) => (teamImageRefs.current[0] = el)}
              src={youbin}
              alt="youbin"
              className="w-40"
            />
            <span ref={(el) => (rightTextRefs.current[0] = el)}>Bin</span>
          </div>
          <div
            ref={(el) => (teamSectionRef.current[1] = el)}
            className="flex items-center text-9xl"
          >
            <span ref={(el) => (leftTextRefs.current[1] = el)}>Jun</span>
            <img
              ref={(el) => (teamImageRefs.current[1] = el)}
              src={jungyu}
              alt="jungyu"
              className="w-40"
            />
            <span ref={(el) => (rightTextRefs.current[1] = el)}>Gyu</span>
          </div>
          <div
            ref={(el) => (teamSectionRef.current[2] = el)}
            className="flex items-center text-9xl"
          >
            <span ref={(el) => (leftTextRefs.current[2] = el)}>Su</span>
            <img
              ref={(el) => (teamImageRefs.current[2] = el)}
              src={suji}
              alt="suji"
              className="w-40"
            />
            <span ref={(el) => (rightTextRefs.current[2] = el)}>Ji</span>
          </div>
          <div
            ref={(el) => (teamSectionRef.current[3] = el)}
            className="flex items-center text-9xl"
          >
            <span ref={(el) => (leftTextRefs.current[3] = el)}>Ye</span>
            <img
              ref={(el) => (teamImageRefs.current[3] = el)}
              src={yebin}
              alt="yebin"
              className="w-40"
            />
            <span ref={(el) => (rightTextRefs.current[3] = el)}>Bin</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GsapExample;

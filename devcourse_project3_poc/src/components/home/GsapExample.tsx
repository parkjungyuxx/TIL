import React, { useEffect, useRef, useState } from "react";
import toyStory from "../../assets/images/toystory.png";
import penguin from "../../assets/images/penguin.png";
import brush from "../../assets/images/brush.svg";
import jungyu from "../../assets/images/jungyu.png";
import suji from "../../assets/images/suji.png";
import yebin from "../../assets/images/yebin.png";
import youbin from "../../assets/images/youbin.png";

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
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="min-h-screen flex flex-col justify-start items-center px-6 bg-gradient-to-b from-white to-white pt-40 bg-no-repeat"
      >
        <div className="w-[1320px] text-center">
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight relative w-full"
          >
            <span className="relative inline-block">
              <span className="relative">
                Draw. Duel. Meet. Repeat.
                <div className="absolute w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 -top-4 -left-6 md:-top-6 md:-left-8 lg:-top-8 lg:-left-10 z-10">
                  <img
                    ref={imageMotionRef}
                    src={toyStory}
                    alt="Motion icon"
                    className="w-full h-full rounded-full border-4 border-white shadow-lg object-cover"
                  />
                </div>
              </span>
            </span>
            <br />
            <span className="relative inline-block">
              Win with style
              <span className="relative">
                .
                <div className="absolute w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 -top-2 -right-4 md:-top-4 md:-right-6 lg:-top-4 lg:-right-8 z-10">
                  <img
                    ref={imageSimpleRef}
                    src={penguin}
                    alt="Penguin icon"
                    className="w-full h-full rounded-full border-4 border-white shadow-lg object-cover"
                  />
                </div>
              </span>
            </span>
          </h1>
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8"
          >
            Unleash your creativity and challenge artists from around the world
            in real-time drawing battles.
          </p>
          <button className="bg-[#D6C1FF] px-12 py-4 rounded-4xl text-[18px] mt-12">
            Join
          </button>

          <div
            className="text-lg md:text-xl text-gray-500 font-medium h-8 overflow-hidden relative mx-auto mt-24"
            style={{ width: "1320px" }}
          >
            <div
              ref={slidingTextRef}
              className="flex items-center h-full whitespace-nowrap"
            ></div>
          </div>
        </div>
      </section>

      {/* Project Introduction Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-white to-white"></div>
        <div
          className="absolute top-10 right-10 w-32 h-32 opacity-20"
          // style={{
          //   backgroundImage: `url(${brush})`,
          //   backgroundSize: "contain",
          //   backgroundRepeat: "no-repeat",
          // }}
        ></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div
            ref={(el) => (sectionRefs.current[0] = el)}
            className="text-center mb-16"
          >
            {/* Main title */}
            <div className="inline-flex items-center gap-4 bg-white backdrop-blur-sm px-8 py-4 rounded-full border border-[#222222] mb-8">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <span className="text-[#222222] font-medium text-lg">
                Project Introduction
              </span>
            </div>

            <h2
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight"
              style={{ fontFamily: "yangjin" }}
            >
              실시간 낙서 그림
              <br />
              <span className="text-[#22222280]">대결 플랫폼</span>
            </h2>

            <p
              className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12"
              style={{ fontFamily: "yangjin" }}
            >
              우리는 황수지팀입니다 반갑습니다. 황수지, 유빈예빈, 박준규입니다.
              반갑습니다. 우리는 이런 프로젝트 합니다. 그림 그리기 그리기
              싱글모드 멀티모드 대결 대결
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-orange-100 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-[#22222280] rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold text-gray-900 mb-3"
                  style={{ fontFamily: "yangjin" }}
                >
                  실시간 대결
                </h3>
                <p className="text-gray-600" style={{ fontFamily: "yangjin" }}>
                  라이브 드로잉 배틀로 긴장감 넘치는 경험
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-orange-100 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-[#22222280] rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold text-gray-900 mb-3"
                  style={{ fontFamily: "yangjin" }}
                >
                  직관적 도구
                </h3>
                <p className="text-gray-600" style={{ fontFamily: "yangjin" }}>
                  누구나 쉽게 사용할 수 있는 드로잉 툴
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-orange-100 hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-[#22222280] rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold text-gray-900 mb-3"
                  style={{ fontFamily: "yangjin" }}
                >
                  커뮤니티
                </h3>
                <p className="text-gray-600" style={{ fontFamily: "yangjin" }}>
                  여러 사람들과 함께 이야기
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      {/* <section className="py-10 px-6 bg-[#D6C1FF] rounded-[24px] mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "신기록 달성",
                desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo minima perspiciatis veniam eveniet qui modi ducimus, vero expedita facilis! Aperiam repellat corporis praesentium iusto cum, quos molestiae velit eaque incidunt!",
              },
              {
                title: "신기록 달성",
                desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo minima perspiciatis veniam eveniet qui modi ducimus, vero expedita facilis! Aperiam repellat corporis praesentium iusto cum, quos molestiae velit eaque incidunt!",
              },
              {
                title: "신기록 달성",
                desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo minima perspiciatis veniam eveniet qui modi ducimus, vero expedita facilis! Aperiam repellat corporis praesentium iusto cum, quos molestiae velit eaque incidunt!",
              },
              {
                title: "신기록 달성",
                desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo minima perspiciatis veniam eveniet qui modi ducimus, vero expedita facilis! Aperiam repellat corporis praesentium iusto cum, quos molestiae velit eaque incidunt!",
              },
              {
                title: "신기록 달성",
                desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo minima perspiciatis veniam eveniet qui modi ducimus, vero expedita facilis! Aperiam repellat corporis praesentium iusto cum, quos molestiae velit eaque incidunt!",
              },
              {
                title: "신기록 달성",
                desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo minima perspiciatis veniam eveniet qui modi ducimus, vero expedita facilis! Aperiam repellat corporis praesentium iusto cum, quos molestiae velit eaque incidunt!",
              },
            ].map((feature, index) => (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Team Section with Animation */}
      <section className="mt-64">
        <div className="flex flex-col justify-center items-center gap-10">
          <div
            ref={(el) => (teamSectionRef.current[0] = el)}
            className="flex items-center text-9xl"
          >
            <span ref={(el) => (leftTextRefs.current[0] = el)}>You</span>
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

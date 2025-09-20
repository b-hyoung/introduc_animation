"use client"

import { useRef, useEffect, RefObject } from 'react'
import gsap from 'gsap'
import { useGSAP } from "@gsap/react";
import './Intro_first.css'
import { ScrollTrigger } from 'gsap/all';

interface IntroFirstProps {
    container: RefObject<HTMLDivElement>;
}
export default function Intro_first() {

    const container = useRef(null);

    const profile = {
        role: "\"개발자\"",
        skills: ["\"React\"", "\"Next.js\"", "\"Python\", \"Docker\" , ..."],
        interests: ["\"AI를 이용한 자동화 툴\"", "\"UX(사용성 편의)\""],
       traits: (
    <>
      "실험과 문제 해결을 통해 성장하며,<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;현실과 연결된 개발을 지향하는 실용적 개발자"
    </>
  ),
    };

    const { contextSafe } = useGSAP({ scope: container });
    gsap.registerPlugin(ScrollTrigger); // 플러그인 등록

    // 핀 예시
useGSAP(() => {
  gsap.to(".intro_first", {
    opacity: 0,
    scrollTrigger: {
      trigger: ".intro_first",
      start: "top top",   // 시작 시점
      end: "+=200",        // 스크롤 90px 구간 동안
      scrub: 1,        // 스크롤에 비례해서 opacity 1 → 0
      pin: true
    }
  });
}, { scope: container });

    //시작 키보드 타이핑 애니메이션  
    useGSAP(() => {
        // .text-container의 최종 너비(34em)를 기준으로 각 라인의 너비 비율을 계산합니다.
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".intro_first",   // 스크롤 감지할 대상
                start: "top center",       // 뷰포트 기준 시작 위치
                toggleActions: "play none none reverse",
                // 스크롤 방향에 따른 액션 (play, pause, resume, reverse 등)
            }
        });
        tl.fromTo(".intro_helloWorld",
            { opacity: 0, scale: 0.8, y: 10 }, // 시작 상태: 투명하고, 작고, 약간 아래에 있음
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1,
                ease: "power2.out" // 부드럽게 들어오는 효과
            },
            "+=0.8" // 마지막 커서 애니메이션이 끝난 후 0.8초 뒤에 시작
        );
        // --- Line 1 ---
        tl.set(".line-1", { borderRightColor: "rgba(255,255,255,0.75)" });
        tl.fromTo(".line-1",
            { width: "0" },
            { width: "100%", duration: 0.8, ease: "steps(9)" } // 타이핑 속도 조절
        );
        tl.to(".line-1", { borderRightColor: "transparent" });

        // --- Line 2 ---
        tl.set(".line-2", { borderRightColor: "rgba(255,255,255,0.75)" }, "+=0.5");
        tl.fromTo(".line-2",
            { width: "0" },
            { width: "47%", duration: 1, ease: "steps(15)" }
        );
        tl.to(".line-2", { borderRightColor: "transparent" });

        // --- Line 3 ---
        tl.set(".line-3", { borderRightColor: "rgba(255,255,255,0.75)" }, "+=0.5");
        tl.fromTo(".line-3",
            { width: "0" },
            { width: "94%", duration: 1, ease: "steps(40)" }
        );
        tl.to(".line-3", { borderRightColor: "transparent" });

        // --- Line 4 ---
        tl.set(".line-4", { borderRightColor: "rgba(255,255,255,0.75)" }, "+=0.5");
        tl.fromTo(".line-4",
            { width: "0" },
            { width: "100%", duration: 1, ease: "steps(48)" }
        );
        tl.to(".line-4", { borderRightColor: "transparent" });

        // --- Line 5 ---
        tl.set(".line-5", { borderRightColor: "rgba(255,255,255,0.75)" }, "+=0.5");
        tl.fromTo(".line-5",
            { width: "0" },
            { width: "100%", duration: 1, ease: "steps(60)" }
        );
        tl.to(".line-5", { borderRightColor: "transparent" });

        // --- Line 6 (마지막 줄) ---
        tl.set(".line-6", { borderRightColor: "rgba(255,255,255,0.75)" }, "+=0.5");
        tl.fromTo(".line-6",
            { width: "0" },
            { width: "4.5%", ease: "steps(1)" } // duration 추가
        );

        tl.to(".cascading-indicator", {
            opacity: 1,
            onComplete: () => {
                document.body.style.overflowY = "auto"; // indicator 뜨는 순간부터 스크롤 허용
            }
        })
        // 마지막 줄은 커서를 깜빡이게 합니다.
        tl.to(".line-6", {
            borderRightColor: "rgba(255,255,255,0)",
            repeat: 4,
            yoyo: true,
            duration: 0.5,
            ease: "steps(1)",
        });
    }, { scope: container });

    //스크롤 다운 없애기
    useGSAP(() => {
        ScrollTrigger.create({
            trigger: ".intro_first",
            start: "top top",
            end: "+=10%",
            onLeave: () => { gsap.to(".cascading-indicator", { opacity: 0 }) },
            onEnterBack: () => { gsap.to(".cascading-indicator", { opacity: 1 }) }
        })
    }, { scope: container })

    return (
        <div className='container_intro_first' ref={container}>
            <div className="intro_first min-h-screen sm:h-screen text-[#d4d4d4] mx-auto text-[8px] mx-auto lg:text-lg flex flex-col min-h-full justify-center">
                <div className='intro_helloWorld  mx-auto text-base lg:text-4xl mb-10 text-[#ffe457]' >
                    <div>
                        I Am ...
                    </div>
                </div>
                 {/* 👇 여기부터 새 요소 */}
                 
                        <div className="text-gray-500 text-sm font-mono mt-4 ">
                        // version 1.0.0 <br />
                        // last update: 2025-09-20
                        </div>
                    <div className="intro-profile flex flex-col items-center gap-6 mt-12">
                        <img src="/images/b-hyoung_Logo.png" alt="profile" className="w-28 h-28 rounded-full shadow-lg" />

                        <h2 className="text-lg md:text-2xl font-bold text-green-400 glitch">
                            코드로 문제를 풀고, 현실을 연결한다.
                        </h2>

                        <div className="bg-black text-green-300 font-mono text-sm p-4 rounded-md shadow-lg w-[90%] md:w-[500px]">
                            <p><span className="text-green-500">~/portfolio $</span> whoami</p>
                            <p className="ml-4">박형석</p>
                            <p><span className="text-green-500">~/portfolio $</span> skills --list</p>
                            <p className="ml-4">React, Next.js, Python , TailWindCss , ...</p>
                        </div>

                    </div>
                <div className="text-container mx-auto min-w-[280px] lg:min-w-[550px]  break-words">
                    {/** 인트로 설명 */}
                    <div className='line-1 mx-auto'>
                        <span className='intro_keyword'>let </span><span className='intro_keyword text-red-500'>박형석</span> = <span className='intro_door'>&#123;</span>
                    </div>
                    <div className='line-2 ml-5'>
                        <span className='intro_keyword'>역할 :</span> <span className='intro_Msg'>{profile.role}</span> ,
                    </div>
                    <div className='line-3 ml-5'>
                        <span className='intro_keyword'>기술 : </span> <span className='intro_Msg'><span className='intro_door_big'>[</span> {profile.skills.map((skill, i) => (<span key={i}>{skill}{i < profile.skills.length - 1 ? ", " : ""}</span>))} <span className='intro_door_big'> ]</span></span> ,
                    </div>
                    <div className='line-4 ml-5'>
                        <span className='intro_keyword'>관심사 : </span> <span className='intro_Msg'><span className='intro_door_big'>[</span> {profile.interests.map((interest, i) => (<span key={i}>{interest}{i < profile.interests.length - 1 ? ", " : ""}</span>))}, ... <span className='intro_door_big'>]</span></span> ,
                    </div>
                    <div className='line-5 ml-5'>
                        <span className='intro_keyword'>성향 : </span>
                        <span className='intro_Msg'>
                            <span className='intro_door_big'>[</span> {profile.traits} <span className='intro_door_big'>]</span></span>
                    </div>
                    <div className='line-6 ml-5'><span className='intro_door'>&#125;</span></div>
                    <div className="cascading-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    )
}
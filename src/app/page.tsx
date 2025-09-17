"use client"

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from "@gsap/react";
import './page.css'
import { ScrollTrigger } from 'gsap/all';


function Page() {
  const container = useRef(null);
  const { contextSafe } = useGSAP({ scope: container });
  gsap.registerPlugin(ScrollTrigger); // 플러그인 등록


  // useGSAP(() => {
  //   gsap.to(".container",{
  //     scrollTrigger:{
  //       trigger: ".container", //요소가 뷰포트에 드러나는 순간부터 애니메이션 작동
  //       start : "top top", //시작 지점
  //       markers:true, // 트리거 마커 표시(boolean)
  //       scrub:false, // 스크롤 다운되면 원래 위치로 돌아감
  //     },
  //     x:30,
  //     y:30,
  //     rotate:180
  //    })
  // },),{scope : container}

useGSAP(() => {
  // .text-container의 최종 너비(34em)를 기준으로 각 라인의 너비 비율을 계산합니다.
  const tl = gsap.timeline();
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
    { width: "100%", duration: 0.8, ease: "steps(12)" } // 타이핑 속도 조절
  );
  tl.to(".line-1", { borderRightColor: "transparent" });

  // --- Line 2 ---
  tl.set(".line-2", { borderRightColor: "rgba(255,255,255,0.75)" }, "+=0.5");
  tl.fromTo(".line-2", 
    { width: "0" }, 
    { width: "47%", duration: 1, ease: "steps(20)" }
  );
  tl.to(".line-2", { borderRightColor: "transparent" });

  // --- Line 3 ---
  tl.set(".line-3", { borderRightColor: "rgba(255,255,255,0.75)" }, "+=0.5");
  tl.fromTo(".line-3", 
    { width: "0" }, 
    { width: "94%", duration: 1, ease: "steps(45)" }
  );
  tl.to(".line-3", { borderRightColor: "transparent" });

  // --- Line 4 ---
  tl.set(".line-4", { borderRightColor: "rgba(255,255,255,0.75)" }, "+=0.5");
  tl.fromTo(".line-4", 
    { width: "0" }, 
    { width: "100%", duration: 1, ease: "steps(48)" }
  );
  tl.to(".line-4", { borderRightColor: "transparent" });
  
  // --- Line 5 (마지막 줄) ---
  tl.set(".line-5", { borderRightColor: "rgba(255,255,255,0.75)" }, "+=0.5");
  tl.fromTo(".line-5", 
    { width: "0" }, 
    { width: "4.5%", duration: 0.2, ease: "steps(1)" } // duration 추가
  );
  // 마지막 줄은 커서를 깜빡이게 합니다.
  tl.to(".line-5", {
    borderRightColor: "rgba(255,255,255,0)",
    repeat: 4,
    yoyo: true,
    duration: 0.5,
    ease: "steps(1)",
  });

}, { scope: container });

  //클릭 이벤트
  // const onClickGood = contextSafe(() => {
  // 	gsap.to('.good', { rotation: "+=180" });
  // });

  let Me = {
    role: "Developer",
    skills: ["React", "Next.js", "FastAPI"],
    interests: ["AI Automation", "UX Development"]
  }

  return (
    <div ref={container} className='container mx-auto h-screen flex items-center'>
      <div className="text-[#d4d4d4] mx-auto text-lg flex flex-col">
        <div className='intro_helloWorld  mx-auto text-4xl mb-10 text-[#ffe457]' >
          <div>
            Who I Am ?
          </div>
        </div>
        <div className="text-container mx-auto">

          <div className='line-1 mx-auto'>
            <span className='intro_keyword'>let </span><span className='intro_keyword'>Me</span> = <span className='intro_door'>&#123;</span>
          </div>
          <div className='line-2 ml-5'>
            <span className='intro_keyword'>role :</span> <span className='intro_Msg'>"Developer"</span> ,
          </div>
          <div className='line-3 ml-5'>
            <span className='intro_keyword'>skills : </span> <span className='intro_Msg'><span className='intro_door_big'>[</span> "React" , "Next.js" , "FastAPI" , ... <span className='intro_door_big'>]</span></span> ,
          </div>
          <div className='line-4 ml-5'>
            <span className='intro_keyword'>interests : </span> <span className='intro_Msg'><span className='intro_door_big'>[</span> "AI Automation", "UX Development" <span className='intro_door_big'>]</span></span>
          </div>
          <div className='line-5'><span className='intro_door'>&#125;</span></div>
        </div>
      </div>
    </div>
  );
}

export default Page

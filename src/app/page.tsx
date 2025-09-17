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

useGSAP(() =>{
  gsap.to(".intro_hello",{x:0,y:0 , duration:2})
  gsap.to(".intro_world",{x:0,y:0 , duration:2})
}),{scope:container}

//클릭 이벤트
// const onClickGood = contextSafe(() => {
// 	gsap.to('.good', { rotation: "+=180" });
// });

let Me = {
role : "Developer" ,
skills : [ "React" , "Next.js" , "FastAPI" ] ,
interests : [ "AI Automation", "UX Development" ]
}

return (
	<div ref={container} className='container mx-auto h-screen flex items-center '>
		<div className="text-[#d4d4d4] mx-auto text-lg flex flex-col">
      <div className='intro_helloWorld  mx-auto text-4xl w-[100%] mb-5' >
        <div>
          Who I Am?
        </div>
        </div>
      <div className='w-max mx-auto'>
        <div ><span className='intro_keyword'>let </span><span className='intro_keyword'>Me</span> = <span className='intro_door'>&#123;</span></div>
        <div className='ml-5'><span className='intro_keyword'>role :</span> <span className='intro_Msg'>"Developer"</span> ,</div>
        <div className='ml-5'><span className='intro_keyword'>skills : </span> <span className='intro_Msg'><span className='intro_door_big'>[</span> "React" , "Next.js" , "FastAPI" , ... <span className='intro_door_big'>]</span></span> ,</div>
        <div className='ml-5'><span className='intro_keyword'>interests : </span> <span className='intro_Msg'><span className='intro_door_big'>[</span> "AI Automation", "UX Development" <span className='intro_door_big'>]</span></span></div>
        <div><span className='intro_door'>&#125;</span></div>
        </div>

      </div>
	</div>
);
}

export default Page

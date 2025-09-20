"use client"

import { useRef,useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from "@gsap/react";
import './page.css'
import { ScrollTrigger } from 'gsap/all';
import Intro_first from './components/Intro_first';
import Intro_second from './components/Intro_second';
import MatrixRain from './components/MatrixRain';


function Page() {

  const container = useRef(null);
  const { contextSafe } = useGSAP({ scope: container });
  gsap.registerPlugin(ScrollTrigger); // 플러그인 등록


  //시작 화면 고정해서 새로고침 해도 출발위치로이동
  useEffect(() => {
    window.history.scrollRestoration = 'manual';

    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100); // 100ms (0.1초) 정도의 지연이면 충분합니다.

  }, []);

  return (
    <div ref={container} className='mx-auto w-full flex flex-col items-center'>
      {/** 매트릭스 배경 */}
      <MatrixRain />

      <Intro_first  />
       {/* 오버레이 (화면 위에 고정) */}

      <div className='intro_second w-[100%]'>
        <Intro_second />
      </div>

    </div>
  );
}

export default Page

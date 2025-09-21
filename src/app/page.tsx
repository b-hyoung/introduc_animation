"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./page.css";
import { ScrollTrigger } from "gsap/all";
import Intro_first from "./components/Intro_first";
import MatrixRain from "./components/MatrixRain";
import Intro_second from "./components/Intro_second";

gsap.registerPlugin(ScrollTrigger); // ✅ 컴포넌트 바깥에서 1번만 등록

function Page() {
  const container = useRef(null);

  // ✅ 스크롤 초기화는 useEffect에서만
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }, []);




  return (
    <div
      ref={container}
      className="mx-auto w-full flex flex-col items-center"
    >
      <MatrixRain />
      <Intro_first />
      <Intro_second />
     
    </div>
  );
}

export default Page;

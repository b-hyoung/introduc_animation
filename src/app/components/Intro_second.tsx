"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import "./Intro_Second.css";

gsap.registerPlugin(ScrollTrigger);

type Props = {};

export default function Intro_second({ }: Props) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 👇 DOM 선택
    const scroller = document.querySelector(".projects-section") as HTMLElement | null;
    const track = scroller?.querySelector(".horizontal-scroll-container") as HTMLElement | null;
    const cards = gsap.utils.toArray<HTMLElement>(".project-card");

    if (!scroller || !track || cards.length === 0) return;

    // 중복 트리거 제거 (개발 모드 대비)
    ScrollTrigger.getById("projects")?.kill();

    const cardStep = cards[0].offsetWidth + parseFloat(getComputedStyle(cards[0]).marginLeft) + parseFloat(getComputedStyle(cards[0]).marginRight);

    // 뷰포트 중앙 계산
    const viewportCenter = () => window.innerWidth / 1.5;

    // 초기 x 위치 (첫 카드 중앙 = 화면 중앙)
    const startX = viewportCenter() - cardStep / 2;
    // 트랙 길이를 카드 개수 × step 으로 강제 지정
    gsap.set(track, { width: cards.length * cardStep });
    gsap.set(track, { x: startX });
  })

  return (
    <div ref={container}>
      <div className="intro_second w-full">
        <section className="projects-section h-screen relative">
          <div className="text-left p-16 text-5xl font-bold text-white">
            프로젝트 아카이브
          </div>

          <div className="horizontal-scroll-container h-screen flex items-center pl-10 pr-10">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="project-card w-[30vw] h-[50vh] bg-gray-700 rounded-lg ml-20"
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

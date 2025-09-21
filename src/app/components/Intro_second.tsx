"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import "./Intro_Second.css";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

type Props = {};

export const mockProjects = [
  {
    title: "w2go_uiseong",
    description:
      "의성군 관광 활성화를 위한 QR 랜선여행 플랫폼. 군청과 협업하며 기획부터 개발, 마케팅까지 전 과정을 경험.",
    skills: [
      { name: "React", detail: "프론트엔드 SPA 구조 설계" },
      { name: "Docker", detail: "개발 환경 컨테이너화" },
      { name: "Figma", detail: "UI/UX 설계 및 프로토타이핑" },
      { name: "Netlify", detail: "프론트엔드 배포" },
    ],
    image: "/images/project/w2go_uiseong.png",
  },
  {
    title: "영상디자인학과 홈페이지",
    description:
      "외주 프로젝트로 진행된 학과 홈페이지 개발. Firebase 기반 서버리스 DB와 이미지 업로드, 반응형 UI 구현.",
    skills: [
      { name: "JavaScript", detail: "Vanilla JS 기반 화면 개발" },
      { name: "Firebase", detail: "서버리스 DB 및 스토리지" },
      { name: "CSS", detail: "반응형 UI 구현" },
    ],
    image: "/images/project/kumamid.png",
  },
  {
    title: "Blog",
    description:
      "포트폴리오와 블로그를 통합한 개인 프로젝트. 로그인/피드백 기능과 게스트 접근 제어, CI/CD를 통한 배포 경험.",
    skills: [
      { name: "React", detail: "컴포넌트 기반 설계" },
      { name: "Zustand", detail: "전역 상태 관리" },
      { name: "Python3 & DRF", detail: "백엔드 API 설계" },
      { name: "AWS", detail: "클라우드 배포" },
      { name: "MySQL", detail: "데이터베이스 설계" },
    ],
    image: "/images/project/Project_Blog.png",
  },
  {
    title: "kkeua",
    description:
      "실시간 웹소켓 끝말잇기 아이템전. Figma로 UX 설계, TailwindCSS로 반응형 구현. 프로젝트 중단을 통해 유지보수와 컨벤션 중요성 학습.",
    skills: [
      { name: "React", detail: "웹소켓 클라이언트 구현" },
      { name: "TailwindCSS", detail: "반응형 UI 제작" },
      { name: "Docker", detail: "개발 환경 관리" },
      { name: "Zustand", detail: "게스트 모드 상태 관리" },
    ],
    image: "/images/project/kkuea.png",
  },
  {
    title: "Eriwa",
    description:
      "이터널리턴 전적 검색 사이트. React Query 기반 데이터 패칭, 페이지 템플릿 분리, 백엔드 API 연동 경험.",
    skills: [
      { name: "React", detail: "UI 컴포넌트 구현" },
      { name: "CSS", detail: "스타일링 및 레이아웃" },
      { name: "React-Query", detail: "데이터 패칭 및 캐싱" },
    ],
    image: "/images/project/Eriwa.png",
  },
  {
    title: "ReSee",
    description:
      "메모 복습 웹사이트. 실시간 유효성 검증, Toast UI Editor를 통한 마크다운 글쓰기, 전역 변수화를 통한 유지보수 경험.",
    skills: [
      { name: "React", detail: "폼 검증 및 UI 구현" },
      { name: "CSS", detail: "스타일링 및 반응형 레이아웃" },
      { name: "React-Query", detail: "API 데이터 관리" },
    ],
    image: "/images/project/Resee.gif",
  },
  {
    title: "Clover",
    description:
      "동아리 홍보·관리 사이트. Python 기반 REST API와 JWT 인증으로 로그인 및 권한 제어, React Query로 동아리 검색 및 실시간 데이터 처리.",
    skills: [
      { name: "React", detail: "프론트엔드 UI 구성" },
      { name: "CSS", detail: "레이아웃 스타일링" },
      { name: "React-Query", detail: "데이터 통신 최적화" },
      { name: "Python", detail: "REST API 구현" },
      { name: "JWT", detail: "인증 및 권한 관리" },
    ],
    image: "/images/project/Clover.gif",
  },
];

export default function Intro_second({ }: Props) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const scroller = document.querySelector(
      ".projects-section"
    ) as HTMLElement | null;
    const track = scroller?.querySelector(
      ".horizontal-scroll-container"
    ) as HTMLElement | null;
    const cards = gsap.utils.toArray<HTMLElement>(".project-card");

    if (!scroller || !track || cards.length === 0) return;

    ScrollTrigger.getById("projects")?.kill();

    const cardStep =
      cards[0].offsetWidth +
      parseFloat(getComputedStyle(cards[0]).marginLeft) +
      parseFloat(getComputedStyle(cards[0]).marginRight);

    const viewportCenter = () => window.innerWidth / 2;
    const startX = viewportCenter() - cardStep / 2;

    gsap.set(track, { width: cards.length * cardStep });
    gsap.set(track, { x: startX });

    const totalWidth = cards.length * cardStep;
    gsap.set(track, { width: totalWidth });
    const extraSpace = window.innerWidth * 0.5;

    gsap.to(track, {
      x: () => -(totalWidth - window.innerWidth + extraSpace),
      ease: "none",
      scrollTrigger: {
        id: "projects",
        trigger: scroller,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${totalWidth + extraSpace}`,
      },
    });
  });

  return (
    <div ref={container}>
      <div className="intro_second w-full font-jetbrains">
        <section className="projects-section h-screen relative">
          <div className="absolute top-[15%] left-16 text-3xl md:text-5xl lg:text-6xl font-extrabold text-sky-200 z-20 drop-shadow-lg">
            프로젝트 아카이브
          </div>

          <div className="horizontal-scroll-container h-screen flex items-end pl-10 pr-16 pb-16">
            {mockProjects.map((project, i) => (
              <div
                key={i}
                className="project-card group relative w-[30vw] h-[50vh] rounded-lg ml-20 overflow-hidden"
              >
                {/* 배경 이미지 */}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />

                {/* 어두운 오버레이 */}
                <div className="absolute inset-0 bg-black/60 opacity-30 group-hover:opacity-100 transition-opacity duration-500" />

                {/* skills */}
                <div
                  className="absolute top-6 left-6 flex flex-row flex-wrap gap-2 z-10
                      transition-all duration-500 ease-in-out
                      group-hover:flex-col group-hover:items-start
                      group-hover:top-6 group-hover:left-6"
                >
                  {project.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="relative flex items-center gap-2"
                    >
                      {/* 스킬 이름 배지 */}
                      <span className="bg-sky-900/70 px-3 py-1 rounded text-[11px] md:text-sm font-bold text-sky-300">
                        {skill.name}
                      </span>

                      {/* detail (hover 시 순차적으로 내려옴) */}
                      <span
                        className={`
                          hidden group-hover:inline text-gray-200 text-xs md:text-sm ml-2
                          opacity-0 group-hover:opacity-100
                          fade-in-down
                        `}
                        style={{ animationDelay: `${idx * 0.15}s` }} // 순차적 등장
                      >
                        {skill.detail}
                      </span>
                    </div>
                  ))}
                </div>
                {/* 부연 설명 (hover 시 중앙) */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-100 text-center text-base md:text-xl lg:text-2xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 px-6 glitch-hover">
                  <p>
                    {project.description} <br />
                    이 프로젝트를 통해{" "}
                    {project.skills.map((s) => s.name).join(", ")} 등을 실무에
                    적용했습니다.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

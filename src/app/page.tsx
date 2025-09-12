// app/page.tsx

"use client";

import React, { useState, ReactElement, ReactNode } from 'react';
import {
  Lightbulb,
  FileText,
  Pencil,
  ShieldCheck,
  Smartphone,
  MoveRight,
} from "lucide-react";

// --- 타입 정의 (Interfaces) ---
// 각 컴포넌트의 props 타입을 명확하게 정의하여 오류를 해결합니다.

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  activeTab?: string;
  setActiveTab?: (value: string) => void;
}

interface TabsListProps {
  // children으로 TabsTrigger 컴포넌트만 받도록 명시합니다.
  children: ReactElement<TabsTriggerProps> | ReactElement<TabsTriggerProps>[];
  activeTab?: string;
  setActiveTab?: (value: string) => void;
}

interface TabContentProps {
  value: string;
  children: ReactNode;
}

interface CustomTabsProps {
  defaultValue: string;
  // 첫 번째 자식은 TabsList, 나머지는 TabsContent임을 명시합니다.
  children: [
    ReactElement<TabsListProps>,
    ...ReactElement<TabContentProps>[]
  ];
}


// --- 직접 만든 UI 컴포넌트들 (타입 수정 완료) ---

const CustomBadge = ({ children }: { children: ReactNode }) => (
  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors">
    {children}
  </div>
);

const CustomButton = ({ children, className }: { children: ReactNode, className?: string }) => (
  <button className={`inline-flex items-center justify-center rounded-md text-sm font-medium h-11 px-8 bg-black text-white hover:bg-gray-800 ${className}`}>
    {children}
  </button>
);

const CustomCard = ({ children }: { children: ReactNode }) => (
  <div className="rounded-lg border bg-white shadow-sm text-gray-900">{children}</div>
);
const CustomCardHeader = ({ children }: { children: ReactNode }) => <div className="flex flex-col space-y-1.5 p-6">{children}</div>;
const CustomCardTitle = ({ children }: { children: ReactNode }) => <h3 className="text-xl font-semibold leading-none tracking-tight">{children}</h3>;
const CustomCardContent = ({ children }: { children: ReactNode }) => <div className="p-6 pt-0">{children}</div>;

const CustomInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
    {...props}
  />
);

const CustomTabsTrigger = ({ value, children, activeTab, setActiveTab }: TabsTriggerProps) => (
    <button
      onClick={() => setActiveTab?.(value)}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${
        activeTab === value ? 'bg-white text-black shadow-sm' : ''
      }`}
    >
      {children}
    </button>
  );

const CustomTabsList = ({ children, activeTab, setActiveTab }: TabsListProps) => (
  <div className="inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-600">
    {React.Children.map(children, (child) => 
      // 이제 child가 TabsTrigger라는 것을 타입스크립트가 알기 때문에 오류가 발생하지 않습니다.
      React.cloneElement(child, { activeTab, setActiveTab })
    )}
  </div>
);

const CustomTabsContent = ({ children }: TabContentProps) => <div>{children}</div>;

const CustomTabs = ({ defaultValue, children }: CustomTabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const [tabsList, ...tabsContent] = children;

  return (
    <div>
      {/* 이제 tabsList가 activeTab 속성을 받을 수 있다는 것을 타입스크립트가 알기 때문에 오류가 발생하지 않습니다. */}
      {React.cloneElement(tabsList, { activeTab, setActiveTab })}
      {tabsContent.find(content => content.props.value === activeTab)}
    </div>
  );
};

const TechIcon = ({ name }: { name: string }) => (
    <div className="flex items-center justify-center p-3 bg-gray-100 rounded-full">
      <span className="text-sm font-semibold text-gray-800">{name}</span>
    </div>
  );

// --- 페이지 본문 ---
export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-white text-gray-900">
          <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
            {/* Hero Section */}
            <section className="text-center">
              <CustomBadge>New ✨ AI-Powered Planning</CustomBadge>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">
                아이디어만 말씀하세요.
                <br />
                개발 기획서가 완성됩니다.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
                GPT의 창의력과 Gemini의 비평적 사고가 만나 가장 효율적인 개발 청사진을
                제시합니다. 기획부터 체크리스트까지, AI 파트너가 알아서 처리해 드립니다.
              </p>
              <CustomButton className="mt-8">
                베타 테스트 신청하기 <MoveRight className="ml-2 h-5 w-5" />
              </CustomButton>
            </section>
    
            {/* How It Works Section */}
            <section className="mt-24 md:mt-32">
              <h2 className="text-center text-3xl font-bold">
                5단계 자동화 프로세스
              </h2>
              <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { icon: <Lightbulb className="h-8 w-8 text-black" />, title: "1. 아이디어 제시 (GPT)", description: "사용자의 추상적인 아이디어를 구체적인 기능 명세로 발전시킵니다." },
                  { icon: <ShieldCheck className="h-8 w-8 text-black" />, title: "2. 리스크 분석 (Gemini)", description: "기획안의 잠재적 위험, 기술적 제약, 비즈니스 허점을 찾아냅니다." },
                  { icon: <Pencil className="h-8 w-8 text-black" />, title: "3. 계획 수정 (GPT)", description: "비평가의 피드백을 반영하여 더욱 견고하고 실행 가능한 계획으로 보완합니다." },
                  { icon: <Smartphone className="h-8 w-8 text-black" />, title: "4. 화면 설계 (Gemini)", description: "최종 합의된 기획을 바탕으로 모바일 중심의 와이어프레임을 생성합니다." },
                  { icon: <FileText className="h-8 w-8 text-black" />, title: "5. 문서화 (GPT)", description: "API 명세, 개발 체크리스트가 포함된 최종 기획서를 마크다운으로 완성합니다." },
                ].map((step) => (
                  <CustomCard key={step.title}>
                    <CustomCardHeader>
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">{step.icon}</div>
                      <CustomCardTitle>{step.title}</CustomCardTitle>
                    </CustomCardHeader>
                    <CustomCardContent><p className="text-gray-600">{step.description}</p></CustomCardContent>
                  </CustomCard>
                ))}
              </div>
            </section>
    
            {/* Output Example Section */}
            <section className="mt-24 md:mt-32">
              <h2 className="text-center text-3xl font-bold">
                AI가 생성한 실제 산출물 예시
              </h2>
              <div className="mt-12 w-full">
                <CustomTabs defaultValue="plan">
                  <CustomTabsList>
                    <CustomTabsTrigger value="plan">기획서 샘플</CustomTabsTrigger>
                    <CustomTabsTrigger value="wireframe">와이어프레임 샘플</CustomTabsTrigger>
                    <CustomTabsTrigger value="checklist">체크리스트 샘플</CustomTabsTrigger>
                  </CustomTabsList>
                  <CustomTabsContent value="plan">
                    <div className="mt-4 rounded-lg bg-gray-100 p-6">
                      <h3 className="font-semibold"># 프로젝트 기획서</h3>
                      <p className="mt-2 text-sm text-gray-600">- 기능 정의서<br/>- API 계약 및 데이터 모델<br/>- 개발 일정표 (주차별)<br/>- 리스크 및 가드레일...</p>
                    </div>
                  </CustomTabsContent>
                  <CustomTabsContent value="wireframe">
                    <div className="mt-4 rounded-lg bg-gray-100 p-6">
                       <h3 className="font-semibold">📱 화면 와이어프레임 요약</h3>
                       <p className="mt-2 text-sm text-gray-600">- 모바일 퍼스트 (iPhone 14 Pro Max 기준)<br/>- 사용자 플로우 다이어그램...</p>
                    </div>
                  </CustomTabsContent>
                  <CustomTabsContent value="checklist">
                    <div className="mt-4 rounded-lg bg-gray-100 p-6">
                      <h3 className="font-semibold">✅ 개발 체크리스트</h3>
                      <p className="mt-2 text-sm text-gray-600">- [ ] Next.js 프로젝트 생성<br/>- [ ] TailwindCSS 설정<br/>- [ ] Prisma 스키마 작성...</p>
                    </div>
                  </CustomTabsContent>
                </CustomTabs>
              </div>
            </section>
            
            {/* Tech Stack Section */}
            <section className="mt-24 md:mt-32">
              <h3 className="text-center text-xl font-semibold text-gray-500">
                최신 기술 스택으로 구성됩니다
              </h3>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
                <TechIcon name="Next.js" />
                <TechIcon name="TypeScript" />
                <TechIcon name="TailwindCSS" />
                <TechIcon name="React" />
                <TechIcon name="Prisma" />
                <TechIcon name="SQLite" />
              </div>
            </section>
            
            {/* CTA Section */}
            <section className="mt-24 rounded-lg bg-gray-100 p-8 md:mt-32 md:p-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold">가장 먼저 만나보세요</h2>
                <p className="mt-4 text-gray-600">이메일을 등록하고 베타 버전 출시 소식을 가장 먼저 받아보세요.</p>
                <div className="mx-auto mt-6 flex w-full max-w-md items-center space-x-2">
                  <CustomInput type="email" placeholder="email@example.com" />
                  <CustomButton>등록하기</CustomButton>
                </div>
              </div>
            </section>
          </div>
          
          {/* Footer */}
          <footer className="w-full border-t">
            <div className="container mx-auto flex max-w-4xl items-center justify-between py-6 px-4">
              <p className="text-sm text-gray-500">© 2025 AgentFlow Inc. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-sm hover:underline">Terms</a>
                <a href="#" className="text-sm hover:underline">Privacy</a>
              </div>
            </div>
          </footer>
        </main>
      );
}
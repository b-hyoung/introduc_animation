```

// nextjs에서 React Hook이 동작하기 위해 필요
// nextjs같은 경우 기본 서버 컴포넌트이기 때문에
// 클라이언트 컴포넌트 설정 필요
"use client"

import { useRef } from 'react' // DOM요소에 직접 접근 하기위한 hook
import gsap from 'gsap' // 애니메이션 라이브러리
import { useGSAP } from "@gsap/react"; // GSAP React전용 훅
import './page.css'


function Page() {
  const container = useRef(null); //Dom 노드 참조를 위한 선언
  //GSAP 애니메이션이 해당컨테이너 범위에서만 동작하게 설정
  //contextSafe함수를 통해 이벤트 핸들러 내에서 애니메이션이
  //안전하게 실행되도록 래핑해주는 함수
  const { contextSafe } = useGSAP({ scope: container });

//컴포넌트가 랜더링 되면 실행되는 애니메이션
//시작하자마자 로딩된다.
useGSAP(() => {
	gsap.to('.good', { x: 100 , y:300 });
    //scope:container 내에서만 .good을 찾도록 제한
    //외부에서 같은 클래스명을 가지더라도 오염되지않음.
},{ scope: container });

//버튼 클릭 시 실행되는 애니메이션
// contextSafe()를 통해 언마운트 시 자동 정리(cleanup)
//버튼 누르면 .good 180도 rotation하기.
const onClickGood = contextSafe(() => {
	gsap.to('.good', { rotation: 180 });
});

return (
    {/* container라는 ref가 연결된 애니메이션 스코프 컨테이너 */}
	<div ref={container}>
		<button onClick={onClickGood} className="good bg-sky-500">Hello world</button>
	</div>
);
}

export default Page

```
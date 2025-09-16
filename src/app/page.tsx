"use client"

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from "@gsap/react";
import './page.css'


function Page() {
  const container = useRef(null);
  const { contextSafe } = useGSAP({ scope: container });

//클릭 이벤트
const onClickGood = contextSafe(() => {
	gsap.to('.good', { rotation: "+=180" });
});

return (
	<div ref={container} className='container mx-auto h-screen flex items-center '>
		<div onClick={onClickGood} className="good text-white mx-auto text-lg flex flex-col">
      <p className='w-max mx-auto tracking-wider text-4xl'>Hello World</p>
      <p className='w-max mx-auto'>Who I Am ?</p>
      <p className='w-max mx-auto'>Introduce MySelf</p>
      </div>
	</div>
);
}

export default Page

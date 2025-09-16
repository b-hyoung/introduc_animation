"use client"

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from "@gsap/react";
import './page.css'


function Page() {
  const container = useRef(null);
  const { contextSafe } = useGSAP({ scope: container });

useGSAP(() => {
	// ✅ safe, created during execution, selector text scoped
	gsap.to('.good', { x: 100 , y:300 });
},{ scope: container });

// ❌ Unsafe! Created on interaction and not wrapped in contextSafe()
// animation will not be cleaned up
// Selector text also isn't scoped to the container.
const onClickGood = contextSafe(() => {
	gsap.to('.good', { rotation: 180 });
});

return (
	<div ref={container}>
		<button onClick={onClickGood} className="good bg-sky-500">Hello world</button>
	</div>
);
}

export default Page

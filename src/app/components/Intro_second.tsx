import {useRef , useEffect} from 'react' 
import gsap from 'gsap'
import { useGSAP } from "@gsap/react";
import './Intro_Second.css'
import { ScrollTrigger } from 'gsap/all';
type Props = {}

export default function Intro_second({}: Props) {
    const container = useRef(null);

  return (
    <div ref={container}>
        <div className='w-full h-screen bg-gray-500'>
            <div>My Project</div>
        </div>

    </div>
  )
}
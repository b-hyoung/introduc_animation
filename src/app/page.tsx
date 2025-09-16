import {useRef} from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP);

const container  = useRef(null)

useGSAP(() => {
  //gsap 코드 여기에?
  gsap.to(".box",{x:360})
})

function page() {
  return (
    <div>
      
    </div>
  )
}

export default page

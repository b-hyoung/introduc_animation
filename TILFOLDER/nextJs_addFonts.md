## NextJs 폰트 등록 방법
1. assets/fonts 폴더에 폰트이름과 함께 저장 ( ex) assets/fonts/fira_code )
2. src/app/fonts.ts 생성<br/>
    export const jetbrains_mono = localFont({<br/>
    src: '../../assets/fonts/jetbrains_Mono/webfonts/JetBrainsMono-Regular.woff2', //위치<br/>
    display: 'swap', // 웹 폰트가 로딩되는동안 글자가 보이지 않도록 설정<br/>
    variable: '--font-jetbrains-mono', //불러다 쓸때 변수 명 ex) font-family = val(--font-jetbrains-mono)})
3. src/app/layout.tsx
   1. import { jetbrains_mono } from './fonts'  //만든 파일 불러오기
   1. className={`${jetbrains_mono.variable}} className을 적용 하여 원할때 지정한 variable의 이름을 통해 사용할 수 있도록 등록
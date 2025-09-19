import localFont from 'next/font/local'

// JetBrains Mono 폰트를 불러오면서 CSS 변수 이름을 지정해줍니다.
export const jetbrains_mono = localFont({
  src: "./fonts/jetbrains_Mono/webfonts/JetBrainsMono-Regular.woff2",
  display: 'swap',
  // 이 부분이 핵심입니다!
  variable: '--font-jetbrains-mono', 
})
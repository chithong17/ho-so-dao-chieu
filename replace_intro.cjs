const fs = require("fs");

let code = fs.readFileSync("components/EscapeRoom.tsx", "utf8");

// We need to inject CinematicIntro component
const cinematicComponent = `
function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const [slide, setSlide] = React.useState(0);

  const slides = [
    { img: '/cinematic_1.jpg', text: '19:40. Đêm triển lãm sinh viên.\\nKhông khí ngột ngạt bên những màn hình dang dở.' },
     { img: '/cinematic_22.jpg', text: 'aaaaa\\nKhông khí ngột ngạt bên những màn hình dang dở.' },
    { img: '/cinematic_2.jpg', text: '19:50. Lỗi 404.\\nBản Demo của nhóm Mạch Nối đột ngột biến mất khỏi hệ thống...' },
    { img: '/cinematic_3.jpg', text: 'Sự nghi ngờ bao trùm. Niềm tin sụp đổ.\\nMọi tội lỗi đổ dồn về một người.' },
    { img: '/cinematic_4.jpg', text: 'Nhưng sự thật không nằm ở những lời đổ lỗi.\\nNó đang chờ bạn giải mã...' },
  ];

  React.useEffect(() => {
    if (slide >= slides.length) {
      const t = setTimeout(onComplete, 1500);
      return () => clearTimeout(t);
    }
    const timer = setTimeout(() => {
      setSlide(s => s + 1);
    }, 5500);
    return () => clearTimeout(timer);
  }, [slide]);

  return (
    <div className={\`cinematic-overlay \${slide >= slides.length ? 'fade-out' : ''}\`}>
      {slides.map((s, i) => (
        <div key={i} className={\`cinematic-slide \${i === slide ? 'active' : (i < slide ? 'passed' : '')}\`} style={{ backgroundImage: \`url('\${s.img}')\` }}>
          <div className="cinematic-text"><p>{s.text}</p></div>
        </div>
      ))}
      <button className="cinematic-skip" onClick={onComplete}>[Bỏ qua]</button>
    </div>
  );
}
`;

// Inject before export default function EscapeRoom
code = code.replace(
  "export default function EscapeRoom",
  cinematicComponent + "\\nexport default function EscapeRoom",
);

// Replace the previous intro hooks
code = code.replace(
  /const \[introText, setIntroText\] = useState\(''\);[\s\S]*?\}, \[scene\]\);/,
  "",
);

// Replace the old render block for scene === 'intro'
code = code.replace(
  /\{scene === 'intro' && \([\s\S]*?<\/[a-zA-Z]+>\s*\)\}/,
  `{scene === 'intro' && <CinematicIntro onComplete={() => setScene('desk')} />}`,
);

fs.writeFileSync("components/EscapeRoom.tsx", code);

// Add CSS
let css = fs.readFileSync("app/globals.css", "utf8");

// Remove old terminal-intro css
css = css.replace(
  /\/\* ===========================================\n   TERMINAL INTRO SCENE[\s\S]*?@keyframes blink \{[\s\S]*?\}/,
  "",
);

css += `
/* ===========================================
   CINEMATIC INTRO SCENE
=========================================== */
.cinematic-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: black;
  z-index: 1000;
  transition: opacity 1.5s ease-in-out;
}
.cinematic-overlay.fade-out {
  opacity: 0;
  pointer-events: none;
}
.cinematic-slide {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transform: scale(1.05);
  transition: opacity 2s ease-in-out, transform 8s linear;
}
.cinematic-slide.active {
  opacity: 1;
  transform: scale(1);
}
.cinematic-slide.passed {
  opacity: 0;
  transform: scale(0.95);
}
.cinematic-text {
  position: absolute;
  bottom: 10%;
  left: 10%;
  right: 10%;
  text-align: center;
  color: #fff;
  font-family: 'Courier New', Courier, monospace;
  font-size: 22px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.8), -2px -2px 4px rgba(0,0,0,0.8);
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 8px;
  animation: textFadeIn 2s ease-in-out;
  white-space: pre-wrap;
}
.cinematic-text p {
  margin: 0;
  line-height: 1.5;
}
.cinematic-skip {
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  color: rgba(255, 255, 255, 0.5);
  border: none;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  cursor: pointer;
  z-index: 1001;
}
.cinematic-skip:hover {
  color: white;
}
@keyframes textFadeIn {
  0% { opacity: 0; transform: translateY(10px); }
  50% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

fs.writeFileSync("app/globals.css", css);
console.log("Cinematic intro added successfully!");

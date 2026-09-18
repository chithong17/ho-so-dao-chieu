const fs = require('fs');
let code = fs.readFileSync('components/EscapeRoom.tsx', 'utf8');

// Replace Scene type
code = code.replace(
  `type Scene = 'desk' | 'wall';`,
  `type Scene = 'intro' | 'desk' | 'wall';`
);

// Replace useState
code = code.replace(
  `const [scene, setScene] = useState<Scene>('desk');`,
  `const [scene, setScene] = useState<Scene>('intro');\n  const [introText, setIntroText] = useState('');\n  const fullText = "> KHỞI ĐỘNG HỆ THỐNG...\\n> KẾT NỐI MÁY CHỦ THÀNH CÔNG.\\n> ĐANG MỞ HỒ SƠ 001: MẠCH NỐI.\\n> TIẾN TRÌNH: HOÀN TẤT.\\n> NHẤN ĐỂ TIẾP TỤC...";\n\n  React.useEffect(() => {\n    if (scene === 'intro') {\n      let i = 0;\n      const timer = setInterval(() => {\n        setIntroText(fullText.substring(0, i));\n        i++;\n        if (i > fullText.length) clearInterval(timer);\n      }, 50);\n      return () => clearInterval(timer);\n    }\n  }, [scene]);`
);

// Inject intro scene render
const introJsx = `
        {scene === 'intro' && (
          <div className="terminal-intro" onClick={() => setScene('desk')}>
            <pre>{introText}</pre>
            {introText.length >= fullText.length && <span className="blink-cursor">_</span>}
          </div>
        )}
`;

code = code.replace(
  `{scene === 'desk' && (`,
  introJsx + `\n        {scene === 'desk' && (`
);

// Add missing CSS classes to globals.css
let css = fs.readFileSync('app/globals.css', 'utf8');
css += `
/* ===========================================
   TERMINAL INTRO SCENE
=========================================== */
.terminal-intro {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: #050d05;
  color: #33ff33;
  font-family: 'Courier New', Courier, monospace;
  padding: 40px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  z-index: 100;
  text-shadow: 0 0 5px rgba(51, 255, 51, 0.5);
}
.terminal-intro pre {
  white-space: pre-wrap;
  text-align: left;
  line-height: 2;
  margin: 0;
}
.blink-cursor {
  animation: blink 1s step-end infinite;
  display: inline-block;
  margin-left: 5px;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
`;

fs.writeFileSync('app/globals.css', css);
fs.writeFileSync('components/EscapeRoom.tsx', code);
console.log('Added terminal intro scene!');

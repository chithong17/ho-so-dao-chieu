import { playBgm } from '../lib/audio';
import React, { useState } from 'react';
import Interactable from './Interactable';
import { Terminal, FolderClosed, Pin, ChevronLeft, ChevronRight, Laptop, Smartphone, Book, Volume2, VolumeX } from 'lucide-react';
import { getMute, setMute } from '../lib/audio';
import CaseNotebook from './CaseNotebook';
import MissionTrackerPanel from './MissionTrackerPanel';

interface EscapeRoomProps {
  onInteract: (objId: string) => void;
  onExit: () => void;
  competitionBoard?: boolean;
}

type Scene = 'intro' | 'desk' | 'wall';


function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const [slide, setSlide] = React.useState(0);

  const slides = [
    { img: '/cinematic_1.jpg', text: '19:40. Đêm triển lãm học phần. Nhóm Mạch Nối chuẩn bị cho lượt trình bày cuối.' },
    { img: '/cinematic_1b.jpg', text: 'Mỗi thành viên tin rằng phần việc của mình đã hoàn thành. Nhưng chưa ai kiểm thử toàn bộ luồng.' },
    { img: '/cinematic_2.jpg', text: '19:50. Tên dự án không còn trong danh sách trình bày. Bản demo đã bị ẩn, hay đã xảy ra điều gì khác?' },
    { img: '/cinematic_23.jpg', text: 'Một ảnh chụp tin nhắn của Nam xuất hiện: “...mình không thể tiếp tục làm như cũ.”' },
    { img: '/cinematic_3.jpg', text: 'Một đoạn tin nhắn có thể khiến mọi người nghi ngờ. Nhưng nó có phải là toàn bộ sự thật?' },
    { img: '/cinematic_4.jpg', text: 'Hãy đối chiếu những gì còn lại. Sự thật của hồ sơ HS-01 đang chờ được lập luận.' }
  ];

  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.dataset.cinematic = 'true';
      window.dispatchEvent(new CustomEvent('hsdc-cinematic', { detail: true }));
    }
    return () => {
      if (typeof document !== 'undefined') {
        delete document.body.dataset.cinematic;
        window.dispatchEvent(new CustomEvent('hsdc-cinematic', { detail: false }));
      }
    };
  }, []);

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
    <div className={`cinematic-overlay ${slide >= slides.length ? 'fade-out' : ''}`}>
      {slides.map((s, i) => (
        <div key={i} className={`cinematic-slide ${i === slide ? 'active' : (i < slide ? 'passed' : '')}`} style={{ backgroundImage: `url('${s.img}')` }}>
          <div className="cinematic-text"><p>{s.text}</p></div>
        </div>
      ))}
      <button className="cinematic-skip" onClick={onComplete}>[Bỏ qua]</button>
    </div>
  );
}

export default function EscapeRoom({ onInteract, onExit, forceIntro, competitionBoard = false }: EscapeRoomProps & { forceIntro?: boolean }) {
  const [scene, setScene] = useState<Scene>(forceIntro ? 'intro' : (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('hs01_intro_seen') ? 'desk' : 'intro'));
  const [showTutorial, setShowTutorial] = useState(false);
  React.useEffect(() => { if (scene === 'intro') playBgm('intro'); else playBgm('investigation'); }, [scene]);
  const [muted, setMutedState] = React.useState(getMute());

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !getMute();
    setMute(next);
    setMutedState(next);
  };

  const toggleScene = () => {
    setScene(prev => prev === 'desk' ? 'wall' : 'desk');
  };

  return (
    <div className="room-container">
      <div className="room-scene">
        
        {scene === 'intro' && <CinematicIntro onComplete={() => { 
          if (typeof sessionStorage !== 'undefined') sessionStorage.setItem('hs01_intro_seen', '1'); setScene('desk'); 
          if(document.documentElement.dataset.competition!=='true')setTimeout(() => setShowTutorial(true), 1000); 
        }} />}

        {showTutorial && (
          <div className="tutorial-overlay" style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
            background: 'rgba(0,0,0,0.7)', zIndex: 100, 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            animation: 'fadeIn 0.5s ease-out'
          }} onClick={() => setShowTutorial(false)}>
            <img 
              src="/tutorial_bg.jpg" 
              alt="Chỉ thị điều tra" 
              style={{
                width: '90%', maxWidth: '1000px', height: 'auto', 
                boxShadow: '0 20px 50px rgba(0,0,0,0.8)', 
                borderRadius: '8px'
              }} 
            />
          </div>
        )}

                        {scene === 'desk' && (
          <>
            <img 
              src="/scene_desk.jpg" 
              alt="Desk View" 
              className="room-bg" 
              draggable="false" 
              style={{ filter: 'sepia(0.3) saturate(1.2) brightness(1.1) hue-rotate(-5deg)' }}
            />
            
            <Interactable
              x="39%" y="34%" width="16%" height="23%"
              label="Máy tính - nhật ký kỹ thuật"
              icon={<Laptop size={24} />}
              onClick={() => onInteract('laptop')} sfx="laptop"
            />
            
            <Interactable
              x="28%" y="54%" width="14%" height="12%"
              label="Hồ sơ vụ án (Sổ điều tra)"
              icon={<Book size={24} />}
              onClick={() => onInteract('notebook')} sfx="page_turn"
            />
            
                                    <Interactable
              x="46%" y="61%" width="9%" height="8%"
              label="Điện thoại - liên lạc nhóm"
              icon={<Smartphone size={24} />}
              onClick={() => onInteract('phone')} sfx="phone"
            />
          </>
        )}

        {scene === 'wall' && (
          <>
            <img src="/scene_wall.jpg" alt="Wall View" className="room-bg" draggable="false" />
            <Interactable
              x="22%" y="30%" width="20%" height="65%"
              label="Tủ chứng cứ · hồ sơ chính thức"
              icon={<FolderClosed size={24} />}
              onClick={() => onInteract('files')} sfx="folder"
            />
            <Interactable
              x={competitionBoard?'51.5%':'48%'} y={competitionBoard?'5%':'8%'}
              width={competitionBoard?'34%':'38%'} height={competitionBoard?'49%':'45%'}
              label={competitionBoard?'Bảng xếp hạng · Top 10':'Bảng lập luận · mô hình tái dựng'}
              icon={<Pin size={24} />}
              onClick={() => onInteract('board')} sfx="page_turn"
              className={competitionBoard?'leaderboard-hotspot':''}
            />
          </>
        )}

        {/* Scene Navigation */}
        <button className="nav-arrow left" onClick={toggleScene}>
          <ChevronLeft size={48} />
        </button>
        <button className="nav-arrow right" onClick={toggleScene}>
          <ChevronRight size={48} />
        </button>
        
        {/* Exit Button */}
        <button className="exit-room-btn" onClick={onExit}>
          X
        </button>
        <button 
          className="exit-room-btn" 
          style={{ left: 'auto', right: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} 
          onClick={toggleMute}
          title={muted ? 'Bật âm thanh' : 'Tắt âm thanh'}
        >
          {muted ? <VolumeX size={20}/> : <Volume2 size={20}/>}
        </button>

        {(scene === 'desk' || scene === 'wall') && (
          <>
            <MissionTrackerPanel />
            <CaseNotebook />
          </>
        )}
      </div>
    </div>
  );
}

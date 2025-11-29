// // // // // src/GamePage.jsx
// // // // import React, { useEffect, useRef, useState } from "react";
// // // // import { db, serverTimestamp } from "./firebase";
// // // // import { collection, doc, addDoc, setDoc, getDoc } from "firebase/firestore";
// // // // import { nanoid } from "nanoid";
// // // // import ColorPicker from "./components/ColorPicker";
// // // // import GameResultModal from "./components/GameResultModal";

// // // // const COLORS = ["red", "green", "blue", "yellow", "purple", "orange", "pink", "cyan"];
// // // // function rand(min, max) { return Math.random() * (max - min) + min; }

// // // // export default function GamePage({ user }) {
// // // //   const canvasRef = useRef(null);
// // // //   const [level, setLevel] = useState(1);
// // // //   const [score, setScore] = useState(0);
// // // //   const [targetColor, setTargetColor] = useState(COLORS[0]);
// // // //   const [gameOver, setGameOver] = useState(false);
// // // //   const [modalMessage, setModalMessage] = useState("");
// // // //   const [prevScores, setPrevScores] = useState({});
// // // //   const balloonsRef = useRef([]);
// // // //   const statsRef = useRef({ hits: 0, wrong: 0, reactionTimes: [] });

// // // //   // Load previously saved scores
// // // //   useEffect(() => {
// // // //     const loadScores = async () => {
// // // //       if (!user) return;
// // // //       const userDoc = await getDoc(doc(db, "users", user.uid));
// // // //       if (userDoc.exists()) {
// // // //         const data = userDoc.data();
// // // //         setPrevScores(data.scores || {});
// // // //       }
// // // //     };
// // // //     loadScores();
// // // //   }, [user, level]);

// // // //   // Config per level
// // // //   const configForLevel = (L) => ({
// // // //     speedMult: 1 + L * 0.25,
// // // //     colorChangeMs: Math.max(1200 - L * 100, 250),
// // // //     spawnInterval: Math.max(1200 - L * 60, 400),
// // // //     maxBalloons: 20
// // // //   });

// // // //   // Reset level
// // // //   useEffect(() => {
// // // //     setTargetColor(COLORS[(level - 1) % COLORS.length]);
// // // //     statsRef.current = { hits: 0, wrong: 0, reactionTimes: [] };
// // // //     balloonsRef.current = [];
// // // //     setScore(prevScores[`level${level}`] || 0);
// // // //     setGameOver(false);
// // // //   }, [level, prevScores]);

// // // //   // Check win/lose
// // // //   useEffect(() => {
// // // //     if (score >= 100) {
// // // //       setModalMessage("🎉 You Win!");
// // // //       setGameOver(true);
// // // //     } else if (score <= -50) {
// // // //       setModalMessage("😞 You Lost!");
// // // //       setGameOver(true);
// // // //     }
// // // //   }, [score]);

// // // //   // Canvas & game loop
// // // //   useEffect(() => {
// // // //     const canvas = canvasRef.current;
// // // //     const ctx = canvas.getContext("2d");
// // // //     canvas.width = 900;
// // // //     canvas.height = 600;
// // // //     let lastTime = performance.now();
// // // //     let raf, spawnTimer;

// // // //     function spawnBalloon() {
// // // //       const cfg = configForLevel(level);
// // // //       const id = nanoid();
// // // //       const size = rand(22, 40);
// // // //       const x = rand(size, canvas.width - size);
// // // //       const y = canvas.height + size;
// // // //       const pattern = level === 1 ? "static" : level === 2 ? Math.random() > 0.5 ? "lr" : "ud" : "sine";
// // // //       const vx = rand(-40, 40) * cfg.speedMult;
// // // //       const vy = -rand(40, 120) * cfg.speedMult;
// // // //       const color = COLORS[Math.floor(Math.random() * COLORS.length)];
// // // //       const spawnAt = performance.now();
// // // //       balloonsRef.current.push({ id, x, y, vx, vy, size, color, pattern, spawnAt, lastColorChange: spawnAt });
// // // //     }

// // // //     function update(dt) {
// // // //       const now = performance.now();
// // // //       const cfg = configForLevel(level);
// // // //       balloonsRef.current.forEach(b => {
// // // //         if (now - b.lastColorChange > cfg.colorChangeMs) {
// // // //           b.color = COLORS[Math.floor(Math.random() * COLORS.length)];
// // // //           b.lastColorChange = now;
// // // //         }
// // // //         if (b.pattern === "static") b.y += b.vy * dt / 1000;
// // // //         else if (b.pattern === "lr") {
// // // //           b.x += b.vx * dt / 1000;
// // // //           b.y += b.vy * dt / 1000;
// // // //           if (b.x < b.size || b.x > canvas.width - b.size) b.vx *= -1;
// // // //         } else b.x += b.vx * dt / 1000, b.y += b.vy * dt / 1000;
// // // //       });
// // // //       balloonsRef.current = balloonsRef.current.filter(b => b.y + b.size > -50 && b.x > -100 && b.x < canvas.width + 100);
// // // //     }

// // // //     function render() {
// // // //       // background
// // // //       ctx.fillStyle = "#0A0A23";
// // // //       ctx.fillRect(0, 0, canvas.width, canvas.height);

// // // //       // top panel
// // // //       ctx.fillStyle = "#222";
// // // //       ctx.fillRect(0, 0, canvas.width, 50);
// // // //       ctx.fillStyle = "white";
// // // //       ctx.font = "18px Arial";
// // // //     //   ctx.fillText(`Level ${level}  Score: ${score}  Target:`, 20, 32);
// // // //     //   ctx.fillStyle = targetColor;
// // // //     //   ctx.fillRect(150, 14, 30, 22);




// // // //     // 1. Draw the text
// // // // const text = `Level ${level}  Score: ${score}  Target:`;
// // // // ctx.fillStyle = "white";
// // // // ctx.font = "18px Arial";
// // // // ctx.fillText(text, 20, 32);

// // // // // 2. Measure the text width
// // // // const textWidth = ctx.measureText(text).width;

// // // // // 3. Draw the target color box right after the text
// // // // // ctx.fillStyle = targetColor;
// // // // ctx.fillRect(20 + textWidth + 5, 14, 30, 22); // 5px gap after text


// // // //       // balloons
// // // //       balloonsRef.current.forEach(b => {
// // // //         ctx.beginPath();
// // // //         ctx.fillStyle = b.color;
// // // //         ctx.ellipse(b.x, b.y, b.size, b.size * 1.2, 0, 0, Math.PI * 2);
// // // //         ctx.fill();
// // // //         ctx.beginPath();
// // // //         ctx.strokeStyle = "#fff";
// // // //         ctx.moveTo(b.x, b.y + b.size * 1.1);
// // // //         ctx.lineTo(b.x, b.y + b.size * 2);
// // // //         ctx.stroke();
// // // //       });
// // // //     }

// // // //     function loop(t) { const dt = t - lastTime; lastTime = t; update(dt); render(); raf = requestAnimationFrame(loop); }
// // // //     raf = requestAnimationFrame(loop);

// // // //     const cfg = configForLevel(level);
// // // //     spawnTimer = setInterval(() => { if (balloonsRef.current.length < cfg.maxBalloons) spawnBalloon(); }, cfg.spawnInterval);
// // // //     for (let i = 0; i < 5; i++) spawnBalloon();

// // // //     const onClick = (e) => {
// // // //       if (gameOver) return;
// // // //       const rect = canvas.getBoundingClientRect();
// // // //       const mx = e.clientX - rect.left;
// // // //       const my = e.clientY - rect.top;
// // // //       for (let i = balloonsRef.current.length - 1; i >= 0; i--) {
// // // //         const b = balloonsRef.current[i];
// // // //         const dx = mx - b.x, dy = my - b.y;
// // // //         if (Math.sqrt(dx * dx + dy * dy) <= b.size) {
// // // //           const now = performance.now();
// // // //           const reaction = now - b.spawnAt;
// // // //           if (b.color === targetColor) { setScore(s => s + 10); statsRef.current.hits++; statsRef.current.reactionTimes.push(reaction); }
// // // //           else { setScore(s => s - 5); statsRef.current.wrong++; }
// // // //           balloonsRef.current.splice(i, 1);
// // // //           break;
// // // //         }
// // // //       }
// // // //     };

// // // //     canvas.addEventListener("mousedown", onClick);
// // // //     return () => { cancelAnimationFrame(raf); clearInterval(spawnTimer); canvas.removeEventListener("mousedown", onClick); };
// // // //   }, [level, targetColor, gameOver]);

// // // //   // save level
// // // //   const finishLevel = async () => {
// // // //     const uid = user.uid;
// // // //     const session = {
// // // //       date: serverTimestamp(),
// // // //       level, score,
// // // //       hits: statsRef.current.hits,
// // // //       wrong: statsRef.current.wrong,
// // // //       avgReactionMs: statsRef.current.reactionTimes.length
// // // //         ? Math.round(statsRef.current.reactionTimes.reduce((a, b) => a + b, 0) / statsRef.current.reactionTimes.length)
// // // //         : null
// // // //     };
// // // //     try {
// // // //       await addDoc(collection(db, "users", uid, "sessions"), session);
// // // //       await setDoc(doc(db, "users", uid), { scores: { [`level${level}`]: score }, lastPlayed: serverTimestamp() }, { merge: true });
// // // //       setPrevScores(prev => ({ ...prev, [`level${level}`]: score }));
// // // //       setModalMessage(`Level ${level} saved! Score: ${score}`);
// // // //       setGameOver(true);
// // // //     } catch (e) { console.error(e); alert(e.message); }
// // // //   };

// // // //   return (
// // // //     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 15, background: '#10102b', minHeight: '100vh' }}>
// // // //       <h2 style={{ color: '#fff', fontWeight: 'bold', marginBottom: 10 }}>🎈 Balloon Pop Game</h2>
// // // //       <div style={{ display: 'flex', width: '95%', gap: 20 }}>
// // // //         {/* Left Panel: Canvas */}
// // // //         <div style={{ flex: 2, position: 'relative' }}>
// // // //           <canvas ref={canvasRef} style={{ border: '3px solid #fff', borderRadius: '15px', background: '#0a0a23' }} />
// // // //         </div>
// // // //         {/* Right Panel: Controls */}
// // // //         <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
// // // //           <div style={{ background: '#222', padding: 15, borderRadius: 12, color: '#fff', fontWeight: 'bold' }}>
// // // //             <p>Level: {level}</p>
// // // //             <p>Score: {score}</p>
// // // //             <p>Prev Score: {prevScores[`level${level}`] || 0}</p>
// // // //           </div>
// // // //           <ColorPicker currentColor={targetColor} onColorSelect={setTargetColor} />
// // // //           <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
// // // //             <button onClick={() => setLevel(1)} style={{ padding: '10px', fontWeight: 'bold', borderRadius: 8, cursor: 'pointer' }}>Restart Level 1</button>
// // // //             <button onClick={finishLevel} style={{ padding: '10px', fontWeight: 'bold', borderRadius: 8, cursor: 'pointer' }}>Finish & Save Level</button>
// // // //             <button onClick={() => setLevel(l => l + 1)} style={{ padding: '10px', fontWeight: 'bold', borderRadius: 8, cursor: 'pointer' }}>Next Level</button>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       <GameResultModal
// // // //         isOpen={gameOver}
// // // //         message={modalMessage}
// // // //         onClose={() => { setGameOver(false); setScore(0); balloonsRef.current = []; }}
// // // //         onNext={() => { setLevel(l => l + 1); setGameOver(false); setScore(0); balloonsRef.current = []; }}
// // // //       />
// // // //     </div>
// // // //   );
// // // // }















// // // // src/GamePage.jsx
// // // import React, { useEffect, useRef, useState } from "react";
// // // import { db, serverTimestamp } from "./firebase";
// // // import { collection, doc, addDoc, setDoc, getDoc } from "firebase/firestore";
// // // import { nanoid } from "nanoid";
// // // import ColorPicker from "./components/ColorPicker";
// // // import GameResultModal from "./components/GameResultModal";

// // // const COLORS = ["red", "green", "blue", "yellow", "purple", "orange", "pink", "cyan"];
// // // function rand(min, max) { return Math.random() * (max - min) + min; }

// // // export default function GamePage({ user }) {
// // //   const canvasRef = useRef(null);
// // //   const [level, setLevel] = useState(1);
// // //   const [score, setScore] = useState(0);
// // //   const [targetColor, setTargetColor] = useState(COLORS[0]);
// // //   const [gameOver, setGameOver] = useState(false);
// // //   const [modalMessage, setModalMessage] = useState("");
// // //   const [prevScores, setPrevScores] = useState({});
// // //   const [chances, setChances] = useState(3);
// // //   const [popMessage, setPopMessage] = useState("");
// // //   const [aiTip, setAiTip] = useState("");
// // //   const [lastPlayed, setLastPlayed] = useState(null);

// // //   const balloonsRef = useRef([]);
// // //   const statsRef = useRef({ hits: 0, wrong: 0, reactionTimes: [] });

// // //   const MAX_LEVEL = 10;

// // //   // Load previously saved scores & last played
// // //   useEffect(() => {
// // //     const loadUserData = async () => {
// // //       if (!user) return;
// // //       const userDoc = await getDoc(doc(db, "users", user.uid));
// // //       if (userDoc.exists()) {
// // //         const data = userDoc.data();
// // //         setPrevScores(data.scores || {});
// // //         setLastPlayed(data.lastPlayed?.toDate?.() || null);
// // //       }
// // //     };
// // //     loadUserData();
// // //   }, [user, level]);

// // //   // Config per level
// // // //   const configForLevel = (L) => {
// // // //     return {
// // // //       speedMult: 1 + L * 0.2,                   // increase movement speed
// // // //       colorChangeMs: Math.max(1200 - L * 100, 200), // decrease time to change color
// // // //       spawnInterval: Math.max(1200 - L * 80, 400),
// // // //       maxBalloons: 20 + L,
// // // //     };
// // // //   };



// // //     const configForLevel = (L) => {
// // //   return {
// // //     speedMult: 1 + L * 0.2,                    // increase movement speed
// // //     colorChangeMs: Math.max(1200 - L * 100, 200), // color change faster in higher levels
// // //     spawnInterval: Math.max(700 - L * 30, 300),   // faster spawn in higher levels
// // //     maxBalloons: 30 + L * 5,                       // more balloons per level
// // //   };
// // // };






// // //   // Reset level
// // //   useEffect(() => {
// // //     setTargetColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
// // //     statsRef.current = { hits: 0, wrong: 0, reactionTimes: [] };
// // //     balloonsRef.current = [];
// // //     setScore(prevScores[`level${level}`] || 0);
// // //     setChances(3);
// // //     setPopMessage("");
// // //     setAiTip("");
// // //     setGameOver(false);
// // //   }, [level, prevScores]);

// // //   // AI tip generation
// // //   const generateAiTips = () => {
// // //     const { hits, wrong, reactionTimes } = statsRef.current;
// // //     const total = hits + wrong;
// // //     if (total === 0) return "No moves recorded. Try playing the game!";
// // //     const accuracy = (hits / total) * 100;
// // //     const avgReaction = reactionTimes.length
// // //       ? Math.round(reactionTimes.reduce((a,b)=>a+b,0)/reactionTimes.length)
// // //       : 0;

// // //     let tip = "";
// // //     if (accuracy < 50) tip += "🎯 Focus on the target color more.\n";
// // //     else if (accuracy < 80) tip += "👍 Good accuracy, keep practicing.\n";
// // //     else tip += "🏆 Excellent accuracy!\n";

// // //     if (avgReaction > 1000) tip += "⚡ Click faster to pop balloons quicker.\n";
// // //     else tip += "⏱ Reaction time is good.\n";

// // //     if (level >= 2) tip += "🚀 Anticipate balloon movement to improve Level 2+ performance.\n";

// // //     if (score < 100) tip += "🎯 Aim for 100 points to unlock next level.\n";
// // //     else tip += "🎉 Ready for next level!\n";

// // //     return tip;
// // //   };

// // //   // Canvas & game loop
// // //   useEffect(() => {
// // //     const canvas = canvasRef.current;
// // //     const ctx = canvas.getContext("2d");
// // //     canvas.width = 900;
// // //     canvas.height = 600;
// // //     let lastTime = performance.now();
// // //     let raf, spawnTimer;

// // //     function spawnBalloon() {
// // //       const cfg = configForLevel(level);
// // //       const id = nanoid();
// // //       const size = rand(22, 40);
// // //       const x = rand(size, canvas.width - size);
// // //       const y = canvas.height + size;

// // //       let pattern = "static";
// // //       if (level === 2) pattern = Math.random() > 0.5 ? "lr" : "ud";
// // //       else if (level >= 3) pattern = Math.random() > 0.5 ? "lr" : "ud";

// // //       const vx = rand(-40, 40) * cfg.speedMult;
// // //       const vy = -rand(40, 120) * cfg.speedMult;
// // //       const color = COLORS[Math.floor(Math.random() * COLORS.length)];
// // //       const spawnAt = performance.now();
// // //       balloonsRef.current.push({ id, x, y, vx, vy, size, color, pattern, spawnAt, lastColorChange: spawnAt });
// // //     }

// // //     function update(dt) {
// // //       const now = performance.now();
// // //       const cfg = configForLevel(level);

// // //       balloonsRef.current.forEach(b => {
// // //         if (level >= 3 && now - b.lastColorChange > cfg.colorChangeMs) {
// // //           b.color = COLORS[Math.floor(Math.random() * COLORS.length)];
// // //           b.lastColorChange = now;
// // //         }

// // //         if (b.pattern === "static") b.y += b.vy * dt / 1000;
// // //         else if (b.pattern === "lr") {
// // //           b.x += b.vx * dt / 1000;
// // //           b.y += b.vy * dt / 1000;
// // //           if (b.x < b.size || b.x > canvas.width - b.size) b.vx *= -1;
// // //         } else if (b.pattern === "ud") {
// // //           b.x += b.vx * dt / 1000;
// // //           b.y += b.vy * dt / 1000;
// // //           if (b.y < b.size || b.y > canvas.height - b.size) b.vy *= -1;
// // //         }
// // //       });

// // //       balloonsRef.current = balloonsRef.current.filter(b => b.y + b.size > -50 && b.x > -100 && b.x < canvas.width + 100);
// // //     }

// // //     function render() {
// // //       ctx.fillStyle = "#0A0A23";
// // //       ctx.fillRect(0, 0, canvas.width, canvas.height);

// // //       ctx.fillStyle = "#222";
// // //       ctx.fillRect(0, 0, canvas.width, 50);

// // //       const text = `Level ${level}  Score: ${score}  Target:`;
// // //       ctx.fillStyle = "white";
// // //       ctx.font = "18px Arial";
// // //       ctx.fillText(text, 20, 32);
// // //       const textWidth = ctx.measureText(text).width;

// // //       ctx.fillStyle = targetColor;
// // //       ctx.fillRect(20 + textWidth + 5, 14, 30, 22);

// // //       ctx.fillStyle = "#fff";
// // //       ctx.fillText(`Chances: ${chances}`, canvas.width - 120, 32);

// // //       if (popMessage) {
// // //         ctx.fillStyle = popMessage.includes("POP") ? "lime" : "red";
// // //         ctx.font = "28px Arial";
// // //         ctx.fillText(popMessage, canvas.width / 2 - 50, 100);
// // //       }

// // //       balloonsRef.current.forEach(b => {
// // //         ctx.beginPath();
// // //         ctx.fillStyle = b.color;
// // //         ctx.ellipse(b.x, b.y, b.size, b.size*1.2, 0, 0, Math.PI*2);
// // //         ctx.fill();
// // //         ctx.beginPath();
// // //         ctx.strokeStyle = "#fff";
// // //         ctx.moveTo(b.x, b.y + b.size*1.1);
// // //         ctx.lineTo(b.x, b.y + b.size*2);
// // //         ctx.stroke();
// // //       });
// // //     }

// // //     function loop(t) {
// // //       const dt = t - lastTime;
// // //       lastTime = t;
// // //       update(dt);
// // //       render();
// // //       raf = requestAnimationFrame(loop);
// // //     }
// // //     raf = requestAnimationFrame(loop);

// // //     const cfg = configForLevel(level);
// // //     spawnTimer = setInterval(() => {
// // //       if (balloonsRef.current.length < cfg.maxBalloons) spawnBalloon();
// // //     }, cfg.spawnInterval);

// // //     for (let i = 0; i < 5; i++) spawnBalloon();

// // //     const onClick = (e) => {
// // //       if (gameOver) return;
// // //       const rect = canvas.getBoundingClientRect();
// // //       const mx = e.clientX - rect.left;
// // //       const my = e.clientY - rect.top;

// // //       for (let i = balloonsRef.current.length-1; i>=0; i--) {
// // //         const b = balloonsRef.current[i];
// // //         const dx = mx-b.x, dy = my-b.y;
// // //         if (Math.sqrt(dx*dx + dy*dy) <= b.size) {
// // //           const now = performance.now();
// // //           const reaction = now - b.spawnAt;

// // //           if (b.color === targetColor) {
// // //             setScore(s => s+10);
// // //             statsRef.current.hits++;
// // //             statsRef.current.reactionTimes.push(reaction);
// // //             setPopMessage("POP! 🎉");
// // //             setTargetColor(COLORS[Math.floor(Math.random()*COLORS.length)]);
// // //             setChances(3);
// // //           } else {
// // //             statsRef.current.wrong++;
// // //             setChances(c=>c-1);
// // //             setPopMessage("Try Again ❌");
// // //             setScore(s=>s-5);

// // //             if (chances-1 <= 0) {
// // //               setModalMessage(`Game Over! Final Score: ${score}`);
// // //               setAiTip(generateAiTips());
// // //               setGameOver(true);
// // //             }
// // //           }

// // //           balloonsRef.current.splice(i,1);
// // //           break;
// // //         }
// // //       }
// // //     };

// // //     canvas.addEventListener("mousedown", onClick);
// // //     return () => {
// // //       cancelAnimationFrame(raf);
// // //       clearInterval(spawnTimer);
// // //       canvas.removeEventListener("mousedown", onClick);
// // //     };
// // //   }, [level, targetColor, gameOver, chances, score, popMessage]);

// // //   useEffect(() => {
// // //     if (popMessage) {
// // //       const timer = setTimeout(()=>setPopMessage(""), 1000);
// // //       return ()=>clearTimeout(timer);
// // //     }
// // //   }, [popMessage]);

// // //   // Finish level & save
// // //   const finishLevel = async () => {
// // //     if (!user) return;
// // //     const uid = user.uid;
// // //     const session = {
// // //       date: serverTimestamp(),
// // //       level, score,
// // //       hits: statsRef.current.hits,
// // //       wrong: statsRef.current.wrong,
// // //       avgReactionMs: statsRef.current.reactionTimes.length
// // //         ? Math.round(statsRef.current.reactionTimes.reduce((a,b)=>a+b,0)/statsRef.current.reactionTimes.length)
// // //         : null
// // //     };
// // //     try {
// // //       await addDoc(collection(db,"users",uid,"sessions"), session);
// // //       await setDoc(doc(db,"users",uid), { scores: { [`level${level}`]: score }, lastPlayed: serverTimestamp() }, { merge:true });
// // //       setPrevScores(prev=>({...prev, [`level${level}`]: score}));
// // //       setModalMessage(`Level ${level} saved! Score: ${score}`);
// // //       setAiTip(generateAiTips());
// // //       setGameOver(true);
// // //     } catch(e){console.error(e); alert(e.message);}
// // //   };

// // //   return (
// // //     <div style={{display:'flex', flexDirection:'column', alignItems:'center', padding:15, background:'#10102b', minHeight:'100vh'}}>
// // //       <h2 style={{color:'#fff', fontWeight:'bold', marginBottom:10}}>🎈 Balloon Pop Game</h2>
// // //       {lastPlayed && <p style={{color:'#ccc'}}>Last played: {lastPlayed.toLocaleString()}</p>}
// // //       <div style={{display:'flex', width:'95%', gap:20}}>
// // //         <div style={{flex:2, position:'relative'}}>
// // //           <canvas ref={canvasRef} style={{border:'3px solid #fff', borderRadius:'15px', background:'#0a0a23'}}/>
// // //         </div>
// // //         <div style={{flex:1, display:'flex', flexDirection:'column', gap:20}}>
// // //           <div style={{background:'#222', padding:15, borderRadius:12, color:'#fff', fontWeight:'bold'}}>
// // //             <p>Level: {level}</p>
// // //             <p>Score: {score}</p>
// // //             <p>Prev Score: {prevScores[`level${level}`] || 0}</p>
// // //             <p>Chances: {chances}</p>
// // //           </div>
// // //           <ColorPicker currentColor={targetColor} onColorSelect={setTargetColor}/>
// // //           <div style={{display:'flex', flexDirection:'column', gap:10}}>
// // //             <button onClick={()=>setLevel(1)} style={{padding:'10px', fontWeight:'bold', borderRadius:8, cursor:'pointer'}}>Restart Level 1</button>
// // //             <button onClick={finishLevel} style={{padding:'10px', fontWeight:'bold', borderRadius:8, cursor:'pointer'}}>Finish & Save Level</button>
// // //             <button
// // //               onClick={()=>level<MAX_LEVEL && score>=100 ? setLevel(l=>l+1):null}
// // //               style={{
// // //                 padding:'10px', fontWeight:'bold', borderRadius:8,
// // //                 cursor: level<MAX_LEVEL && score>=100 ? 'pointer':'not-allowed',
// // //                 opacity: level<MAX_LEVEL && score>=100 ? 1 : 0.5
// // //               }}
// // //             >Next Level</button>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <GameResultModal
// // //         isOpen={gameOver}
// // //         message={modalMessage}
// // //         aiTip={aiTip}
// // //         onClose={()=>{setGameOver(false); setScore(0); balloonsRef.current=[]; setChances(3); setAiTip("");}}
// // //         onNext={()=>{if(level<MAX_LEVEL && score>=100){setLevel(l=>l+1); setGameOver(false); setScore(0); balloonsRef.current=[]; setChances(3); setAiTip("");}}}
// // //       />
// // //     </div>
// // //   );
// // // }








































// // // src/GamePage.jsx
// // import React, { useEffect, useRef, useState } from "react";
// // import { db, serverTimestamp } from "./firebase";
// // import { collection, doc, addDoc, setDoc, getDoc } from "firebase/firestore";
// // import { nanoid } from "nanoid";
// // import ColorPicker from "./components/ColorPicker";
// // import GameResultModal from "./components/GameResultModal";

// // const COLORS = ["red", "green", "blue", "yellow", "purple", "orange", "pink", "cyan"];
// // function rand(min, max) {
// //   return Math.random() * (max - min) + min;
// // }

// // export default function GamePage({ user }) {
// //   const canvasRef = useRef(null);
// //   const balloonsRef = useRef([]);
// //   const statsRef = useRef({ hits: 0, wrong: 0, reactionTimes: [] });

// //   const MAX_LEVEL = 10;

// //   const [level, setLevel] = useState(1);
// //   const [score, setScore] = useState(0);
// //   const [targetColor, setTargetColor] = useState(COLORS[0]);
// //   const [gameOver, setGameOver] = useState(false);
// //   const [modalMessage, setModalMessage] = useState("");
// //   const [prevScores, setPrevScores] = useState({});
// //   const [chances, setChances] = useState(3);
// //   const [popMessage, setPopMessage] = useState("");
// //   const [aiTip, setAiTip] = useState("");
// //   const [lastPlayed, setLastPlayed] = useState(null);

// //   // Load previous scores & last played
// //   useEffect(() => {
// //     const loadUserData = async () => {
// //       if (!user) return;
// //       const userDoc = await getDoc(doc(db, "users", user.uid));
// //       if (userDoc.exists()) {
// //         const data = userDoc.data();
// //         setPrevScores(data.scores || {});
// //         setLastPlayed(data.lastPlayed?.toDate?.() || null);
// //       }
// //     };
// //     loadUserData();
// //   }, [user]);

// //   // Level configuration
// //   const configForLevel = (L) => ({
// //     speedMult: 1 + L * 0.2,
// //     colorChangeMs: Math.max(1200 - L * 100, 200),
// //     spawnInterval: Math.max(700 - L * 30, 300),
// //     maxBalloons: 30 + L * 5,
// //   });

// //   // Reset level
// //   useEffect(() => {
// //     setTargetColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
// //     statsRef.current = { hits: 0, wrong: 0, reactionTimes: [] };
// //     balloonsRef.current = [];
// //     setScore(prevScores[`level${level}`] || 0);
// //     setChances(3);
// //     setPopMessage("");
// //     setAiTip("");
// //     setGameOver(false);
// //   }, [level, prevScores]);

// //   // Generate AI tips
// //   const generateAiTips = () => {
// //     const { hits, wrong, reactionTimes } = statsRef.current;
// //     const total = hits + wrong;
// //     if (total === 0) return "No moves recorded. Try playing the game!";

// //     const accuracy = (hits / total) * 100;
// //     const avgReaction = reactionTimes.length
// //       ? Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length)
// //       : 0;

// //     let tip = "";
// //     if (accuracy < 50) tip += "🎯 Focus on the target color more.\n";
// //     else if (accuracy < 80) tip += "👍 Good accuracy, keep practicing.\n";
// //     else tip += "🏆 Excellent accuracy!\n";

// //     if (avgReaction > 1000) tip += "⚡ Click faster to pop balloons quicker.\n";
// //     else tip += "⏱ Reaction time is good.\n";

// //     if (level >= 2) tip += "🚀 Anticipate balloon movement to improve Level 2+ performance.\n";
// //     if (score < 100) tip += "🎯 Aim for 100 points to unlock next level.\n";
// //     else tip += "🎉 Level Complete!\n";

// //     return tip;
// //   };

// //   // Canvas game loop
// //   useEffect(() => {
// //     const canvas = canvasRef.current;
// //     const ctx = canvas.getContext("2d");
// //     canvas.width = 900;
// //     canvas.height = 600;
// //     let lastTime = performance.now();
// //     let raf, spawnTimer;

// //     const spawnBalloon = () => {
// //       const cfg = configForLevel(level);
// //       const id = nanoid();
// //       const size = rand(22, 40);
// //       const x = rand(size, canvas.width - size);
// //       const y = rand(size + 50, canvas.height - size - 50);

// //       let pattern = "static";
// //       if (level === 2) pattern = Math.random() > 0.5 ? "lr" : "ud";
// //       else if (level >= 3) pattern = Math.random() > 0.5 ? "lr" : "ud";

// //       const vx = rand(-40, 40) * cfg.speedMult;
// //       const vy = rand(-80, 80) * cfg.speedMult;
// //       const color = COLORS[Math.floor(Math.random() * COLORS.length)];
// //       const spawnAt = performance.now();

// //       balloonsRef.current.push({ id, x, y, vx, vy, size, color, pattern, spawnAt, lastColorChange: spawnAt });
// //     };

// //     const update = (dt) => {
// //       const now = performance.now();
// //       const cfg = configForLevel(level);

// //       balloonsRef.current.forEach((b) => {
// //         if (level >= 3 && now - b.lastColorChange > cfg.colorChangeMs) {
// //           b.color = COLORS[Math.floor(Math.random() * COLORS.length)];
// //           b.lastColorChange = now;
// //         }

// //         if (b.pattern === "static") b.y += b.vy * dt / 1000;
// //         else if (b.pattern === "lr") {
// //           b.x += b.vx * dt / 1000;
// //           b.y += b.vy * dt / 1000;
// //           if (b.x < b.size || b.x > canvas.width - b.size) b.vx *= -1;
// //         } else if (b.pattern === "ud") {
// //           b.x += b.vx * dt / 1000;
// //           b.y += b.vy * dt / 1000;
// //           if (b.y < b.size || b.y > canvas.height - b.size) b.vy *= -1;
// //         }
// //       });

// //       balloonsRef.current = balloonsRef.current.filter(
// //         (b) => b.y + b.size > -50 && b.x > -100 && b.x < canvas.width + 100
// //       );
// //     };

// //     const render = () => {
// //       ctx.fillStyle = "#0A0A23";
// //       ctx.fillRect(0, 0, canvas.width, canvas.height);

// //       ctx.fillStyle = "#222";
// //       ctx.fillRect(0, 0, canvas.width, 50);

// //       const text = `Level ${level}  Score: ${score}  Target:`;
// //       ctx.fillStyle = "white";
// //       ctx.font = "18px Arial";
// //       ctx.fillText(text, 20, 32);
// //       const textWidth = ctx.measureText(text).width;

// //       ctx.fillStyle = targetColor;
// //       ctx.fillRect(20 + textWidth + 5, 14, 30, 22);

// //       ctx.fillStyle = "#fff";
// //       ctx.fillText(`Chances: ${chances}`, canvas.width - 120, 32);

// //       if (popMessage) {
// //         ctx.fillStyle = popMessage.includes("POP") ? "lime" : "red";
// //         ctx.font = "28px Arial";
// //         ctx.fillText(popMessage, canvas.width / 2 - 50, 100);
// //       }

// //       balloonsRef.current.forEach((b) => {
// //         ctx.beginPath();
// //         ctx.fillStyle = b.color;
// //         ctx.ellipse(b.x, b.y, b.size, b.size * 1.2, 0, 0, Math.PI * 2);
// //         ctx.fill();
// //         ctx.beginPath();
// //         ctx.strokeStyle = "#fff";
// //         ctx.moveTo(b.x, b.y + b.size * 1.1);
// //         ctx.lineTo(b.x, b.y + b.size * 2);
// //         ctx.stroke();
// //       });
// //     };

// //     const loop = (t) => {
// //       const dt = t - lastTime;
// //       lastTime = t;
// //       update(dt);
// //       render();
// //       raf = requestAnimationFrame(loop);
// //     };
// //     raf = requestAnimationFrame(loop);

// //     const cfg = configForLevel(level);
// //     spawnTimer = setInterval(() => {
// //       if (balloonsRef.current.length < cfg.maxBalloons) spawnBalloon();
// //     }, cfg.spawnInterval);

// //     for (let i = 0; i < 5; i++) spawnBalloon();

// //     const onClick = (e) => {
// //       if (gameOver) return;
// //       const rect = canvas.getBoundingClientRect();
// //       const mx = e.clientX - rect.left;
// //       const my = e.clientY - rect.top;

// //       for (let i = balloonsRef.current.length - 1; i >= 0; i--) {
// //         const b = balloonsRef.current[i];
// //         const dx = mx - b.x,
// //           dy = my - b.y;
// //         if (Math.sqrt(dx * dx + dy * dy) <= b.size) {
// //           const now = performance.now();
// //           const reaction = now - b.spawnAt;

// //           if (b.color === targetColor) {
// //             setScore((s) => s + 10);
// //             statsRef.current.hits++;
// //             statsRef.current.reactionTimes.push(reaction);
// //             setPopMessage("POP! 🎉");
// //             setTargetColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
// //             setChances(3);
// //           } else {
// //             statsRef.current.wrong++;
// //             setChances((c) => c - 1);
// //             setPopMessage("Try Again ❌");
// //             setScore((s) => s - 5);
// //           }

// //           balloonsRef.current.splice(i, 1);
// //           break;
// //         }
// //       }
// //     };

// //     canvas.addEventListener("mousedown", onClick);
// //     return () => {
// //       cancelAnimationFrame(raf);
// //       clearInterval(spawnTimer);
// //       canvas.removeEventListener("mousedown", onClick);
// //     };
// //   }, [level, targetColor, gameOver, chances, score, popMessage]);

// //   // Pop message fade
// //   useEffect(() => {
// //     if (popMessage) {
// //       const timer = setTimeout(() => setPopMessage(""), 1000);
// //       return () => clearTimeout(timer);
// //     }
// //   }, [popMessage]);

// //   // Check for level complete
// //   useEffect(() => {
// //     if (score >= 100 && !gameOver) {
// //       setModalMessage(`🎉 Level ${level} Complete!`);
// //       setAiTip(generateAiTips());
// //       setGameOver(true);
// //     }
// //   }, [score]);

// //   // Finish & save level
// //   const finishLevel = async () => {
// //     if (!user) return;
// //     const uid = user.uid;
// //     const session = {
// //       date: serverTimestamp(),
// //       level,
// //       score,
// //       hits: statsRef.current.hits,
// //       wrong: statsRef.current.wrong,
// //       avgReactionMs: statsRef.current.reactionTimes.length
// //         ? Math.round(statsRef.current.reactionTimes.reduce((a, b) => a + b, 0) / statsRef.current.reactionTimes.length)
// //         : null,
// //     };
// //     try {
// //       await addDoc(collection(db, "users", uid, "sessions"), session);
// //       await setDoc(
// //         doc(db, "users", uid),
// //         { scores: { [`level${level}`]: score }, lastPlayed: serverTimestamp() },
// //         { merge: true }
// //       );
// //       setPrevScores((prev) => ({ ...prev, [`level${level}`]: score }));
// //       setModalMessage(`Level ${level} saved! Score: ${score}`);
// //       setAiTip(generateAiTips());
// //       setGameOver(true);
// //     } catch (e) {
// //       console.error(e);
// //       alert(e.message);
// //     }
// //   };

// //   return (
// //     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 15, background: "#10102b", minHeight: "100vh" }}>
// //       <h2 style={{ color: "#fff", fontWeight: "bold", marginBottom: 10 }}>🎈 Balloon Pop Game</h2>
// //       {lastPlayed && <p style={{ color: "#ccc" }}>Last played: {lastPlayed.toLocaleString()}</p>}
// //       <div style={{ display: "flex", width: "95%", gap: 20 }}>
// //         <div style={{ flex: 2, position: "relative" }}>
// //           <canvas ref={canvasRef} style={{ border: "3px solid #fff", borderRadius: "15px", background: "#0a0a23" }} />
// //         </div>
// //         <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
// //           <div style={{ background: "#222", padding: 15, borderRadius: 12, color: "#fff", fontWeight: "bold" }}>
// //             <p>Level: {level}</p>
// //             <p>Score: {score}</p>
// //             <p>Prev Score: {prevScores[`level${level}`] || 0}</p>
// //             <p>Chances: {chances}</p>
// //           </div>
// //           <ColorPicker currentColor={targetColor} onColorSelect={setTargetColor} />
// //           <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
// //             <button onClick={() => setLevel(1)} style={{ padding: "10px", fontWeight: "bold", borderRadius: 8, cursor: "pointer" }}>
// //               Restart Level 1
// //             </button>
// //             <button onClick={finishLevel} style={{ padding: "10px", fontWeight: "bold", borderRadius: 8, cursor: "pointer" }}>
// //               Finish & Save Level
// //             </button>
// //             <button
// //               onClick={() => level < MAX_LEVEL && score >= 100 ? setLevel((l) => l + 1) : null}
// //               style={{
// //                 padding: "10px",
// //                 fontWeight: "bold",
// //                 borderRadius: 8,
// //                 cursor: level < MAX_LEVEL && score >= 100 ? "pointer" : "not-allowed",
// //                 opacity: level < MAX_LEVEL && score >= 100 ? 1 : 0.5,
// //               }}
// //             >
// //               Next Level
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       <GameResultModal
// //         isOpen={gameOver}
// //         message={modalMessage}
// //         aiTip={aiTip}
// //         onClose={() => {
// //           setGameOver(false);
// //           setScore(0);
// //           balloonsRef.current = [];
// //           setChances(3);
// //           setAiTip("");
// //         }}
// //         onNext={() => {
// //           if (level < MAX_LEVEL) {
// //             setLevel((l) => l + 1);
// //             setGameOver(false);
// //             setScore(0);
// //             balloonsRef.current = [];
// //             setChances(3);
// //             setAiTip("");
// //           }
// //         }}
// //       />
// //     </div>
// //   );
// // }

















// // src/GamePage.jsx
// import React, { useEffect, useRef, useState } from "react";
// import { db, serverTimestamp } from "./firebase";
// import { collection, doc, addDoc, setDoc, getDoc } from "firebase/firestore";
// import { nanoid } from "nanoid";
// import ColorPicker from "./components/ColorPicker";
// import GameResultModal from "./components/GameResultModal";

// const COLORS = ["red", "green", "blue", "yellow", "purple", "orange", "pink", "cyan"];
// function rand(min, max) {
//   return Math.random() * (max - min) + min;
// }

// export default function GamePage({ user }) {
//   const canvasRef = useRef(null);
//   const balloonsRef = useRef([]);
//   const statsRef = useRef({ hits: 0, wrong: 0, reactionTimes: [] });

//   const MAX_LEVEL = 10;

//   const [level, setLevel] = useState(1);
//   const [score, setScore] = useState(0);
//   const [targetColor, setTargetColor] = useState(COLORS[0]);
//   const [gameOver, setGameOver] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [prevScores, setPrevScores] = useState({});
//   const [chances, setChances] = useState(3);
//   const [popMessage, setPopMessage] = useState("");
//   const [aiTip, setAiTip] = useState("");
//   const [lastPlayed, setLastPlayed] = useState(null);

//   // Load previous scores & last played
//   useEffect(() => {
//     const loadUserData = async () => {
//       if (!user) return;
//       const userDoc = await getDoc(doc(db, "users", user.uid));
//       if (userDoc.exists()) {
//         const data = userDoc.data();
//         setPrevScores(data.scores || {});
//         setLastPlayed(data.lastPlayed?.toDate?.() || null);
//       }
//     };
//     loadUserData();
//   }, [user]);

//   const configForLevel = (L) => ({
//     speedMult: 1 + L * 0.2,
//     colorChangeMs: Math.max(1200 - L * 100, 200),
//     spawnInterval: Math.max(700 - L * 30, 300),
//     maxBalloons: 30 + L * 5,
//   });

//   // Reset level
//   useEffect(() => {
//     setTargetColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
//     statsRef.current = { hits: 0, wrong: 0, reactionTimes: [] };
//     balloonsRef.current = [];
//     setScore(prevScores[`level${level}`] || 0);
//     setChances(3);
//     setPopMessage("");
//     setAiTip("");
//     setGameOver(false);
//   }, [level, prevScores]);

//   // Generate AI tips
//   const generateAiTips = () => {
//     const { hits, wrong, reactionTimes } = statsRef.current;
//     const total = hits + wrong;
//     if (total === 0) return "No moves recorded. Try playing the game!";

//     const accuracy = (hits / total) * 100;
//     const avgReaction = reactionTimes.length
//       ? Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length)
//       : 0;

//     let tip = "";
//     if (accuracy < 50) tip += "🎯 Focus on the target color more.\n";
//     else if (accuracy < 80) tip += "👍 Good accuracy, keep practicing.\n";
//     else tip += "🏆 Excellent accuracy!\n";

//     if (avgReaction > 1000) tip += "⚡ Click faster to pop balloons quicker.\n";
//     else tip += "⏱ Reaction time is good.\n";

//     if (level >= 2) tip += "🚀 Anticipate balloon movement to improve Level 2+ performance.\n";
//     if (score < 100) tip += "🎯 Aim for 100 points to unlock next level.\n";
//     else tip += "🎉 Level Complete!\n";

//     return tip;
//   };

//   // Canvas & game loop
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     canvas.width = 900;
//     canvas.height = 600;
//     let lastTime = performance.now();
//     let raf, spawnTimer;

//     const spawnBalloon = () => {
//       const cfg = configForLevel(level);
//       const id = nanoid();
//       const size = rand(22, 40);
//       const x = rand(size, canvas.width - size);
//       const y = canvas.height + size; // spawn below canvas

//       const vy = -rand(40, 120) * cfg.speedMult; // upward movement
//       const color = COLORS[Math.floor(Math.random() * COLORS.length)];
//       const spawnAt = performance.now();

//       balloonsRef.current.push({ id, x, y, vy, size, color, spawnAt, lastColorChange: spawnAt });
//     };

//     const update = (dt) => {
//       const now = performance.now();
//       const cfg = configForLevel(level);

//       balloonsRef.current.forEach((b) => {
//         if (level >= 3 && now - b.lastColorChange > cfg.colorChangeMs) {
//           b.color = COLORS[Math.floor(Math.random() * COLORS.length)];
//           b.lastColorChange = now;
//         }
//         // Move upward
//         b.y += b.vy * dt / 1000;
//       });

//       // Remove balloons that move off top
//       balloonsRef.current = balloonsRef.current.filter(b => b.y + b.size > -50);
//     };

//     const render = () => {
//       ctx.fillStyle = "#0A0A23";
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       ctx.fillStyle = "#222";
//       ctx.fillRect(0, 0, canvas.width, 50);

//       const text = `Level ${level}  Score: ${score}  Target:`;
//       ctx.fillStyle = "white";
//       ctx.font = "18px Arial";
//       ctx.fillText(text, 20, 32);
//       const textWidth = ctx.measureText(text).width;

//       ctx.fillStyle = targetColor;
//       ctx.fillRect(20 + textWidth + 5, 14, 30, 22);

//       ctx.fillStyle = "#fff";
//       ctx.fillText(`Chances: ${chances}`, canvas.width - 120, 32);

//       if (popMessage) {
//         ctx.fillStyle = popMessage.includes("POP") ? "lime" : "red";
//         ctx.font = "28px Arial";
//         ctx.fillText(popMessage, canvas.width / 2 - 50, 100);
//       }

//       balloonsRef.current.forEach((b) => {
//         ctx.beginPath();
//         ctx.fillStyle = b.color;
//         ctx.ellipse(b.x, b.y, b.size, b.size * 1.2, 0, 0, Math.PI * 2);
//         ctx.fill();
//         ctx.beginPath();
//         ctx.strokeStyle = "#fff";
//         ctx.moveTo(b.x, b.y + b.size * 1.1);
//         ctx.lineTo(b.x, b.y + b.size * 2);
//         ctx.stroke();
//       });
//     };

//     const loop = (t) => {
//       const dt = t - lastTime;
//       lastTime = t;
//       update(dt);
//       render();
//       raf = requestAnimationFrame(loop);
//     };
//     raf = requestAnimationFrame(loop);

//     const cfg = configForLevel(level);
//     spawnTimer = setInterval(() => {
//       if (balloonsRef.current.length < cfg.maxBalloons) spawnBalloon();
//     }, cfg.spawnInterval);

//     for (let i = 0; i < 5; i++) spawnBalloon();

//     const onClick = (e) => {
//       if (gameOver) return;
//       const rect = canvas.getBoundingClientRect();
//       const mx = e.clientX - rect.left;
//       const my = e.clientY - rect.top;

//       for (let i = balloonsRef.current.length - 1; i >= 0; i--) {
//         const b = balloonsRef.current[i];
//         const dx = mx - b.x, dy = my - b.y;
//         if (Math.sqrt(dx * dx + dy * dy) <= b.size) {
//           const now = performance.now();
//           const reaction = now - b.spawnAt;

//           if (b.color === targetColor) {
//             setScore(s => s + 10);
//             statsRef.current.hits++;
//             statsRef.current.reactionTimes.push(reaction);
//             setPopMessage("POP! 🎉");
//             setTargetColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
//             setChances(3);
//           } else {
//             statsRef.current.wrong++;
//             setChances(c => c - 1);
//             setPopMessage("Try Again ❌");
//             setScore(s => s - 5);
//           }

//           balloonsRef.current.splice(i, 1);
//           break;
//         }
//       }
//     };

//     canvas.addEventListener("mousedown", onClick);
//     return () => {
//       cancelAnimationFrame(raf);
//       clearInterval(spawnTimer);
//       canvas.removeEventListener("mousedown", onClick);
//     };
//   }, [level, targetColor, gameOver, chances, score, popMessage]);

//   // Pop message fade
//   useEffect(() => {
//     if (popMessage) {
//       const timer = setTimeout(() => setPopMessage(""), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [popMessage]);

//   // Level complete
//   useEffect(() => {
//     if (score >= 100 && !gameOver) {
//       setModalMessage(`🎉 Level ${level} Complete!`);
//       setAiTip(generateAiTips());
//       setGameOver(true);
//     }
//   }, [score]);

//   const finishLevel = async () => {
//     if (!user) return;
//     const uid = user.uid;
//     const session = {
//       date: serverTimestamp(),
//       level,
//       score,
//       hits: statsRef.current.hits,
//       wrong: statsRef.current.wrong,
//       avgReactionMs: statsRef.current.reactionTimes.length
//         ? Math.round(statsRef.current.reactionTimes.reduce((a, b) => a + b, 0) / statsRef.current.reactionTimes.length)
//         : null,
//     };
//     try {
//       await addDoc(collection(db, "users", uid, "sessions"), session);
//       await setDoc(
//         doc(db, "users", uid),
//         { scores: { [`level${level}`]: score }, lastPlayed: serverTimestamp() },
//         { merge: true }
//       );
//       setPrevScores(prev => ({ ...prev, [`level${level}`]: score }));
//       setModalMessage(`Level ${level} saved! Score: ${score}`);
//       setAiTip(generateAiTips());
//       setGameOver(true);
//     } catch (e) {
//       console.error(e);
//       alert(e.message);
//     }
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 15, background: "#10102b", minHeight: "100vh" }}>
//       <h2 style={{ color: "#fff", fontWeight: "bold", marginBottom: 10 }}>🎈 Balloon Pop Game</h2>
//       {lastPlayed && <p style={{ color: "#ccc" }}>Last played: {lastPlayed.toLocaleString()}</p>}
//       <div style={{ display: "flex", width: "95%", gap: 20 }}>
//         <div style={{ flex: 2, position: "relative" }}>
//           <canvas ref={canvasRef} style={{ border: "3px solid #fff", borderRadius: "15px", background: "#0a0a23" }} />
//         </div>
//         <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
//           <div style={{ background: "#222", padding: 15, borderRadius: 12, color: "#fff", fontWeight: "bold" }}>
//             <p>Level: {level}</p>
//             <p>Score: {score}</p>
//             <p>Prev Score: {prevScores[`level${level}`] || 0}</p>
//             <p>Chances: {chances}</p>
//           </div>
//           <ColorPicker currentColor={targetColor} onColorSelect={setTargetColor} />
//           <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//             <button onClick={() => setLevel(1)} style={{ padding: "10px", fontWeight: "bold", borderRadius: 8, cursor: "pointer" }}>Restart Level 1</button>
//             <button onClick={finishLevel} style={{ padding: "10px", fontWeight: "bold", borderRadius: 8, cursor: "pointer" }}>Finish & Save Level</button>
//             <button
//               onClick={() => level < MAX_LEVEL && score >= 100 ? setLevel(l => l + 1) : null}
//               style={{ padding: "10px", fontWeight: "bold", borderRadius: 8, cursor: level < MAX_LEVEL && score >= 100 ? "pointer" : "not-allowed", opacity: level < MAX_LEVEL && score >= 100 ? 1 : 0.5 }}
//             >
//               Next Level
//             </button>
//           </div>
//         </div>
//       </div>

//       <GameResultModal
//         isOpen={gameOver}
//         message={modalMessage}
//         aiTip={aiTip}
//         onClose={() => { setGameOver(false); setScore(0); balloonsRef.current = []; setChances(3); setAiTip(""); }}
//         onNext={() => { if (level < MAX_LEVEL) { setLevel(l => l + 1); setGameOver(false); setScore(0); balloonsRef.current = []; setChances(3); setAiTip(""); } }}
//       />
//     </div>
//   );
// }






















// src/GamePage.jsx
import React, { useEffect, useRef, useState } from "react";
import { db, serverTimestamp } from "./firebase";
import { collection, doc, addDoc, setDoc, getDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import ColorPicker from "./components/ColorPicker";
import GameResultModal from "./components/GameResultModal";

const COLORS = ["red", "green", "blue", "yellow", "purple", "orange", "pink", "cyan"];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

export default function GamePage({ user }) {
  const canvasRef = useRef(null);
  const balloonsRef = useRef([]);
  const statsRef = useRef({ hits: 0, wrong: 0, reactionTimes: [] });
  const lastSpawnRef = useRef(performance.now());

  const MAX_LEVEL = 10;
  const WIN_SCORE = 100;

  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [targetColor, setTargetColor] = useState(COLORS[0]);
  const [gameOver, setGameOver] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [prevScores, setPrevScores] = useState({});
  const [chances, setChances] = useState(3);
  const [popMessage, setPopMessage] = useState("");
  const [aiTip, setAiTip] = useState("");
  const [lastPlayed, setLastPlayed] = useState(null);

  // Load previous scores & last played
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setPrevScores(data.scores || {});
        setLastPlayed(data.lastPlayed?.toDate?.() || null);
      }
    };
    loadUserData();
  }, [user]);

  // Controls per level (speed, spawn, color-change)
  const configForLevel = (L) => ({
    speedMult: 1 + L * 0.25,
    colorChangeMs: Math.max(1200 - L * 120, 200),
    spawnInterval: Math.max(900 - L * 70, 220),
    maxBalloons: 12 + L * 4,
    wobbleAmt: Math.min(12 + L * 2, 40),
  });

  // Reset level
  useEffect(() => {
    setTargetColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
    statsRef.current = { hits: 0, wrong: 0, reactionTimes: [] };
    balloonsRef.current = [];
    lastSpawnRef.current = performance.now();
    setScore(prevScores[`level${level}`] || 0);
    setChances(3);
    setPopMessage("");
    setAiTip("");
    setGameOver(false);
  }, [level, prevScores]);

  // AI tips summary
  const generateAiTips = () => {
    const { hits, wrong, reactionTimes } = statsRef.current;
    const total = hits + wrong;
    if (total === 0) return "No moves recorded. Try playing the game!";

    const accuracy = Math.round((hits / total) * 100);
    const avgReaction = reactionTimes.length
      ? Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length)
      : 0;

    let tip = `Accuracy: ${accuracy}%. Avg reaction: ${avgReaction}ms.\n`;
    if (accuracy < 50) tip += "🎯 Focus on the target color more.\n";
    else if (accuracy < 80) tip += "👍 Good accuracy, keep practicing.\n";
    else tip += "🏆 Excellent accuracy!\n";

    if (avgReaction > 1000) tip += "⚡ Try clicking faster.\n";
    else tip += "⏱ Your reaction speed is good.\n";

    if (level >= 2) tip += "🚀 Watch movement patterns (zigzag/oscillations) to predict paths.\n";
    if (score < WIN_SCORE) tip += `🎯 Aim for ${WIN_SCORE} points to complete the level.\n`;
    else tip += "🎉 Ready for next level!\n";

    return tip;
  };

  // === Canvas loop & balloon logic (continuous spawn without gaps) ===
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    // fixed canvas size (adjust if you need responsive)
    canvas.width = 900;
    canvas.height = 600;

    let lastTime = performance.now();
    let raf = null;

    // spawn logic (same as before)
    function spawnBalloon() {
      const cfg = configForLevel(level);
      const id = nanoid();
      const size = rand(20, 40);
      const x = rand(size, canvas.width - size);
      const y = canvas.height + size + rand(0, 40); // spawn just below canvas
      const baseVy = -rand(60, 130) * cfg.speedMult;
      const spawnAt = performance.now();

      // choose pattern based on level:
      let pattern = "up";
      if (level === 1) pattern = "up";
      else if (level === 2) {
        const r = Math.random();
        if (r < 0.45) pattern = "up";
        else if (r < 0.75) pattern = "lr";
        else pattern = "ud";
      } else {
        const r = Math.random();
        if (r < 0.35) pattern = "up";
        else if (r < 0.65) pattern = "lr";
        else pattern = "wobble";
      }

      let vx = 0;
      let vy = baseVy;
      const phase = Math.random() * Math.PI * 2;
      const wobbleFreq = rand(0.8, 1.6);
      const lrSpeed = rand(40, 110) * configForLevel(level).speedMult;

      if (pattern === "lr") {
        vx = Math.random() > 0.5 ? lrSpeed : -lrSpeed;
        vy = baseVy * rand(0.9, 1.2);
      } else if (pattern === "wobble") {
        vx = 0;
        vy = baseVy * rand(0.9, 1.1);
      } else if (pattern === "ud") {
        vx = 0;
        vy = baseVy * rand(0.9, 1.05);
      }

      const color = COLORS[Math.floor(Math.random() * COLORS.length)];

      balloonsRef.current.push({ id, x, y, vx, vy, size, color, pattern, phase, wobbleFreq, spawnAt, lastColorChange: spawnAt });
    }

    // update positions
    function update(dt) {
      const now = performance.now();
      const cfg = configForLevel(level);
      const dtSec = dt / 1000;

      // continuous spawn check (no gaps)
      // spawn when enough time has passed and we are under maxBalloons
      if (now - lastSpawnRef.current >= cfg.spawnInterval) {
        // spawn as many as needed to smoothly fill up to max but avoid huge bursts
        const toSpawn = Math.min(2, cfg.maxBalloons - balloonsRef.current.length); // small burst if needed
        for (let i = 0; i < toSpawn; i++) {
          if (balloonsRef.current.length < cfg.maxBalloons) spawnBalloon();
        }
        lastSpawnRef.current = now;
      }

      for (let b of balloonsRef.current) {
        if (level >= 3 && now - b.lastColorChange > cfg.colorChangeMs) {
          b.color = COLORS[Math.floor(Math.random() * COLORS.length)];
          b.lastColorChange = now;
        }

        if (b.pattern === "up") {
          b.x += Math.sin((now + b.phase) / 700) * (cfg.wobbleAmt * 0.02);
          b.y += b.vy * dtSec;
        } else if (b.pattern === "wobble") {
          const wobbleX = Math.sin((now / 1000) * b.wobbleFreq + b.phase) * cfg.wobbleAmt;
          b.x += (wobbleX - (b._lastWobbleX || 0));
          b._lastWobbleX = wobbleX;
          b.y += b.vy * dtSec;
        } else if (b.pattern === "lr") {
          b.x += b.vx * dtSec;
          b.y += b.vy * dtSec;
          if (b.x < b.size) { b.x = b.size; b.vx = Math.abs(b.vx); }
          else if (b.x > canvas.width - b.size) { b.x = canvas.width - b.size; b.vx = -Math.abs(b.vx); }
        } else if (b.pattern === "ud") {
          const osc = Math.sin((now / 1000) * b.wobbleFreq + b.phase) * (Math.abs(b.vy) * 0.25);
          b.y += b.vy * dtSec + osc * dtSec;
          b.x += Math.sin((now + b.phase) / 800) * (cfg.wobbleAmt * 0.01);
        }
      }

      // ensure no balloons off-screen (cleanup)
      balloonsRef.current = balloonsRef.current.filter(b => b.y + b.size > -120 && b.x + b.size > -120 && b.x - b.size < canvas.width + 120);
    }

    // render
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0A0A23";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#222";
      ctx.fillRect(0, 0, canvas.width, 50);

      const text = `Level ${level}  Score: ${score}  Target:`;
      ctx.fillStyle = "white";
      ctx.font = "18px Arial";
      ctx.fillText(text, 20, 32);
      const textWidth = ctx.measureText(text).width;
      ctx.fillStyle = targetColor;
      ctx.fillRect(20 + textWidth + 8, 14, 30, 22);

      ctx.fillStyle = "#fff";
      ctx.fillText(`Chances: ${chances}`, canvas.width - 140, 32);

      if (popMessage) {
        ctx.fillStyle = popMessage.includes("POP") ? "lime" : "red";
        ctx.font = "28px Arial";
        ctx.fillText(popMessage, canvas.width / 2 - 80, 110);
      }

      for (let b of balloonsRef.current) {
        ctx.beginPath();
        ctx.fillStyle = b.color;
        ctx.ellipse(b.x, b.y, b.size, b.size * 1.15, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.strokeStyle = "rgba(255,255,255,0.2)";
        ctx.moveTo(b.x, b.y + b.size * 1.05);
        ctx.lineTo(b.x, b.y + b.size * 2.0);
        ctx.stroke();
      }
    }

    // main loop
    function loop(t) {
      const dt = t - lastTime;
      lastTime = t;
      update(dt);
      render();
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    // pre-spawn a few to avoid initial gap
    const initialCfg = configForLevel(level);
    for (let i = 0; i < Math.min(6, initialCfg.maxBalloons); i++) spawnBalloon();

    // click handler
    const onClick = (e) => {
      if (gameOver) return;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      for (let i = balloonsRef.current.length - 1; i >= 0; i--) {
        const b = balloonsRef.current[i];
        const dx = mx - b.x;
        const dy = my - b.y;
        if (Math.sqrt(dx * dx + dy * dy) <= b.size) {
          const now = performance.now();
          const reaction = now - b.spawnAt;

          if (b.color === targetColor) {
            setScore(s => s + 10);
            statsRef.current.hits++;
            statsRef.current.reactionTimes.push(reaction);
            setPopMessage("POP! 🎉");
            setTargetColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
            setChances(3);
          } else {
            statsRef.current.wrong++;
            setChances(c => c - 1);
            setPopMessage("Try Again ❌");
            setScore(s => Math.max(0, s - 5));
            if (chances - 1 <= 0) {
              setModalMessage(`Game Over! Final Score: ${score}`);
              setAiTip(generateAiTips());
              setGameOver(true);
            }
          }

          balloonsRef.current.splice(i, 1);
          break;
        }
      }
    };

    canvas.addEventListener("mousedown", onClick);

    // cleanup
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousedown", onClick);
    };
  }, [level, gameOver, targetColor, chances, score, popMessage]);

  // pop feedback fade
  useEffect(() => {
    if (!popMessage) return;
    const t = setTimeout(() => setPopMessage(""), 900);
    return () => clearTimeout(t);
  }, [popMessage]);

  // Level complete detection
  useEffect(() => {
    if (score >= WIN_SCORE && !gameOver) {
      setModalMessage(`🎉 Level ${level} Complete!`);
      setAiTip(generateAiTips());
      setGameOver(true);
    }
  }, [score, gameOver, level]);

  // Save session
  const finishLevel = async () => {
    if (!user) return;
    const uid = user.uid;
    const session = {
      date: serverTimestamp(),
      level,
      score,
      hits: statsRef.current.hits,
      wrong: statsRef.current.wrong,
      avgReactionMs: statsRef.current.reactionTimes.length
        ? Math.round(statsRef.current.reactionTimes.reduce((a, b) => a + b, 0) / statsRef.current.reactionTimes.length)
        : null,
    };
    try {
      await addDoc(collection(db, "users", uid, "sessions"), session);
      await setDoc(doc(db, "users", uid), { scores: { [`level${level}`]: score }, lastPlayed: serverTimestamp() }, { merge: true });
      setPrevScores(prev => ({ ...prev, [`level${level}`]: score }));
      setModalMessage(`Level ${level} saved! Score: ${score}`);
      setAiTip(generateAiTips());
      setGameOver(true);
    } catch (e) {
      console.error(e);
      alert(e.message);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 15, background: "#10102b", minHeight: "100vh" }}>
      <h2 style={{ color: "#fff", fontWeight: "bold", marginBottom: 10 }}>🎈 Balloon Pop Game</h2>
      {lastPlayed && <p style={{ color: "#ccc" }}>Last played: {lastPlayed.toLocaleString()}</p>}
      <div style={{ display: "flex", width: "95%", gap: 20 }}>
        <div style={{ flex: 2, position: "relative" }}>
          <canvas ref={canvasRef} style={{ border: "3px solid #fff", borderRadius: "15px", background: "#0a0a23" }} />
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: "#222", padding: 15, borderRadius: 12, color: "#fff", fontWeight: "bold" }}>
            <p>Level: {level}</p>
            <p>Score: {score}</p>
            <p>Prev Score: {prevScores[`level${level}`] || 0}</p>
            <p>Chances: {chances}</p>
          </div>

          <ColorPicker currentColor={targetColor} onColorSelect={setTargetColor} />

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button onClick={() => { setLevel(1); setScore(0); }} style={{ padding: "10px", fontWeight: "bold", borderRadius: 8, cursor: "pointer" }}>Restart Level 1</button>
            <button onClick={finishLevel} style={{ padding: "10px", fontWeight: "bold", borderRadius: 8, cursor: "pointer" }}>Finish & Save Level</button>
            <button
              onClick={() => { if (level < MAX_LEVEL && score >= WIN_SCORE) setLevel(l => l + 1); }}
              style={{
                padding: "10px",
                fontWeight: "bold",
                borderRadius: 8,
                cursor: level < MAX_LEVEL && score >= WIN_SCORE ? "pointer" : "not-allowed",
                opacity: level < MAX_LEVEL && score >= WIN_SCORE ? 1 : 0.5
              }}
            >
              Next Level
            </button>
           
          </div>
        </div>
      </div>

      <GameResultModal
        isOpen={gameOver}
        message={modalMessage}
        aiTip={aiTip}
        onClose={() => { setGameOver(false); setScore(0); balloonsRef.current = []; setChances(3); setAiTip(""); }}
        onNext={() => { if (level < MAX_LEVEL) { setLevel(l => l + 1); setGameOver(false); setScore(0); balloonsRef.current = []; setChances(3); setAiTip(""); } }}
      />
    </div>
  );
}

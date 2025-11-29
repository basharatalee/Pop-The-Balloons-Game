// // src/components/GameResultModal.jsx
// import React from "react";

// export default function GameResultModal({ isOpen, message, onClose, onNext }) {
//   if(!isOpen) return null;

//   return (
//     <div style={{
//       position: 'fixed', top:0, left:0, width:'100vw', height:'100vh',
//       backgroundColor:'rgba(0,0,0,0.7)', display:'flex', justifyContent:'center', alignItems:'center', zIndex:1000
//     }}>
//       <div style={{
//         background: '#fff', padding: '30px 50px', borderRadius: '20px',
//         textAlign:'center', fontSize: '24px', fontWeight: 'bold', boxShadow:'0 0 20px #000'
//       }}>
//         <p>{message}</p>
//         <button
//           style={{
//             margin:'10px', padding:'10px 20px', fontSize:'18px', fontWeight:'bold',
//             borderRadius:'10px', cursor:'pointer', border:'none', backgroundColor:'#33C3FF', color:'#fff'
//           }}
//           onClick={onClose}
//         >
//           Play Again
//         </button>
//         <button
//           style={{
//             margin:'10px', padding:'10px 20px', fontSize:'18px', fontWeight:'bold',
//             borderRadius:'10px', cursor:'pointer', border:'none', backgroundColor:'#28A745', color:'#fff'
//           }}
//           onClick={onNext}
//         >
//           Next Level
//         </button>
//       </div>
//     </div>
//   )
// }








// src/components/GameResultModal.jsx
import React from "react";

export default function GameResultModal({ isOpen, message, aiTip, onClose, onNext }) {
  if (!isOpen) return null;
  return (
    <div style={{
      position:'fixed', top:0, left:0, right:0, bottom:0,
      background:'rgba(0,0,0,0.7)', display:'flex',
      justifyContent:'center', alignItems:'center', zIndex:1000
    }}>
      <div style={{ background:'#222', padding:20, borderRadius:12, color:'#fff', width:'400px', textAlign:'center' }}>
        <h2>{message}</h2>
        {aiTip && <pre style={{whiteSpace:'pre-wrap', textAlign:'left', marginTop:10, fontSize:14}}>{aiTip}</pre>}
        <div style={{ marginTop: 15, display:'flex', justifyContent:'space-around' }}>
          <button onClick={onClose} style={{padding:'8px 15px', borderRadius:8}}>Close</button>
          <button onClick={onNext} style={{padding:'8px 15px', borderRadius:8}}>Next Level</button>
        </div>
      </div>
    </div>
  );
}

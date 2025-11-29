// src/components/ColorPicker.jsx
import React, { useState } from "react";

const COLORS = ["red","green","blue","yellow","purple","orange","pink","cyan"];

export default function ColorPicker({ currentColor, onColorSelect }) {
  const [color, setColor] = useState(currentColor || COLORS[0]);

  const suggestColor = () => {
    const newColor = COLORS[Math.floor(Math.random()*COLORS.length)];
    setColor(newColor);
    onColorSelect(newColor);
  }

  return (
    <div style={{ margin: '15px 0', textAlign: 'center' }}>
      <button
        style={{
          padding: '12px 25px',
          fontWeight: 'bold',
          fontSize: '16px',
          background: color,
          color: '#fff',
          borderRadius: '12px',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '10px'
        }}
        onClick={suggestColor}
      >
        Change Color
      </button>
      <div style={{ marginTop: '10px' }}>
        {COLORS.map(c => (
          <button
            key={c}
            style={{
              backgroundColor: c,
              width: 28,
              height: 28,
              margin: 5,
              borderRadius: '50%',
              border: '2px solid #fff',
              cursor: 'pointer'
            }}
            onClick={() => { setColor(c); onColorSelect(c); }}
          />
        ))}
      </div>
    </div>
  )
}

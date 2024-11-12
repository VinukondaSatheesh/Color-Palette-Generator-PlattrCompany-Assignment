
import React, { useState } from 'react';
import './App.css';
import Palette from './palette';

function App() {
  const randomColor = () =>
    '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

  function generateRandomPalette() {
    return Array.from({ length: 5 }, () => randomColor());
  }

  const [palette, setPalette] = useState(generateRandomPalette());
  const [savedPalettes, setSavedPalettes] = useState(
    JSON.parse(localStorage.getItem('savedPalettes')) || []
  );

  const handleGeneratePalette = () => {
    setPalette(generateRandomPalette());
  };

  const handleSavePalette = () => {
    const updatedPalettes = [...savedPalettes, palette];
    setSavedPalettes(updatedPalettes);
    localStorage.setItem('savedPalettes', JSON.stringify(updatedPalettes));
  };



  const handleDeletePalette = (index) => {
    const updatedPalettes = savedPalettes.filter((_, i) => i !== index);
    setSavedPalettes(updatedPalettes);
    localStorage.setItem('savedPalettes', JSON.stringify(updatedPalettes));
  };

  return (
    <div className="app-container">
      <h1>Color Palette Generator</h1>
      <div className="palette-container">
        {palette.map((color, index) => (
          <div
            key={index}
            className="color-block"
            style={{ backgroundColor: color }}
          >
            <span
              className="hex-code"
              onClick={() => {
                navigator.clipboard.writeText(color);
                alert(`${color} HexCode Copied to Clipboard!`); // Alert message
              }}
            >
              {color}
            </span>
          </div>
        ))}
      </div>
      <div className="buttons">
        <button onClick={handleGeneratePalette}>Generate Palette</button>
        <button onClick={handleSavePalette}>Save Palette</button>
      </div>
      <h2>Saved Palettes</h2>
      <div className="saved-palettes">
        {savedPalettes.map((savedPalette, index) => (
          <Palette
            key={index}
            colors={savedPalette}
            onDelete={() => handleDeletePalette(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;


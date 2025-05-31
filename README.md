# 🛳️ Battleship — Notebook Edition

A browser-based version of the classic Battleship game, created as part of [The Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-battleship). This implementation uses vanilla JavaScript, modular architecture, and features a unique hand-drawn notebook-style design.

## 🎮 Game Overview

A turn-based strategy game where you battle an AI opponent (Captain Jack). The objective is to sink all of your opponent’s ships before they sink yours.

### 📸 Screenshots

#### Start Screen
![image](https://github.com/user-attachments/assets/ca6110d0-747e-4685-8e8a-47e60fed97db)


#### Game In Progress
![image](https://github.com/user-attachments/assets/108d1c5b-02ef-479b-873d-fb047d4c8c82)


## ✅ Features

- 🎯 Turn-based gameplay (Player vs AI)
- 🧠 AI remembers wounded ships and continues targeting
- 🎲 Randomized ship placement
- 🎨 Hand-drawn visual style
- 🔊 Sound effects: hit, miss, sink
- ⏱️ Smooth animations and attack delays
- 🔁 Restart button and sound toggle

## 🧠 Key Concepts and Practices

- ES6 Modules
- Object-Oriented Programming (classes)
- DOM Manipulation
- Event Handling
- Game loop logic
- AI with basic memory
- Sound control with `<audio>` elements
- Responsive rendering of ships and hits

## ⚙️ Simplifications and Deviations from Original Specification

This project follows the main goals of the [Battleship assignment](https://www.theodinproject.com/lessons/node-path-javascript-battleship) but includes the following simplifications:

- ❌ No drag-and-drop ship placement (ships are placed randomly)
- ✅ AI focuses on continuing attacks after a hit (simple wounded-targeting logic)
- ✅ Focus was placed on building clean logic, styling, and polish

## 🛠️ Future Improvements

Planned additions for future versions:

- 🧲 Drag-and-drop ship placement
- 💾 Save/load game state via `localStorage`
- 📱 Improved mobile support
- 🧠 Smarter AI with different difficulty levels
- 🌐 Local multiplayer mode
- 🎨 Ship explosion/animation effects
- ⚙️ Settings menu (sound, difficulty, grid size)

## 🚀 How to Play

1. Open `template.html` in a browser
2. Enter your name and click **Start**
3. Click on the enemy board to attack
4. Win by sinking all enemy ships before they sink yours

## 📦 Run Locally

```bash
git clone https://github.com/your-username/battleship-notebook.git
cd battleship-notebook
open template.html

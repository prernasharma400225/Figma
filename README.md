# 🎨 Figma-Style Design Tool (DOM Based)

A browser-based design/editor tool inspired by Figma, where users can draw rectangles, add text elements, move/resize objects, manage layers, and style components — all built **without Canvas**, using **pure HTML, CSS, and Vanilla JavaScript**.

---

## ✨ Key Features

- 🟦 Create rectangles, text boxes, and basic shapes
- 🔁 Move, resize, scale, and align elements
- 🎯 Click-to-select & drag interaction
- 📐 Layering & z-index ordering (Figma-style)
- 🎨 Basic styling: background colors, dimensions, text content
- 💾 Save & load element state (optional)
- ⚙ Built entirely using **DOM elements** (no <canvas>)
- 🧩 100% **Vanilla HTML + CSS + JS** (no frameworks)
- 🖥 Works in the browser — no installation required

---

## 🧱 Tech Stack

- **HTML** — UI layout & DOM elements
- **CSS** — Styling, grids, panels, selection
- **JavaScript (Vanilla)** — Interaction logic, selection, dragging, resizing, state
- **Local Storage (optional)** — Save/restore sessions

---

## 🗂 Project Structure

```
/src
  |— index.html
  |— style.css
  |— app.js
  |— /components
       |— selection.js
       |— layers.js
       |— state.js
       |— properties.js
```

---

## 🧰 Core Concepts

This editor intentionally avoids `<canvas>` and instead:

✔ Represents elements as real DOM nodes (divs, spans, etc.)  
✔ Uses CSS for positioning & resizing  
✔ Listens to pointer/mouse events for interaction  
✔ Maintains state for selection + layers  

---

## 🚀 Getting Started

Clone the repo:

```bash
git clone https://github.com/yourUsername/yourRepo.git
cd yourRepo
```

Open the project:

```bash
open index.html
```

Or just drag it into a browser.

---

## 🎮 Usage

1. Click the **Rectangle** or **Text** tool  
2. Click on the workspace to create an element  
3. Select & drag to move  
4. Use anchors to resize  
5. Adjust properties in sidebar (width, height, text, colors)  
6. Manage layers from the sidebar  
7. Save your design (optional)

---

## 🖼 Screenshot (Optional)

> Add screenshots to make it visually clear

Example:

| Workspace | Layers |
|----------|--------|
| ![workspace](link_here) | ![layers](link_here) |

---

## 🔮 Future Enhancements (Ideas)

- 🔹 Export to JSON & re-import
- 🔹 Snap-to-grid & alignment guides
- 🔹 Multi-select
- 🔹 Undo/redo
- 🔹 Text styling panel
- 🔹 Custom shapes
- 🔹 Export as PNG using html2canvas

---

## 🧑‍💻 Author

**Your Name**  
GitHub: https://github.com/yourUsername  

---

## 📬 Contributions

Pull requests & feature suggestions are welcome!

---

## 📝 License

MIT License — free to use & modify.

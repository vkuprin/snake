# Front-End Coding Challenge

**Build the Classic Snake Game**

---

### General Requirements

Create a fully playable Snake game that runs in the browser. The default board is **20 × 20 cells**, but your code should make it trivial to swap in a different size.

- Include detailed instructions on how to run the application and an explanation of assumptions you make (if any).

**IMPORTANT**:

Please limit the amount of time you spend on the problem up to 6 hours. If you haven't completed the challenge within the allotted time, please submit the work you have completed. Focus on implementing the requirements with the best code you can produce within the given timeframe.

Submit your solution either as a zip file via email or upload to a public repository (GitHub, Bitbucket, etc.) and share the url with us.

### Required Technology

#### Essential

- React 18 or later.
- Functional components and hooks.
- Unit tests
- Keyboard controls.

#### Nice‑to‑Have

- TypeScript.
- Tailwind CSS for styling and layout.

---

#### Gameplay Mechanics

| Feature         | Description                                                                                                                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Movement**    | The snake **moves automatically** one cell every tick (e.g., every X ms). Arrow keys do not move the snake, they only **change its direction** for the next tick. Hitting any wall immediately ends the game. |
| **Growth Rule** | The snake gains **+1 segment** each time the **food** is eaten.                                                                                                                                               |
| **Items**       | A single food item (blue) is always present on an empty cell. Eating it adds +3 points and immediately spawns new food elsewhere.                                                                             |
| **Scoring**     | Display the current score permanently on screen.                                                                                                                                                              |
| **Game Over**   | The session ends when **any** of the following occurs:<br>1. Score ≥ **30**<br>2. Snake collides with a wall<br>3. Snake collides with itself                                                                 |

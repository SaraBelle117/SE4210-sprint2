# SE/CprE 4210 - Learning Sprint 2, Problem 1

**Team:** Hacker Team 8
**Course:** SE/CprE 4210 (Software Security)

## Overview

An interactive, browser-based visualization of a classic stack-based buffer overflow. It shows how a string copied into a fixed-size buffer can spill past its boundary and overwrite adjacent stack memory, specifically the saved EBP (base pointer) and the saved return address (EIP).

This is a teaching tool, not a real exploit. It does not execute code, generate shellcode, or interact with any actual memory; it only visualizes the concept.

## Features

- Type any string and submit it to see it laid out byte-by-byte in a simulated buffer.
- Adjustable buffer size (1-50 bytes) via +/- controls.
- Automatic overflow detection: a yellow note prompts you to adjust the input or buffer size if there's no overflow, and switches to a red "Buffer overflow detected!" message once the string exceeds the buffer.
- Once overflow occurs, the characters that spill past the buffer are shown overwriting the saved EBP and return address slots, byte by byte, the same mechanism demonstrated in Problem 2's VM exercise.
- Reset button to clear the input and start over; Enter key submits as well.

## How to Run

No build step or dependencies. Clone the repo and open `index.html` in any modern browser.

```
git clone <repo-url>
cd <repo-folder>
open index.html
```

## Files

- `index.html` - page structure
- `style.css` - styling
- `script.js` - rendering and overflow logic
- `reflection.md` - reflection on the exercise and build process
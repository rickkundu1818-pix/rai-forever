/**
 * Tiny static file server.
 * This site is plain HTML/CSS/JS — no build step required — so this
 * server just serves the folder as-is. Used for local dev (`npm start`)
 * and as the Render "web service" entry point.
 */
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve both image locations under the same /images URL so the
// project can use public/images assets and the root images/gallery assets
// without one directory shadowing the other.
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/audio', express.static(path.join(__dirname, 'public/audio')));

// Keep the public cover separate from the full story document. This also
// ensures express.static does not serve index.html for the root URL first.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'cover.html'));
});
app.get('/story', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/chapter-one', (req, res) => {
  res.sendFile(path.join(__dirname, 'chapter-one.html'));
});
app.get('/chapter-two', (req, res) => {
  res.sendFile(path.join(__dirname, 'chapter-two.html'));
});
app.get('/chapter-three', (req, res) => {
  res.sendFile(path.join(__dirname, 'chapter-three.html'));
});
app.get('/memory-game', (req, res) => {
  res.sendFile(path.join(__dirname, 'memory-game.html'));
});
app.get('/soundtrack', (req, res) => {
  res.sendFile(path.join(__dirname, 'soundtrack.html'));
});
app.get('/mirror-of-us', (req, res) => {
  res.sendFile(path.join(__dirname, 'mirror-of-us.html'));
});
app.get('/our-constellation', (req, res) => {
  res.sendFile(path.join(__dirname, 'our-constellation.html'));
});

app.use(express.static(path.join(__dirname), { extensions: ['html'] }));

// Preserve the story shell for direct links to existing hash-based sections.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`RAI FOREVER running at http://localhost:${PORT}`);
});

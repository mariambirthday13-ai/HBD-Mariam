// Personalize these details before sharing the website.
const personalization = {
  herName: "beautiful",
  anniversary: "",
  insideJoke: "Ftaty elmodlla",
  accentColor: "#183354",
};

const photoQuotes = [
  "From the beging with this cuteee girl.",
  "HAPPY BIRYHDAYY TO MY BESTIE, to my twin,to my sister i wish for, to all our memories together,our laughs,our crying,I LOVE YOU MEROOOOOO❤️❤️🥰.",
  "Thank you for being part of all my stupid moments, endless laughs, and random chaos. I’m so grateful to have you in my life. Life would be so boring without you! Here’s to more memories, laughs, and years of putting up with each other. Love youuu merooo ❤️😂",
  "Happy birthday ya momo! ❤️ Thank you for always having my back and for being the sister I never knew I needed. To many more memories, laughs, and crazy moments together. Love you alwaysss ❤️😂",
  "And of course thank you for putting up with me and my nonsense all the time 😂 Wouldn’t trade our chaos for anything. Thank you for always being there whenever i needed and for being someone i can always count on.Here’s to many more years of laughing at the stupidest things together.Love youuu  momyyyy❤️",
  "For the first time we had our first photo.",
  "For the only one time that you asked me about one.",
  "For more of this habl photos with me.",
  "With more begging you to take another photo.",
  "To always being that one who is always damo t2yl w gmbk w m3aky f ay haga ya ftaty elmodlla.",
];

const screens = {
  video: document.querySelector("#video-screen"),
  message: document.querySelector("#message-screen"),
  gallery: document.querySelector("#gallery-screen"),
  voice: document.querySelector("#voice-screen"),
  finale: document.querySelector("#finale-screen"),
};
const introVideo = document.querySelector("#intro-video");
const videoPlaceholder = document.querySelector("#video-placeholder");
const music = new Audio("/assets/happy-birthday.mp3");
music.loop = true;
music.preload = "none";

const voiceMessage = document.querySelector("#voice-message");
const memoryCard = document.querySelector("#memory-card");
const memoryPhoto = document.querySelector("#memory-photo");
const photoPlaceholder = document.querySelector("#photo-placeholder");
const notice = document.querySelector("#media-notice");
let currentPhoto = 0;
let musicEnabled = true;
let noticeTimer;
let photoChangeTimer;
let touchStart;

document.documentElement.style.setProperty("--navy", personalization.accentColor);
document.querySelector("#her-name-short").textContent = personalization.herName;
document.querySelector("#her-name").textContent = personalization.herName;
document.querySelector("#finale-name").textContent = personalization.herName;
if (personalization.insideJoke) {
  const insideJoke = document.querySelector("#inside-joke");
  insideJoke.textContent = personalization.insideJoke;
  insideJoke.hidden = false;
}
if (personalization.anniversary) {
  const anniversary = document.querySelector("#anniversary");
  anniversary.textContent = personalization.anniversary;
  anniversary.hidden = false;
}

function showNotice(message) {
  notice.textContent = message;
  notice.classList.add("is-visible");
  window.clearTimeout(noticeTimer);
  noticeTimer = window.setTimeout(() => notice.classList.remove("is-visible"), 4500);
}

function showScreen(name) {
  notice.classList.remove("is-visible");
  window.clearTimeout(noticeTimer);
  Object.entries(screens).forEach(([screenName, screen]) => {
    const active = screenName === name;
    screen.hidden = !active;
    screen.classList.toggle("is-active", active);
  });

  if (name !== "video") {
    introVideo.pause();
  }

  if (name === "gallery") {
    document.querySelector("#sound-toggle").hidden = false;
    startMusic();
  } else {
    music.pause();
    document.querySelector("#sound-toggle").hidden = true;
  }

  if (name !== "voice") {
    voiceMessage.pause();
    document.querySelector("#voice-play-icon").textContent = "▶";
    document.querySelector("#play-voice").setAttribute("aria-label", "Play voice message");
  }
}

function startMusic() {
  if (!musicEnabled) return;
  music.play().catch(() => {
    showNotice("Add your birthday song as public/assets/happy-birthday.mp3 to hear it here.");
  });
}

function photoPath(index) {
  return `/assets/photos/photo-${String(index + 1).padStart(2, "0")}.jpg`;
}

function renderPhoto() {
  const path = photoPath(currentPhoto);
  const photoNumber = String(currentPhoto + 1).padStart(2, "0");

  memoryCard.classList.remove("is-changing");
  document.querySelector("#photo-count").textContent = `${photoNumber} / ${photoQuotes.length}`;
  document.querySelector("#memory-quote").textContent = photoQuotes[currentPhoto];
  document.querySelector("#placeholder-title").textContent = `Your photo ${photoNumber} goes here`;
  document.querySelector("#placeholder-path").textContent = path.replace(/^\//, "public/");
  memoryPhoto.alt = `Memory ${currentPhoto + 1}`;
  memoryPhoto.hidden = true;
  photoPlaceholder.hidden = false;
  memoryPhoto.dataset.photoPath = path;
  memoryPhoto.src = path;

  document.querySelectorAll(".progress-dot").forEach((dot, index) => {
    dot.classList.toggle("is-current", index === currentPhoto);
    dot.setAttribute("aria-current", index === currentPhoto ? "step" : "false");
  });
}

function changePhoto(nextIndex) {
  memoryCard.classList.add("is-changing");
  currentPhoto = (nextIndex + photoQuotes.length) % photoQuotes.length;
  window.clearTimeout(photoChangeTimer);
  photoChangeTimer = window.setTimeout(renderPhoto, 160);
}

function celebrate() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const colors = ["#183354", "#748ca7", "#c5a16b", "#d4dde6", "#a9bacb"];
  for (let index = 0; index < 48; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.setAttribute("aria-hidden", "true");
    piece.style.setProperty("--confetti-left", `${Math.random() * 100}%`);
    piece.style.setProperty("--confetti-color", colors[index % colors.length]);
    piece.style.setProperty("--confetti-delay", `${Math.random() * 0.9}s`);
    piece.style.setProperty("--confetti-duration", `${2.8 + Math.random() * 1.8}s`);
    piece.style.setProperty("--confetti-spin", `${Math.random() * 900 - 450}deg`);
    document.body.append(piece);
    piece.addEventListener("animationend", () => piece.remove(), { once: true });
  }
}

photoQuotes.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.className = "progress-dot";
  dot.type = "button";
  dot.setAttribute("aria-label", `Show photo ${index + 1}`);
  dot.addEventListener("click", () => changePhoto(index));
  document.querySelector("#progress-dots").append(dot);
});

memoryPhoto.addEventListener("load", () => {
  if (memoryPhoto.dataset.photoPath === memoryPhoto.src.replace(window.location.origin, "")) {
    memoryPhoto.hidden = false;
    photoPlaceholder.hidden = true;
  }
});

memoryPhoto.addEventListener("error", () => {
  if (memoryPhoto.dataset.photoPath === memoryPhoto.src.replace(window.location.origin, "")) {
    memoryPhoto.hidden = true;
    photoPlaceholder.hidden = false;
  }
});

introVideo.addEventListener("loadeddata", () => {
  videoPlaceholder.classList.remove("is-visible");
});
introVideo.addEventListener("error", () => {
  videoPlaceholder.classList.add("is-visible");
});
introVideo.addEventListener("playing", () => {
  videoPlaceholder.classList.remove("is-visible");
});
introVideo.addEventListener("ended", () => showScreen("message"));

document.querySelector("#skip-video").addEventListener("click", () => showScreen("message"));
document.querySelector("#video-back-10").addEventListener("click", () => seekVideo(-10));
document.querySelector("#video-forward-10").addEventListener("click", () => seekVideo(10));
document.querySelector("#open-memories").addEventListener("click", () => {
  currentPhoto = 0;
  renderPhoto();
  showScreen("gallery");
});
document.querySelector("#previous-photo").addEventListener("click", () => changePhoto(currentPhoto - 1));
document.querySelector("#next-photo").addEventListener("click", () => changePhoto(currentPhoto + 1));
document.querySelector("#finish-memories").addEventListener("click", () => showScreen("voice"));
document.querySelector("#back-to-memories").addEventListener("click", () => showScreen("gallery"));
document.querySelector("#finish-surprise").addEventListener("click", () => {
  showScreen("finale");
  celebrate();
});
document.querySelector("#replay-surprise").addEventListener("click", () => {
  showScreen("video");
  introVideo.currentTime = 0;
  introVideo.play().catch(() => {
    showNotice("Press play on the video when you're ready to watch it again.");
  });
});
document.querySelector("#revisit-memories").addEventListener("click", () => showScreen("gallery"));

function seekVideo(seconds) {
  const seek = () => {
    const nextTime = Math.max(0, introVideo.currentTime + seconds);
    introVideo.currentTime = Number.isFinite(introVideo.duration)
      ? Math.min(nextTime, introVideo.duration)
      : nextTime;
  };

  if (introVideo.readyState < HTMLMediaElement.HAVE_METADATA) {
    introVideo.addEventListener("loadedmetadata", seek, { once: true });
    return;
  }

  seek();
}

memoryCard.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "mouse") return;
  touchStart = { x: event.clientX, y: event.clientY };
});
memoryCard.addEventListener("pointerup", (event) => {
  if (!touchStart) return;
  const deltaX = event.clientX - touchStart.x;
  const deltaY = event.clientY - touchStart.y;
  touchStart = undefined;
  if (Math.abs(deltaX) < 45 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) return;
  changePhoto(currentPhoto + (deltaX < 0 ? 1 : -1));
});
memoryCard.addEventListener("pointercancel", () => {
  touchStart = undefined;
});

document.querySelector("#sound-toggle").addEventListener("click", () => {
  musicEnabled = !musicEnabled;
  document.querySelector("#sound-label").textContent = musicEnabled ? "Music on" : "Music off";
  document.querySelector("#sound-toggle").setAttribute(
    "aria-label",
    musicEnabled ? "Mute birthday music" : "Play birthday music",
  );
  if (musicEnabled) {
    startMusic();
  } else {
    music.pause();
  }
});

document.querySelector("#play-voice").addEventListener("click", () => {
  if (!voiceMessage.paused) {
    voiceMessage.pause();
    return;
  }
  voiceMessage.play().catch(() => {
    document.querySelector("#voice-status").textContent =
      "Add your recording as public/assets/voice-message.mp3 to play it here.";
  });
});

voiceMessage.addEventListener("play", () => {
  document.querySelector("#voice-play-icon").textContent = "Ⅱ";
  document.querySelector("#play-voice").setAttribute("aria-label", "Pause voice message");
  document.querySelector("#voice-status").textContent = "Playing your voice message";
});
voiceMessage.addEventListener("pause", () => {
  document.querySelector("#voice-play-icon").textContent = "▶";
  document.querySelector("#play-voice").setAttribute("aria-label", "Play voice message");
  if (voiceMessage.currentTime > 0) {
    document.querySelector("#voice-status").textContent = "Voice message paused";
  }
});
voiceMessage.addEventListener("ended", () => {
  document.querySelector("#voice-status").textContent = "Made with love, just for you";
});
voiceMessage.addEventListener("error", () => {
  document.querySelector("#voice-status").textContent =
    "Add your recording as public/assets/voice-message.mp3 to play it here.";
});

renderPhoto();

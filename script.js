const balloonMessages = [
    "You make my world brighter ♡",
    "Your smile is my favourite",
    "I'm so lucky to have you",
    "You are my happy place",
    "Forever cheering for you ♡"
];

const screens = document.querySelectorAll(".screen");

function showScreen(screenId) {

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(screenId).classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

const balloons = document.querySelectorAll(".balloon");

const balloonArea = document.getElementById("balloonArea");

const balloonProgress = document.getElementById("balloonProgress");

const toCakeBtn = document.getElementById("toCakeBtn");

let poppedCount = 0;


balloons.forEach((balloon, index) => {

    balloon.addEventListener("click", () => {

        if (balloon.classList.contains("popped")) {
            return;
        }

        const areaRect = balloonArea.getBoundingClientRect();

        const balloonRect = balloon.getBoundingClientRect();

        const message = document.createElement("div");

        message.className = "love-message";

        message.textContent = balloonMessages[index];

        message.style.left =
            (balloonRect.left - areaRect.left +
            balloonRect.width / 2) + "px";

        message.style.top =
            (balloonRect.top - areaRect.top +
            balloonRect.height / 2) + "px";

        balloonArea.appendChild(message);

        balloon.classList.add("popped");

        poppedCount++;

        balloonProgress.textContent =
            `${balloons.length - poppedCount} little surprises left ♡`;

        if (poppedCount === balloons.length) {

            balloonProgress.textContent =
                "You found all my little messages! ♡";

            toCakeBtn.classList.remove("hidden");
        }

        setTimeout(() => {
            message.remove();
        }, 2700);

    });

});


toCakeBtn.addEventListener("click", () => {

    showScreen("cakeScreen");

});

const candle = document.getElementById("candle");

const flame = document.getElementById("flame");

const smoke = document.getElementById("smoke");

const candleHint = document.getElementById("candleHint");

const toMomentsBtn = document.getElementById("toMomentsBtn");

let candleBlown = false;


function blowCandle() {

    if (candleBlown) {
        return;
    }

    candleBlown = true;

    flame.classList.add("out");

    smoke.classList.remove("show");

    void smoke.offsetWidth;

    smoke.classList.add("show");

    candleHint.textContent =
        "Wish made? I hope it comes true! ✨";

    toMomentsBtn.classList.remove("hidden");

}


candle.addEventListener("click", blowCandle);


toMomentsBtn.addEventListener("click", () => {

    showScreen("momentsScreen");

});

const memories = [

    {
        type: "video",
        src: "assets/moment1.mp4",
        title: "Our First Memory",
        description: "A beautiful moment with you ♡"
    },

    {
        type: "video",
        src: "assets/moment2.mp4",
        title: "Your Beautiful Smile",
        description: "My favourite view in the world ♡"
    },

    {
        type: "video",
        src: "assets/moment3.mp4",
        title: "Special Moments",
        description: "Every moment with you is special ♡"
    },

    {
        type: "video",
        src: "assets/moment4.mp4",
        title: "My Happiness",
        description: "You make everything beautiful ♡"
    },

    {
        type: "video",
        src: "assets/moment5.mp4",
        title: "Forever Memories",
        description: "Here's to many more memories ♡"
    }

];


let currentMemory = 0;

const mediaFrame = document.getElementById("mediaFrame");

const memoryCount = document.getElementById("memoryCount");

const memoryTitle = document.getElementById("memoryTitle");

const memoryDescription = document.getElementById("memoryDescription");

const memoryDots = document.getElementById("memoryDots");

const prevMemoryBtn = document.getElementById("prevMemoryBtn");

const nextMemoryBtn = document.getElementById("nextMemoryBtn");


function showMemory() {

    const memory = memories[currentMemory];

    mediaFrame.innerHTML = "";

    const video = document.createElement("video");

    video.src = memory.src;

    video.controls = true;

    video.playsInline = true;

    video.preload = "metadata";

    video.onerror = () => {

        mediaFrame.innerHTML = `
            <div class="media-placeholder">
                <span class="placeholder-heart">♡</span>
                <strong>Video not found</strong>
                <small>Check this file: ${memory.src}</small>
            </div>
        `;

    };

    mediaFrame.appendChild(video);


    memoryCount.textContent =
        `Memory ${currentMemory + 1} of ${memories.length}`;

    memoryTitle.textContent = memory.title;

    memoryDescription.textContent = memory.description;


    memoryDots.innerHTML = "";

    memories.forEach((item, index) => {

        const dot = document.createElement("span");

        dot.className =
            index === currentMemory ? "dot active" : "dot";

        memoryDots.appendChild(dot);

    });


    prevMemoryBtn.disabled = currentMemory === 0;

    prevMemoryBtn.style.opacity =
        currentMemory === 0 ? ".45" : "1";


    if (currentMemory === memories.length - 1) {

        nextMemoryBtn.textContent = "Open your letter ♡";

    } else {

        nextMemoryBtn.textContent = "Next memory →";

    }

}

prevMemoryBtn.addEventListener("click", () => {

    if (currentMemory > 0) {

        currentMemory--;

        showMemory();

    }

});

nextMemoryBtn.addEventListener("click", () => {

    if (currentMemory < memories.length - 1) {

        currentMemory++;

        showMemory();

    } else {

        showScreen("letterIntroScreen");

    }

});


showMemory();


const envelope = document.getElementById("envelope");


function openEnvelope() {

    envelope.classList.add("open");

    setTimeout(() => {

        showScreen("letterScreen");

    }, 750);

}


envelope.addEventListener("click", openEnvelope);

const closeLetterBtn = document.getElementById("closeLetterBtn");

closeLetterBtn.addEventListener("click", () => {

    showScreen("finalScreen");

});

const restartBtn = document.getElementById("restartBtn");


restartBtn.addEventListener("click", () => {

    poppedCount = 0;

    candleBlown = false;

    currentMemory = 0;


    balloons.forEach(balloon => {

        balloon.classList.remove("popped");

    });


    balloonArea.querySelectorAll(".love-message").forEach(message => {

        message.remove();

    });


    balloonProgress.textContent =
        "5 little surprises waiting for you";

    toCakeBtn.classList.add("hidden");


    flame.classList.remove("out");

    smoke.classList.remove("show");

    candleHint.textContent =
        "One little candle, one big wish ✨";

    toMomentsBtn.classList.add("hidden");


    envelope.classList.remove("open");


    showMemory();

    showScreen("balloonScreen");

});
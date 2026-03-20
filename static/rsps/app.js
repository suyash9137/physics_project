// RSPS Frontend Logic
const videoElement = document.getElementById('webcam');
const startBtn = document.getElementById('start-btn');
const endBtn = document.getElementById('end-btn');
const statusEl = document.getElementById('sys-status');
const audioBar = document.getElementById('audio-bar');
const logEl = document.getElementById('log');
const recOverlay = document.getElementById('recording-indicator');

let mediaRecorder;
let audioContext;
let analyser;
let microphone;
let pingInterval;
let sessionId = "mock_session_" + Date.now();
const API_URL = "http://localhost:8000/api";

function log(msg) {
    logEl.innerHTML += `[${new Date().toLocaleTimeString()}] ${msg}<br>`;
    logEl.scrollTop = logEl.scrollHeight;
}

startBtn.addEventListener('click', async () => {
    // Browsers block fullscreen if it's not synchronous to the click event.
    // It must happen BEFORE any await calls (like getUserMedia).
    log("Requesting fullscreen mode...");
    try {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        }
    } catch (e) {
        log("Fullscreen request failed. Proceeding...");
    }

    try {
        log("Requesting camera and microphone access...");
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        videoElement.srcObject = stream;
        
        statusEl.textContent = "Active";
        statusEl.className = "status active";
        startBtn.disabled = true;
        endBtn.disabled = false;
        
        setupAudioAnalysis(stream);
        startDisconnectMitigation();
        
        log("Permissions granted. Exam session initialized.");
    } catch (err) {
        log(`Error accessing hardware: ${err.message}`);
        statusEl.textContent = "Hardware Disconnected";
        statusEl.className = "status error";
        
        // Disconnect mitigation feature: if camera/mic fails, ping backend to pause the test
        reportHardwareFailure();
    }
});

function setupAudioAnalysis(stream) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    microphone = audioContext.createMediaStreamSource(stream);
    microphone.connect(analyser);
    
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    function measureDecibels() {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for(let i = 0; i < bufferLength; i++) {
            sum += dataArray[i];
        }
        let average = sum / bufferLength;
        // Mock visualizer
        audioBar.style.width = Math.min(100, (average / 150) * 100) + '%';
        
        // More precise acoustic trigger check (tuned down threshold)
        if(average > 50) { // arbitrary threshold, lowered for higher sensitivity
            triggerCapture("acoustic_threshold_exceeded");
        }
        
        if (statusEl.className.includes("active")) {
            requestAnimationFrame(measureDecibels);
        }
    }
    measureDecibels();
}

function startDisconnectMitigation() {
    pingInterval = setInterval(() => {
        // frontend ping to backend
        log("Pinging backend to confirm active connection...");
        fetch(`${API_URL}/ping?session_id=${sessionId}`, { method: 'POST' })
            .catch(e => log("Ping failed. Connection unstable."));
    }, 10000); // ping every 10 seconds
}

function reportHardwareFailure() {
    log("CRITICAL: Hardware failure. Notifying backend to pause test...");
    // Mock backend request to pause test timer
}

// Mock capture event
let isCapturing = false;
function triggerCapture(reason) {
    if (isCapturing) return;
    isCapturing = true;
    recOverlay.style.display = "block";
    log(`⚠️ Event Triggered: ${reason}. Capturing next 5 seconds...`);
    
    setTimeout(() => {
        isCapturing = false;
        recOverlay.style.display = "none";
        log(`Event upload complete.`);
    }, 5000);
}

// Random triggers simulation
setInterval(() => {
    if (statusEl.className.includes("active") && Math.random() > 0.8) {
        triggerCapture("random_sample");
    }
}, 15000); // Check every 15s to maybe trigger

function endExam() {
    const stream = videoElement.srcObject;
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    clearInterval(pingInterval);
    if (audioContext && audioContext.state !== 'closed') audioContext.close();
    
    statusEl.textContent = "Exam Terminated";
    statusEl.className = "status";
    startBtn.disabled = false;
    endBtn.disabled = true;
    
    if (document.fullscreenElement) {
        document.exitFullscreen().catch(err => log(err));
    }
}

endBtn.addEventListener('click', () => {
    log("Exam terminated successfully by user.");
    endExam();
});

document.addEventListener('fullscreenchange', () => {
    // If we exited fullscreen while the exam is active, end it immediately
    if (!document.fullscreenElement && statusEl.className.includes("active")) {
        log("CRITICAL: Fullscreen exited. Terminating exam immediately due to security violation.");
        triggerCapture("fullscreen_exited");
        // End exam after a brief delay to allow capture simulation
        setTimeout(endExam, 2000); 
    }
});

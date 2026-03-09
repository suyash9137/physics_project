# Comprehensive TODO List

Based on the analysis of the provided documents, here is the structured TODO list broken down by project.

*(Note: The "Tech stack.pdf" and "Design Document.pdf" were identical in content, describing "The Edwin Group" project. The "Product Requirements Document.pdf" describes the "Random-Sample Proctoring System".)*

## Project 1: The Edwin Group Branding & Web Design

### 1. Brand Identity & Strategy
- [ ] Define and establish a Unified Brand Voice across all sub-groups.
- [ ] Finalize the color palette (Warm primary backgrounds, earthy/vibrant accent tones).
- [ ] Select and map typography (Bold serifs/geometric sans-serifs for headings, clean sans-serifs for body copy).
- [ ] Compile comprehensive Brand Guidelines detailing logo usage, color pairings, and typography rules.

### 2. Assets & Media
- [ ] Create custom 3D models (soft, tactile, abstract educational shapes).
- [ ] Develop subtle 3D hover animations and motion graphics.

### 3. UI/UX & Web Development
- [ ] Design a modular, card-based grid system for organizing diverse content domains.
- [ ] Design a streamlined Information Architecture catering to multiple personas (teachers, admins, partners).
- [ ] Implement micro-interactions (smooth hover states, page transitions, parallax scrolling).
- [ ] Ensure full responsive translation of heavy 3D elements and typography from desktop to mobile.

---

## Project 2: Random-Sample Proctoring System (RSPS)

### 1. Project Setup & Architecture
- [ ] Set up Frontend using HTML/CSS/JavaScript.
- [ ] Set up Backend using Python (Flask/FastAPI) or Node.js.
- [ ] Provision Cloud Storage (AWS S3 or Google Cloud Storage) for media chunks.

### 2. Frontend Development & Hardware Interfacing
- [ ] Implement UI Privacy Notice ("You will not be recorded continuously...").
- [ ] Integrate `MediaDevices.getUserMedia()` API for webcam and microphone access.
- [ ] Integrate Web Audio API (`AnalyserNode`) for local decibel measurement.
- [ ] Build hardware disconnect mitigation (Frontend ping to backend to pause the test if camera/mic disconnects).

### 3. Core Engine & Trigger System
- [ ] Implement the Randomized Sampling Algorithm (calculating 5-15 random timestamps per exam duration).
- [ ] Implement the Acoustic Trigger (forcing capture if background sound exceeds specific decibel thresholds).

### 4. Audio & Video Processing Modules (AI/Analysis)
- [ ] **Audio Module:** Configure capture of 5-10 second clips.
- [ ] **Audio Module:** Analyze clips for amplitude/decibel levels (librosa).
- [ ] **Audio Module:** Implement Voice Activity Detection (VAD) to distinguish speech from background noise.
- [ ] **Video Module:** Configure capture of 5-10 second video clips or 3-5 high-resolution images.
- [ ] **Video Module:** Implement Face Count analysis using OpenCV/MediaPipe (detect 0 faces or 2+ faces).
- [ ] **Video Module:** Implement Head Pose Estimation to accurately flag off-screen looking.

### 5. Examiner Dashboard
- [ ] Build the Dashboard User Interface.
- [ ] Implement algorithms to calculate a summarized "Trust Score" per student.
- [ ] Develop the "Flagged Events" list showing timestamps and reasons alongside the 10-second media clip for review.

### 6. Security & Data Management
- [ ] Implement media encryption in transit and at rest.
- [ ] Configure automatic media deletion pipelines to clear data after 30 days.
- [ ] Ensure bandwidth optimizations to cap uploads at 15-20 MB per student/hour.

import random

class AudioModule:
    @staticmethod
    def analyze_amplitude(filepath="mock_clip.wav"):
        """
        Mock analyzing clips for amplitude/decibel levels using librosa.
        In reality: `y, sr = librosa.load(filepath); rms = librosa.feature.rms(y=y)`
        """
        print(f"Analyzing {filepath} structure with mock librosa analyzer...")
        return random.uniform(30.0, 75.0)

    @staticmethod
    def detect_voice_activity(filepath="mock_clip.wav"):
        """
        Mock Voice Activity Detection (VAD) to distinguish speech from noise.
        """
        print(f"Running VAD on {filepath}...")
        has_speech = random.random() > 0.8 # 20% chance of detecting speech
        return {"has_speech": has_speech, "confidence": random.uniform(0.7, 0.99)}

class VideoModule:
    @staticmethod
    def face_count_analysis(frames):
        """
        Mock Face Count analysis using OpenCV/MediaPipe.
        Detects 0 faces or 2+ faces.
        """
        print(f"Analyzing {len(frames)} frames for face count using MediaPipe...")
        rand_val = random.random()
        if rand_val < 0.05:
            count = 0 # Empty chair
        elif rand_val < 0.1:
            count = 2 # Multiple faces
        else:
            count = 1 # Normal
        return count

    @staticmethod
    def head_pose_estimation(frame):
        """
        Mock Head Pose Estimation to accurately flag off-screen looking.
        """
        print("Running head pose estimation...")
        pitch = random.uniform(-30, 30)
        yaw = random.uniform(-45, 45)
        
        # If yaw is > 30 or < -30, flag as looking away
        flag = abs(yaw) > 30
        return {"off_screen": flag, "yaw": yaw, "pitch": pitch}

# Test mock modules
if __name__ == "__main__":
    print(AudioModule.detect_voice_activity())
    print(VideoModule.face_count_analysis(["frame1", "frame2"]))
    print(VideoModule.head_pose_estimation("frame1"))

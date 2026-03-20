import random
import math

class RSPSEngine:
    def __init__(self, exam_duration_minutes=60, min_samples=5, max_samples=15):
        self.exam_duration_seconds = exam_duration_minutes * 60
        self.num_samples = random.randint(min_samples, max_samples)

    def generate_random_timestamps(self):
        """
        Calculates 5-15 random timestamps per exam duration.
        Returns a sorted list of timestamps in seconds.
        """
        timestamps = []
        for _ in range(self.num_samples):
            # Ensuring timestamps are spread somewhat evenly but randomly
            ts = random.randint(0, self.exam_duration_seconds)
            timestamps.append(ts)
        return sorted(timestamps)

    @staticmethod
    def acoustic_trigger_check(current_decibel, threshold=60.0):
        """
        Checks if background sound exceeds specific decibel thresholds.
        If it does, it forces an immediate capture sequence.
        """
        return current_decibel >= threshold

# Example usage:
if __name__ == "__main__":
    engine = RSPSEngine(60)
    print(f"Generated {engine.num_samples} timestamps for a 60 min exam:")
    print(engine.generate_random_timestamps())
    print("\nAcoustic Trigger Check (55dB vs 60dB threshold):")
    print(RSPSEngine.acoustic_trigger_check(55.0))
    print("\nAcoustic Trigger Check (65dB vs 60dB threshold):")
    print(RSPSEngine.acoustic_trigger_check(65.0))

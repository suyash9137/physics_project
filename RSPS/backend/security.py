import hashlib
from datetime import datetime, timedelta

class RSPSSecurity:
    @staticmethod
    def encrypt_media(data: bytes, key: str = "super_secret_key"):
        """
        Mock Media Encryption (AES) in transit and at rest.
        """
        print("Encrypting media chunk...")
        # Simple mock hash for demonstration
        h = hashlib.sha256(data + key.encode()).hexdigest()
        return h

    @staticmethod
    def enforce_bandwidth_caps(student_data_uploaded_mb):
        """
        Ensure bandwidth optimizations to cap uploads at 15-20 MB per student/hour.
        """
        max_mb = 20.0
        if student_data_uploaded_mb > max_mb:
            print("Bandwidth cap exceeded. Applying heavy compression/skipping visual frames.")
            return False
        return True

    @staticmethod
    def auto_delete_pipeline(database_records):
        """
        Automatic media deletion pipelines to clear data after 30 days.
        """
        thirty_days_ago = datetime.now() - timedelta(days=30)
        deleted_count = 0
        
        for record in database_records:
            record_date = record.get("upload_date")
            if record_date and record_date < thirty_days_ago:
                print(f"Deleting 30-day-old media record: {record['id']}")
                # os.remove(record["filepath"])
                deleted_count += 1
                
        return deleted_count

# Mock DB test
if __name__ == "__main__":
    db = [
        {"id": "doc1", "upload_date": datetime.now() - timedelta(days=31)},
        {"id": "doc2", "upload_date": datetime.now() - timedelta(days=5)}
    ]
    RSPSSecurity.auto_delete_pipeline(db)

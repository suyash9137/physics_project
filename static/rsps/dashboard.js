const mockStudents = [
    {
        id: "STU-001",
        name: "Alice Johnson",
        trustScore: 98,
        flags: []
    },
    {
        id: "STU-002",
        name: "Bob Smith",
        trustScore: 45,
        flags: [
            { time: "10:15", reason: "Multiple faces detected in frame" },
            { time: "10:22", reason: "Significant background noise (75dB)" },
            { time: "10:30", reason: "Head pose indicates looking off-screen for 15s" }
        ]
    },
    {
        id: "STU-003",
        name: "Charlie Brown",
        trustScore: 85,
        flags: [
            { time: "09:45", reason: "Acoustic threshold exceeded briefly" }
        ]
    }
];

function getScoreClass(score) {
    if (score >= 80) return "score-high";
    if (score >= 50) return "score-med";
    return "score-low";
}

function renderDashboard() {
    const grid = document.getElementById("student-grid");
    
    // Sort by lowest trust score first
    const sortedStudents = [...mockStudents].sort((a,b) => a.trustScore - b.trustScore);
    
    sortedStudents.forEach(student => {
        const card = document.createElement("div");
        card.className = "card";
        
        let flagsHtml = "";
        if (student.flags.length > 0) {
            flagsHtml = `<div class="flag-list">
                <strong>Flagged Events:</strong>
                ${student.flags.map(f => `<div class="flag-item">${f.time} - ${f.reason}</div>`).join('')}
            </div>`;
        } else {
            flagsHtml = `<div class="flag-list" style="color:#27ae60">No anomalies detected.</div>`;
        }
        
        card.innerHTML = `
            <div style="font-weight:bold; font-size:18px;">${student.name}</div>
            <div style="font-size:12px; color:#999;">ID: ${student.id}</div>
            
            <div class="trust-score ${getScoreClass(student.trustScore)}">
                Trust Score: ${student.trustScore}/100
            </div>
            
            ${flagsHtml}
            
            <button class="btn">Review Media Clips</button>
        `;
        
        grid.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", renderDashboard);

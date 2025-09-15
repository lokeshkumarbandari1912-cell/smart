// Global State Management
let systemState = {
    isOnline: true,
    isLoading: true,
    machines: [
        { id: 1, name: 'CNC Machine', usage: 2.1, status: 'online', efficiency: 94, temperature: 65 },
        { id: 2, name: 'Welding Unit', usage: 1.5, status: 'online', efficiency: 87, temperature: 72 },
        { id: 3, name: 'Conveyor Belt', usage: 0.8, status: 'online', efficiency: 96, temperature: 45 },
        { id: 4, name: 'Compressor', usage: 1.2, status: 'online', efficiency: 89, temperature: 68 },
        { id: 5, name: 'Packaging Unit', usage: 0.9, status: 'online', efficiency: 92, temperature: 52 }
    ],
    liveUsage: 6.5,
    totalSavings: 127.50,
    systemHealth: { cpu: 45, memory: 62, network: 28 },
    historicalData: {
        daily: {
            labels: ['10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM'],
            values: [3.5, 4.2, 5.1, 4.8, 5.4, 6.0, 5.7],
        },
        weekly: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            values: [28.5, 32.1, 30.8, 29.4, 31.2, 15.7, 10.2],
        },
        monthly: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            values: [125, 118, 132, 145],
        }
    },
    aiSuggestions: [
        'Machine #2 (Welding Unit) is running 15% above optimal temperature. Consider scheduling maintenance.',
        'Peak energy usage detected at 2 PM daily. Consider redistributing workload to off-peak hours.',
        'CNC Machine efficiency can be improved by 3% with updated cutting parameters.',
        'Compressor shows irregular pressure patterns. Preventive maintenance recommended.',
        'Energy costs can be reduced by $45/month by optimizing conveyor belt speed during low-demand periods.'
    ]
};

let updateInterval;
let charts = {};

// Initialize Dashboard
function initDashboard() {
    hideLoadingScreen();
    updateClock();
    renderAllComponents();
    setupEventListeners();
    startRealTimeUpdates();
    initHistoricalChart('daily');
    
    setInterval(updateClock, 1000);
}

// Loading Screen Management
function hideLoadingScreen() {
    setTimeout(() => {
        document.getElementById('loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
            systemState.isLoading = false;
        }, 500);
    }, 2000);
}

// Clock Update
function updateClock() {
    const now = new Date();
    document.getElementById('current-time').textContent = now.toLocaleTimeString();
}

// Real-time Updates
function startRealTimeUpdates() {
    if (updateInterval) clearInterval(updateInterval);
    
    updateInterval = setInterval(() => {
        if (systemState.isOnline) {
            updateLiveData();
            renderAllComponents();
        }
    }, 2000);
}

function updateLiveData() {
    if (!systemState.isOnline) return;
    
    systemState.machines.forEach(machine => {
        if (machine.status === 'online') {
            machine.usage = Math.max(0.1, machine.usage + (Math.random() * 0.4 - 0.2));
            machine.efficiency = Math.min(100, Math.max(80, machine.efficiency + (Math.random() * 4 - 2)));
            machine.temperature = Math.max(40, machine.temperature + (Math.random() * 6 - 3));
        }
    });
    
    systemState.liveUsage = systemState.machines.reduce((total, machine) => 
        total + (machine.status === 'online' ? machine.usage : 0), 0);
    
    systemState.systemHealth.cpu = Math.min(100, Math.max(20, systemState.systemHealth.cpu + (Math.random() * 10 - 5)));
    systemState.systemHealth.memory = Math.min(100, Math.max(30, systemState.systemHealth.memory + (Math.random() * 8 - 4)));
    systemState.systemHealth.network = Math.min(100, Math.max(10, systemState.systemHealth.network + (Math.random() * 6 - 3)));
    
    const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    systemState.historicalData.daily.labels.push(currentTime);
    systemState.historicalData.daily.values.push(systemState.liveUsage);
    
    if (systemState.historicalData.daily.labels.length > 10) {
        systemState.historicalData.daily.labels.shift();
        systemState.historicalData.daily.values.shift();
    }
}

// Render Components
function renderAllComponents() {
    renderLiveUsage();
    renderMachineList();
    renderSystemHealth();
    renderSuggestions();
    renderMetrics();
    updateCharts();
}

function renderLiveUsage() {
    document.getElementById('live-usage').textContent = systemState.liveUsage.toFixed(1);
    renderPowerGauge();
}

function renderPowerGauge() {
    const canvas = document.getElementById('power-gauge');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 8;
    ctx.stroke();
    
    const progress = Math.min(systemState.liveUsage / 10, 1);
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (2 * Math.PI * progress);
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = systemState.isOnline ? '#4a90e2' : '#ef4444';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.stroke();
}

function renderMachineList() {
    const container = document.getElementById('machine-list');
    container.innerHTML = '';
    
    systemState.machines.forEach(machine => {
        const div = document.createElement('div');
        div.className = `machine-item ${machine.status === 'online' ? 'machine-online' : 'machine-offline'}`;
        div.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="w-3 h-3 rounded-full ${machine.status === 'online' ? 'bg-green-400' : 'bg-red-400'}"></div>
                <span class="text-white font-medium">${machine.name}</span>
            </div>
            <div class="text-right">
                <div class="text-white font-bold">${machine.usage.toFixed(1)} kWh</div>
                <div class="text-xs text-gray-300">${machine.efficiency}% eff</div>
            </div>
        `;
        container.appendChild(div);
    });
}

function renderSystemHealth() {
    document.getElementById('cpu-usage').textContent = `${systemState.systemHealth.cpu}%`;
    document.getElementById('memory-usage').textContent = `${systemState.systemHealth.memory}%`;
    document.getElementById('network-usage').textContent = `${systemState.systemHealth.network}%`;
    
    document.querySelector('.bg-green-500').style.width = `${systemState.systemHealth.cpu}%`;
    document.querySelector('.bg-blue-500').style.width = `${systemState.systemHealth.memory}%`;
    document.querySelector('.bg-purple-500').style.width = `${systemState.systemHealth.network}%`;
}

function renderSuggestions() {
    const container = document.getElementById('suggestions-list');
    container.innerHTML = '';
    
    systemState.aiSuggestions.forEach(suggestion => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.innerHTML = `
            <div class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="fas fa-lightbulb text-white text-sm"></i>
            </div>
            <p class="text-white text-sm">${suggestion}</p>
        `;
        container.appendChild(div);
    });
}

function renderMetrics() {
    document.getElementById('cost-savings').textContent = `$${systemState.totalSavings.toFixed(2)}`;
    
    const efficiency = systemState.machines.reduce((avg, machine) => avg + machine.efficiency, 0) / systemState.machines.length;
    document.getElementById('efficiency-score').textContent = `${efficiency.toFixed(1)}%`;
    
    const uptime = systemState.isOnline ? 99.8 : 0;
    document.getElementById('uptime-score').textContent = `${uptime}%`;
}

function updateCharts() {
    if (charts.historical) {
        charts.historical.data.datasets[0].data = systemState.historicalData.daily.values;
        charts.historical.data.labels = systemState.historicalData.daily.labels;
        charts.historical.update('none');
    }
    
    renderRealtimeChart();
    renderDistributionChart();
}

function renderRealtimeChart() {
    const canvas = document.getElementById('realtime-chart');
    const ctx = canvas.getContext('2d');
    
    if (charts.realtime) {
        charts.realtime.destroy();
    }
    
    charts.realtime = new Chart(ctx, {
        type: 'line',
        data: {
            labels: systemState.historicalData.daily.labels.slice(-7),
            datasets: [{
                label: 'Live Energy',
                data: systemState.historicalData.daily.values.slice(-7),
                borderColor: '#4a90e2',
                backgroundColor: 'rgba(74, 144, 226, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { display: false },
                y: { display: false }
            }
        }
    });
}

function renderDistributionChart() {
    const canvas = document.getElementById('distribution-chart');
    const ctx = canvas.getContext('2d');
    
    if (charts.distribution) {
        charts.distribution.destroy();
    }
    
    charts.distribution = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: systemState.machines.map(m => m.name),
            datasets: [{
                data: systemState.machines.map(m => m.usage),
                backgroundColor: [
                    '#4a90e2', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' } }
        }
    });
}

function initHistoricalChart(timeRange = 'daily') {
    const canvas = document.getElementById('historical-chart');
    const ctx = canvas.getContext('2d');
    
    if (charts.historical) {
        charts.historical.destroy();
    }
    
    const data = systemState.historicalData[timeRange];
    
    charts.historical = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Energy Usage (kWh)',
                data: data.values,
                backgroundColor: 'rgba(74, 144, 226, 0.8)',
                borderColor: '#4a90e2',
                borderWidth: 1,
                borderRadius: 8,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Energy (kWh)', color: 'white' },
                    ticks: { color: 'white' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                },
                x: {
                    ticks: { color: 'white' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                }
            }
        }
    });
}

// Event Listeners
function setupEventListeners() {
    document.getElementById('start-all-btn').addEventListener('click', startAllMachines);
    document.getElementById('emergency-shutdown-btn').addEventListener('click', emergencyShutdown);
    document.getElementById('ai-optimize-btn').addEventListener('click', runAIOptimization);
    document.getElementById('export-report-btn').addEventListener('click', exportReport);
    
    document.getElementById('daily-btn').addEventListener('click', () => switchTimeRange('daily'));
    document.getElementById('weekly-btn').addEventListener('click', () => switchTimeRange('weekly'));
    document.getElementById('monthly-btn').addEventListener('click', () => switchTimeRange('monthly'));
}

function switchTimeRange(range) {
    document.querySelectorAll('.time-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${range}-btn`).classList.add('active');
    initHistoricalChart(range);
}

// Start the dashboard
window.addEventListener('DOMContentLoaded', () => {
    initDashboard();
});

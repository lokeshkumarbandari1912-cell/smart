// System Status Management
function updateSystemStatus(isOnline) {
    systemState.isOnline = isOnline;
    const banner = document.getElementById('system-banner');
    const statusText = document.getElementById('system-status-text');
    const powerStatus = document.getElementById('power-status');
    
    if (isOnline) {
        banner.className = 'fixed top-0 left-0 right-0 bg-green-600 text-white text-center py-2 z-40 transition-all duration-500';
        statusText.innerHTML = '<i class="fas fa-circle text-green-300 mr-2 animate-pulse"></i>System Online - All Systems Operational';
        powerStatus.className = 'status-badge status-online';
        powerStatus.innerHTML = '<i class="fas fa-circle mr-1"></i>Live';
    } else {
        banner.className = 'fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 z-40 transition-all duration-500';
        statusText.innerHTML = '<i class="fas fa-exclamation-triangle text-red-300 mr-2"></i>System Offline - Emergency Shutdown Active';
        powerStatus.className = 'status-badge status-offline';
        powerStatus.innerHTML = '<i class="fas fa-circle mr-1"></i>Offline';
    }
}

// Emergency Shutdown
function emergencyShutdown() {
    if (confirm('⚠️ EMERGENCY SHUTDOWN\n\nThis will immediately stop all machines and halt operations.\n\nAre you sure you want to proceed?')) {
        showNotification('Emergency Shutdown', 'All systems are being shut down...', 'error');
        
        systemState.isOnline = false;
        systemState.machines.forEach(machine => {
            machine.status = 'offline';
            machine.usage = 0;
        });
        systemState.liveUsage = 0;
        
        if (updateInterval) clearInterval(updateInterval);
        
        updateSystemStatus(false);
        renderAllComponents();
        
        setTimeout(() => {
            showNotification('System Offline', 'Emergency shutdown completed. All machines stopped.', 'error');
        }, 2000);
    }
}

// Start All Machines
function startAllMachines() {
    if (!systemState.isOnline) {
        showNotification('Starting System', 'Initializing all machines...', 'info');
        
        setTimeout(() => {
            systemState.isOnline = true;
            systemState.machines.forEach(machine => {
                machine.status = 'online';
                machine.usage = Math.random() * 2 + 0.5;
            });
            
            updateSystemStatus(true);
            startRealTimeUpdates();
            renderAllComponents();
            
            showNotification('System Online', 'All machines started successfully!', 'success');
        }, 3000);
    } else {
        showNotification('System Status', 'All machines are already running!', 'info');
    }
}

// AI Optimization
function runAIOptimization() {
    showNotification('AI Analysis', 'Running energy optimization analysis...', 'info');
    
    setTimeout(() => {
        const savings = Math.random() * 50 + 20;
        systemState.totalSavings += savings;
        
        showNotification('AI Optimization Complete', `Potential savings identified: $${savings.toFixed(2)}`, 'success');
        renderAllComponents();
    }, 2000);
}

// Export Report
function exportReport() {
    showNotification('Generating Report', 'Creating comprehensive energy report...', 'info');
    
    setTimeout(() => {
        const reportData = generateReportData();
        downloadCSVReport(reportData);
        showNotification('Report Ready', 'Energy report downloaded successfully!', 'success');
    }, 1500);
}

// Generate Report Data
function generateReportData() {
    return [
        ['EnergizeAI - Energy Management Report'],
        ['Generated:', new Date().toLocaleString()],
        [''],
        ['System Status:', systemState.isOnline ? 'Online' : 'Offline'],
        ['Total Live Usage:', `${systemState.liveUsage.toFixed(2)} kWh`],
        ['Total Savings Today:', `$${systemState.totalSavings.toFixed(2)}`],
        [''],
        ['Machine Status Report:'],
        ['Machine Name', 'Status', 'Usage (kWh)', 'Efficiency (%)', 'Temperature (°C)'],
        ...systemState.machines.map(machine => [
            machine.name,
            machine.status,
            machine.usage.toFixed(2),
            machine.efficiency,
            machine.temperature
        ]),
        [''],
        ['System Health:'],
        ['Component', 'Usage (%)'],
        ['CPU', systemState.systemHealth.cpu],
        ['Memory', systemState.systemHealth.memory],
        ['Network', systemState.systemHealth.network],
        [''],
        ['AI Recommendations:'],
        ...systemState.aiSuggestions.map((suggestion, index) => [`${index + 1}.`, suggestion])
    ];
}

// Download CSV Report
function downloadCSVReport(data) {
    const csvContent = data.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `energize-ai-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Notification System
function showNotification(title, message, type = 'info') {
    const toast = document.getElementById('notification-toast');
    const icon = document.getElementById('toast-icon');
    const titleEl = document.getElementById('toast-title');
    const messageEl = document.getElementById('toast-message');
    
    const configs = {
        success: { icon: 'fas fa-check', bg: 'bg-green-500', color: 'text-green-600' },
        error: { icon: 'fas fa-times', bg: 'bg-red-500', color: 'text-red-600' },
        info: { icon: 'fas fa-info', bg: 'bg-blue-500', color: 'text-blue-600' },
        warning: { icon: 'fas fa-exclamation', bg: 'bg-yellow-500', color: 'text-yellow-600' }
    };
    
    const config = configs[type] || configs.info;
    icon.className = `w-8 h-8 rounded-full flex items-center justify-center ${config.bg}`;
    icon.innerHTML = `<i class="${config.icon} text-white"></i>`;
    titleEl.textContent = title;
    titleEl.className = `font-bold ${config.color}`;
    messageEl.textContent = message;
    
    toast.style.transform = 'translateX(0)';
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
    }, 4000);
}

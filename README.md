# 🔋 Smart Energy Management System

A comprehensive IoT-based energy monitoring and optimization platform designed for small industries, featuring real-time monitoring, AI-powered optimization, and advanced analytics.

![Energy Management Dashboard](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-16.x-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🌟 Key Features

### 🔍 Real-Time Monitoring
- **Live Energy Tracking**: Monitor power consumption, voltage, current, and temperature across all machines
- **5-Second Updates**: Real-time data streaming via WebSocket connections
- **Machine Status**: Track active, idle, and offline equipment status
- **3D Visualizations**: Interactive 3D energy orbs and advanced chart visualizations

### 🤖 AI-Powered Optimization
- **Smart Suggestions**: AI algorithms analyze patterns and recommend energy-saving actions
- **Predictive Maintenance**: Temperature and performance-based maintenance alerts
- **Schedule Optimization**: Identify off-hours high consumption and suggest scheduling changes
- **Cost Savings Calculator**: Real-time potential savings calculations

### 📊 Advanced Analytics
- **Historical Data**: Comprehensive energy consumption trends and analysis
- **Multiple Chart Types**: Power trends, efficiency metrics, cost analysis, peak usage patterns
- **Carbon Footprint Tracking**: CO2 emissions monitoring and sustainability scoring
- **Professional Reporting**: Downloadable PDF and text reports with detailed metrics

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Modern, professional interface with holographic effects
- **Dark/Light Themes**: Seamless theme switching with smooth transitions
- **Responsive Design**: Mobile-friendly dashboard for on-the-go monitoring
- **Interactive Elements**: Clickable metrics, animated transitions, and hover effects

### 🔌 IoT Integration
- **MQTT Protocol**: Real-time communication with industrial IoT devices
- **Multi-Device Support**: CNC machines, conveyors, welding stations, compressors, packaging equipment
- **Scalable Architecture**: Easy integration of new machines and sensors
- **Device Health Monitoring**: Connection status and device performance tracking

## 🚀 Quick Start

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager
- MQTT broker (optional for real devices)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd smart-energy-management
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start the application**
```bash
npm start
```

5. **Access the dashboard**
Open your browser and navigate to `http://localhost:3000`

## 📋 Project Structure

```
smart-energy-management/
├── 📁 public/                 # Frontend assets
│   ├── 📁 js/                # JavaScript modules
│   │   ├── dashboard.js      # Main dashboard logic
│   │   ├── charts.js         # Chart implementations
│   │   └── charts_new.js     # Advanced 3D visualizations
│   └── index.html            # Main dashboard interface
├── 📁 docs/                  # Documentation
│   ├── PROJECT_OVERVIEW.md   # Comprehensive project details
│   ├── INSTALLATION_GUIDE.md # Setup and configuration guide
│   ├── API_DOCUMENTATION.md  # REST API and WebSocket docs
│   └── DEPLOYMENT_GUIDE.md   # Production deployment guide
├── server.js                 # Node.js backend server
├── package.json              # Dependencies and scripts
├── energy_data.db           # SQLite database
└── .env                     # Environment configuration
```

## 🔧 Configuration

### Environment Variables

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
DB_PATH=./energy_data.db

# MQTT Configuration
MQTT_BROKER=mqtt://localhost:1883
MQTT_USERNAME=your_username
MQTT_PASSWORD=your_password

# Energy Calculations
ENERGY_COST_PER_KWH=0.12
CO2_PER_KWH=0.5

# Alert Thresholds
HIGH_TEMP_THRESHOLD=45
HIGH_POWER_THRESHOLD_MULTIPLIER=0.9
```

### Machine Configuration

The system supports various industrial machines:

| Machine Type | Max Power | Location | Features |
|-------------|-----------|----------|----------|
| CNC Machine | 25 kW | Production Floor A | High precision monitoring |
| Conveyor Belt | 8 kW | Assembly Line | Continuous operation tracking |
| Welding Station | 15 kW | Fabrication Area | Temperature-critical monitoring |
| Air Compressor | 12 kW | Utility Room | Pressure and efficiency tracking |
| Packaging Unit | 6 kW | Packaging Area | Throughput optimization |

## 🌐 API Documentation

### REST Endpoints

- `GET /api/machines` - List all machines
- `GET /api/energy/current` - Current energy readings
- `GET /api/energy/history` - Historical data
- `GET /api/suggestions` - AI recommendations
- `GET /api/carbon/current` - Carbon footprint metrics

### WebSocket Events

- `energy_data` - Real-time energy readings
- `new_suggestion` - AI optimization suggestions
- `maintenance_alert` - Critical maintenance alerts
- `system_status` - Overall system health

For complete API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## 🔌 IoT Device Integration

### Supported Protocols
- **MQTT**: Primary communication protocol
- **HTTP REST**: Alternative for simple devices
- **WebSocket**: Real-time bidirectional communication

### Device Requirements
- Power measurement capability (kW)
- Voltage and current sensing (V, A)
- Temperature monitoring (°C)
- Network connectivity (WiFi/Ethernet)
- MQTT client support

### Integration Steps
1. Configure device MQTT settings
2. Set up device topics: `energy/machines/{machine_id}/data`
3. Implement data format: JSON with required fields
4. Test connectivity and data flow
5. Configure alerts and thresholds

For detailed integration guide, see [INSTALLATION_GUIDE.md](./INSTALLATION_GUIDE.md)

## 📈 Business Value

### Cost Reduction
- **10-30% Energy Savings**: Through AI-powered optimization recommendations
- **Reduced Downtime**: Predictive maintenance prevents unexpected failures
- **Operational Efficiency**: Real-time monitoring enables quick decision-making

### Sustainability
- **Carbon Footprint Tracking**: Monitor and reduce CO2 emissions
- **Sustainability Scoring**: Gamified approach to environmental responsibility
- **Compliance Reporting**: Generate reports for environmental regulations

### Competitive Advantages
- **Real-time Insights**: Immediate visibility into energy consumption patterns
- **Predictive Analytics**: Forecast maintenance needs and energy demands
- **Professional Interface**: Modern, intuitive dashboard for all stakeholders
- **Scalable Solution**: Easily expand to monitor additional equipment

## 🛠️ Technology Stack

### Backend
- **Node.js**: JavaScript runtime for server-side development
- **Express.js**: Web application framework
- **Socket.IO**: Real-time WebSocket communication
- **SQLite3**: Lightweight database for data storage
- **MQTT.js**: IoT device communication protocol

### Frontend
- **HTML5**: Modern web standards
- **Tailwind CSS**: Utility-first CSS framework
- **Chart.js**: Interactive data visualizations
- **Three.js**: 3D graphics and animations
- **FontAwesome**: Professional icon library

### Infrastructure
- **Docker**: Containerization for deployment
- **Nginx**: Reverse proxy and load balancing
- **PM2**: Process management for production
- **Let's Encrypt**: SSL/TLS certificate management

## 🚀 Deployment Options

### Cloud Platforms
- **AWS**: Elastic Beanstalk, EC2, RDS, IoT Core
- **Azure**: App Service, IoT Hub, SQL Database
- **Google Cloud**: App Engine, Cloud IoT Core, Cloud SQL

### On-Premise
- **Docker Compose**: Multi-container deployment
- **Traditional Server**: Ubuntu/CentOS with PM2
- **Kubernetes**: Container orchestration for scale

For complete deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 🔒 Security Features

- **Helmet.js**: HTTP security headers
- **Rate Limiting**: API request throttling
- **CORS Protection**: Cross-origin request security
- **Environment Variables**: Secure configuration management
- **SSL/TLS**: Encrypted communications
- **Input Validation**: Data sanitization and validation

## 📊 Monitoring & Analytics

### Performance Metrics
- **Response Time**: API and WebSocket latency monitoring
- **Throughput**: Requests per second and data processing rates
- **Resource Usage**: CPU, memory, and disk utilization
- **Error Rates**: Application and system error tracking

### Business Metrics
- **Energy Consumption**: Total and per-machine power usage
- **Cost Savings**: Actual vs. potential savings tracking
- **Machine Efficiency**: Performance and utilization rates
- **Sustainability Score**: Environmental impact metrics

## 🤝 Contributing

We welcome contributions to improve the Smart Energy Management System:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow JavaScript ES6+ standards
- Use meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure responsive design compatibility

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Troubleshooting

### Common Issues

**Dashboard not loading?**
- Check if Node.js server is running on port 3000
- Verify all dependencies are installed (`npm install`)
- Check browser console for JavaScript errors

**No real-time data?**
- Confirm WebSocket connection in browser developer tools
- Verify MQTT broker connectivity
- Check server logs for connection errors

**Charts not displaying?**
- Ensure Chart.js library is loaded properly
- Check for JavaScript errors in browser console
- Verify sample data is being generated

### Getting Help
- Check the [INSTALLATION_GUIDE.md](./INSTALLATION_GUIDE.md) for setup issues
- Review [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for integration questions
- Open an issue on GitHub for bug reports
- Contact support for enterprise deployment assistance

## 🔮 Future Roadmap

### Planned Features
- **Mobile App**: Native iOS and Android applications
- **Advanced AI**: Machine learning models for energy forecasting
- **Multi-Tenant**: Support for multiple facilities and organizations
- **Blockchain**: Energy trading and carbon credit tracking
- **AR/VR**: Immersive facility monitoring and maintenance

### Integration Targets
- **ERP Systems**: SAP, Oracle, Microsoft Dynamics integration
- **Building Management**: HVAC and lighting system connectivity
- **Cloud Services**: AWS IoT, Azure IoT, Google Cloud IoT
- **Third-Party APIs**: Weather data, energy pricing, carbon markets

---

**Built with ❤️ for sustainable industrial operations**

*Transform your energy management with real-time insights, AI-powered optimization, and professional-grade monitoring capabilities.*

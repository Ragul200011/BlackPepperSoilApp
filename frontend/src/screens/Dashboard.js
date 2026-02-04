import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import SoilHealthGauge from '@/components/SoilHealthGauge';
import StatusBadge from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Droplets, Thermometer, FlaskConical, MapPin, TrendingUp, Lightbulb } from 'lucide-react';

function Dashboard() {
  const navigate = useNavigate();
  const { sensorData, soilHealthScore, lastSync } = useApp();

  if (!sensorData) {
    return <div className="p-6">Loading...</div>;
  }

  const quickStats = [
    { label: 'N', value: sensorData.nitrogen.value, unit: 'mg/kg', status: sensorData.nitrogen.status, icon: FlaskConical },
    { label: 'P', value: sensorData.phosphorus.value, unit: 'mg/kg', status: sensorData.phosphorus.status, icon: FlaskConical },
    { label: 'K', value: sensorData.potassium.value, unit: 'mg/kg', status: sensorData.potassium.status, icon: FlaskConical },
    { label: 'pH', value: sensorData.ph.value, unit: '', status: sensorData.ph.status, icon: FlaskConical },
    { label: 'Moisture', value: sensorData.moisture.value, unit: '%', status: sensorData.moisture.status, icon: Droplets },
    { label: 'Temp', value: sensorData.temperature.value, unit: '°C', status: sensorData.temperature.status, icon: Thermometer },
  ];

  const formatLastSync = () => {
    const now = new Date();
    const diff = Math.floor((now - lastSync) / 1000 / 60);
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff} min ago`;
    const hours = Math.floor(diff / 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f1e8] to-[#e8e4db]">
      <Helmet>
        <title>Dashboard - Smart Farming</title>
        <meta name="description" content="Monitor your black pepper farm's soil health score and real-time sensor data" />
      </Helmet>

      {/* Hero Section with Background */}
      <div 
        className="relative h-48 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1610501323590-31ad1b47827b?w=800&q=80)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#2d5016]/80 to-[#2d5016]/95" />
        <div className="relative h-full flex flex-col justify-center px-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Soil Health Dashboard</h1>
          <div className="flex items-center gap-2 text-sm opacity-90">
            <MapPin className="w-4 h-4" />
            <span>{sensorData.location.latitude.toFixed(4)}°N, {sensorData.location.longitude.toFixed(4)}°E</span>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-12 relative z-10">
        {/* Soil Health Score Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <div className="flex flex-col items-center">
            <SoilHealthGauge score={soilHealthScore} />
            <p className="text-sm text-gray-600 mt-2">Last synced: {formatLastSync()}</p>
          </div>
        </motion.div>

        {/* Quick Status Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-xl font-bold text-[#2d5016] mb-4">Quick Status</h2>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {quickStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="w-5 h-5 text-[#4a7c3c]" />
                  <StatusBadge status={stat.status} size="sm" />
                </div>
                <p className="text-2xl font-bold text-[#2d5016]">{stat.value}</p>
                <p className="text-xs text-gray-600">{stat.label} {stat.unit}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-[#2d5016] mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Button
              onClick={() => navigate('/sensors')}
              className="h-24 bg-gradient-to-br from-[#4a7c3c] to-[#2d5016] hover:from-[#3d6632] hover:to-[#234012] text-white rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex flex-col items-center gap-2">
                <TrendingUp className="w-6 h-6" />
                <span className="font-semibold">View Sensors</span>
              </div>
            </Button>
            <Button
              onClick={() => navigate('/recommendations')}
              className="h-24 bg-gradient-to-br from-[#8b6f47] to-[#6d5837] hover:from-[#7a5f3d] hover:to-[#5c4a2e] text-white rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex flex-col items-center gap-2">
                <Lightbulb className="w-6 h-6" />
                <span className="font-semibold">Get Insights</span>
              </div>
            </Button>
          </div>
        </motion.div>

        {/* Farm Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <img 
            src="https://images.unsplash.com/photo-1683055205768-b429aa3c9780?w=800&q=80"
            alt="Black pepper plantation"
            className="w-full h-48 object-cover rounded-2xl shadow-md"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
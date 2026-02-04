import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import ParameterCard from '@/components/ParameterCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { RefreshCw, MapPin, Clock } from 'lucide-react';

function SensorData() {
  const { sensorData, refreshSensorData, lastSync } = useApp();
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshSensorData();
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Sensor data updated",
        description: "Successfully synced with field sensors",
      });
    }, 800);
  };

  if (!sensorData) {
    return <div className="p-6">Loading sensor data...</div>;
  }

  const parameters = [
    { 
      label: 'Nitrogen (N)', 
      value: sensorData.nitrogen.value, 
      unit: sensorData.nitrogen.unit, 
      status: sensorData.nitrogen.status,
      icon: 'flask',
      optimal: '50-70 mg/kg'
    },
    { 
      label: 'Phosphorus (P)', 
      value: sensorData.phosphorus.value, 
      unit: sensorData.phosphorus.unit, 
      status: sensorData.phosphorus.status,
      icon: 'flask',
      optimal: '20-35 mg/kg'
    },
    { 
      label: 'Potassium (K)', 
      value: sensorData.potassium.value, 
      unit: sensorData.potassium.unit, 
      status: sensorData.potassium.status,
      icon: 'flask',
      optimal: '150-250 mg/kg'
    },
    { 
      label: 'Soil pH', 
      value: sensorData.ph.value, 
      unit: sensorData.ph.unit, 
      status: sensorData.ph.status,
      icon: 'droplet',
      optimal: '5.5-6.5 pH'
    },
    { 
      label: 'Soil Moisture', 
      value: sensorData.moisture.value, 
      unit: sensorData.moisture.unit, 
      status: sensorData.moisture.status,
      icon: 'droplets',
      optimal: '60-75%'
    },
    { 
      label: 'Temperature', 
      value: sensorData.temperature.value, 
      unit: sensorData.temperature.unit, 
      status: sensorData.temperature.status,
      icon: 'thermometer',
      optimal: '23-28°C'
    },
  ];

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f1e8] to-[#e8e4db] pb-6">
      <Helmet>
        <title>Sensor Data - Smart Farming</title>
        <meta name="description" content="Real-time soil sensor readings for nitrogen, phosphorus, potassium, pH, moisture, and temperature" />
      </Helmet>

      {/* Header */}
      <div className="bg-gradient-to-br from-[#4a7c3c] to-[#2d5016] text-white px-6 py-8 rounded-b-3xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Sensor Data</h1>
        <div className="flex items-center gap-4 text-sm opacity-90">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{sensorData.location.latitude.toFixed(4)}°N, {sensorData.location.longitude.toFixed(4)}°E</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm opacity-90 mt-2">
          <Clock className="w-4 h-4" />
          <span>Last update: {formatTime(lastSync)}</span>
        </div>
      </div>

      <div className="px-6 mt-6">
        {/* Refresh Button */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="w-full bg-white text-[#2d5016] hover:bg-gray-50 shadow-md hover:shadow-lg transition-all"
          >
            <RefreshCw className={`w-5 h-5 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Syncing...' : 'Refresh Sensor Data'}
          </Button>
        </motion.div>

        {/* Parameter Cards */}
        <div className="space-y-4">
          {parameters.map((param, index) => (
            <motion.div
              key={param.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ParameterCard {...param} />
            </motion.div>
          ))}
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 bg-gradient-to-br from-[#8b6f47] to-[#6d5837] text-white rounded-2xl p-6 shadow-md"
        >
          <h3 className="font-bold text-lg mb-2">About Sensor Readings</h3>
          <p className="text-sm opacity-90">
            These readings are collected from IoT sensors deployed in your black pepper field. 
            Optimal ranges are based on research for black pepper cultivation in tropical regions.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default SensorData;
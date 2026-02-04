import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import {
  Settings as SettingsIcon,
  Globe,
  Ruler,
  Palette,
  Wifi,
  Cloud,
  Info,
  ChevronRight,
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function SettingsScreen() {
  const {
    autoSync, setAutoSync,
    syncFrequency, setSyncFrequency,
    units, setUnits,
    theme, setTheme,
    language, setLanguage,
    isOnline,
  } = useApp();

  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: 'Settings saved',
      description: 'Your preferences have been updated successfully',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f1e8] to-[#e8e4db] pb-6">
      <Helmet>
        <title>Settings - Smart Farming</title>
      </Helmet>

      {/* Header */}
      <div className="bg-gradient-to-br from-[#6d5837] to-[#8b6f47] text-white px-6 py-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <SettingsIcon className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>
        <p className="text-sm opacity-90">Customize your farming app experience</p>
      </div>

      {/* App Preferences */}
      <div className="px-6 mt-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-md overflow-hidden"
        >
          <div className="bg-gradient-to-r from-[#4a7c3c] to-[#2d5016] text-white px-5 py-3">
            <h2 className="font-bold text-lg">App Preferences</h2>
          </div>

          <div className="p-5 space-y-5">
            {/* Language */}
            <SettingSelect
              icon={<Globe className="w-5 h-5 text-[#4a7c3c]" />}
              label="Language"
              value={language}
              onChange={setLanguage}
              options={[
                { v: 'en', l: 'English' },
                { v: 'hi', l: 'हिन्दी' },
                { v: 'kn', l: 'ಕನ್ನಡ' },
                { v: 'ta', l: 'தமிழ்' },
              ]}
            />

            {/* Units */}
            <SettingSelect
              icon={<Ruler className="w-5 h-5 text-[#4a7c3c]" />}
              label="Measurement Units"
              value={units}
              onChange={setUnits}
              options={[
                { v: 'metric', l: 'Metric' },
                { v: 'imperial', l: 'Imperial' },
              ]}
            />

            {/* Theme */}
            <SettingSelect
              icon={<Palette className="w-5 h-5 text-[#4a7c3c]" />}
              label="Theme"
              value={theme}
              onChange={setTheme}
              options={[
                { v: 'light', l: 'Light' },
                { v: 'dark', l: 'Dark' },
              ]}
            />
          </div>
        </motion.div>

        {/* Auto Sync */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-md p-5"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Cloud className="w-5 h-5 text-[#4a7c3c]" />
              <Label className="font-semibold text-[#2d5016]">Auto Sync</Label>
            </div>
            <Switch checked={autoSync} onCheckedChange={setAutoSync} />
          </div>
        </motion.div>

        {/* Save */}
        <Button
          onClick={handleSave}
          className="w-full bg-gradient-to-br from-[#4a7c3c] to-[#2d5016] text-white"
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
}

/* Reusable Select Row */
function SettingSelect({ icon, label, value, onChange, options }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {icon}
        <Label className="font-semibold text-[#2d5016]">{label}</Label>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[#f5f1e8] border border-[#4a7c3c] text-[#2d5016] rounded-lg px-3 py-2 text-sm"
      >
        {options.map(o => (
          <option key={o.v} value={o.v}>{o.l}</option>
        ))}
      </select>
    </div>
  );
}

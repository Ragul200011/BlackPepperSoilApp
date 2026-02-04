import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

function StatusBadge({ status, size = 'default' }) {
  const configs = {
    good: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-300',
      icon: CheckCircle2,
      label: 'Good',
    },
    warning: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      border: 'border-yellow-300',
      icon: AlertTriangle,
      label: 'Warning',
    },
    critical: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      border: 'border-red-300',
      icon: XCircle,
      label: 'Critical',
    },
  };

  const config = configs[status] || configs.good;
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    default: 'px-3 py-1 text-sm',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    default: 'w-4 h-4',
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border font-semibold ${config.bg} ${config.text} ${config.border} ${sizeClasses[size]}`}>
      <Icon className={iconSizes[size]} />
      <span>{config.label}</span>
    </span>
  );
}

export default StatusBadge;
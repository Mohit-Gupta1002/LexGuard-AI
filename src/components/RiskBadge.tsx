import React from 'react';
import { FindingRiskCategory } from '@/types/contract';
import { AlertTriangle, AlertCircle, Info, CheckCircle2 } from 'lucide-react';

interface RiskBadgeProps {
  category: FindingRiskCategory;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  category,
  showIcon = true,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 gap-2 font-medium',
  }[size];

  switch (category) {
    case 'high':
      return (
        <span
          className={`inline-flex items-center rounded-full bg-rose-950/70 border border-rose-600/40 text-rose-300 ${sizeClasses}`}
        >
          {showIcon && <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />}
          High Attention
        </span>
      );
    case 'medium':
      return (
        <span
          className={`inline-flex items-center rounded-full bg-amber-950/70 border border-amber-600/40 text-amber-300 ${sizeClasses}`}
        >
          {showIcon && <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
          Medium Attention
        </span>
      );
    case 'low':
      return (
        <span
          className={`inline-flex items-center rounded-full bg-blue-950/70 border border-blue-600/40 text-blue-300 ${sizeClasses}`}
        >
          {showIcon && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
          Low Attention
        </span>
      );
    case 'informational':
    default:
      return (
        <span
          className={`inline-flex items-center rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 ${sizeClasses}`}
        >
          {showIcon && <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
          Informational
        </span>
      );
  }
};

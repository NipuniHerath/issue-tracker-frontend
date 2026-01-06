import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  badgeText?: React.ReactNode;
  badgeColor?: string;
  iconBg?: string;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  badgeText,
  badgeColor = "bg-gray-100 text-gray-700",
  iconBg = "bg-gray-100",
  className = "",
}) => (
  <div className={`bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col ${className}`}>
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-medium text-slate-500">{title}</h3>
      <span className={`${iconBg} p-1.5 rounded-lg flex items-center justify-center`}>{icon}</span>
    </div>
    <div className="flex items-baseline gap-2 mt-auto">
      <span className="text-3xl font-bold text-slate-900">{value}</span>
      {badgeText && (
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${badgeColor}`}>
          {badgeText}
        </span>
      )}
    </div>
  </div>
);

export default StatsCard;

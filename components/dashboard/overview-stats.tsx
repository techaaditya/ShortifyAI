"use client";

import { motion } from "framer-motion";
import {
    Play,
    TrendingUp,
    Users,
    Clock
} from "lucide-react";

export function OverviewStats() {
    const stats = [
        { label: "Videos Created", value: "127", icon: Play, color: "blue" },
        { label: "Total Views", value: "2.4M", icon: TrendingUp, color: "green" },
        { label: "Avg. Engagement", value: "8.3%", icon: Users, color: "purple" },
        { label: "Time Saved", value: "48h", icon: Clock, color: "orange" },
    ];

    return (
        <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    className="glass rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="flex items-center justify-between mb-2">
                        <stat.icon className={`h-5 w-5 text-${stat.color}-400`} />
                        <div className={`w-2 h-2 bg-${stat.color}-400 rounded-full`} />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
            ))}
        </motion.div>
    );
}

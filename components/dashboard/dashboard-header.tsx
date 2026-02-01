"use client";

import { motion } from "framer-motion";
import { Crown } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="w-full">
      {/* Welcome Section */}
      <motion.div
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Welcome back, <span className="gradient-text">Sarah</span>! 👋
            </h1>
            <p className="text-gray-300 text-lg">
              Ready to create some viral content today?
            </p>
          </motion.div>
        </div>

        <motion.div
          className="flex items-center space-x-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="glass rounded-xl px-4 py-2 border border-purple-500/30">
            <div className="flex items-center space-x-2">
              <Crown className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-white">Pro Plan</span>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            <span className="text-white font-medium">23/50</span> videos this month
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
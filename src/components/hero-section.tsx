'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import HeroScanner from './hero-scanner'

interface HeroSectionProps {
  onScan: () => void
  isScanning?: boolean
}

export default function HeroSection() {
  const [showScanner, setShowScanner] = useState(false)
  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Animated background gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-bl from-cyan-500 to-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center justify-center px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:border-cyan-500/50 transition-all duration-300">
          <span className="text-sm font-medium text-cyan-300">✨ AI-Powered Medicine Scanner</span>
        </div>

        {/* Main heading */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent leading-tight">
            Intelligent Medicine Analysis
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Harness the power of advanced AI to scan, analyze, and understand medicines in real-time. Get comprehensive health insights powered by cutting-edge technology.
          </p>
        </div>

        {/* Scan button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <button
            onClick={() => setShowScanner(true)}
            className="group relative px-8 py-4 font-semibold rounded-lg transition-all duration-300 overflow-hidden"
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 opacity-100 group-hover:opacity-80 transition-opacity"></div>
            
            {/* Glassmorphism effect */}
            <div className="absolute inset-0 backdrop-blur-sm opacity-0 group-hover:opacity-20 transition-opacity"></div>
            
            {/* Content */}
            <div className="relative flex items-center justify-center gap-2 text-white">
              <Zap className="w-5 h-5" />
              <span>Start Scanning</span>
            </div>
          </button>

          <button className="group px-6 py-4 font-semibold rounded-lg border border-cyan-500/50 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-cyan-400 transition-all duration-300 text-white flex items-center gap-2">
            Learn More
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 md:gap-12 pt-16 border-t border-white/10">
          <div className="space-y-2">
            <p className="text-3xl md:text-4xl font-bold text-cyan-400">98%</p>
            <p className="text-sm text-gray-400">Accuracy Rate</p>
          </div>
          <div className="space-y-2">
            <p className="text-3xl md:text-4xl font-bold text-blue-400">2.5K+</p>
            <p className="text-sm text-gray-400">Medicines Scanned</p>
          </div>
          <div className="space-y-2">
            <p className="text-3xl md:text-4xl font-bold text-cyan-400">24/7</p>
            <p className="text-sm text-gray-400">Real-time Support</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cyan-500/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>

    {/* Hero Scanner Modal */}
    {showScanner && <HeroScanner onClose={() => setShowScanner(false)} />}
    </>
  )
}

'use client'

import { useEffect, useState } from 'react'

export default function VisualizationSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent filter blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Body Visualization & Health Status
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real-time tracking of your medicine&apos;s effects across your body
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* 3D Body Visualization */}
          <div className="relative h-96 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-md overflow-hidden flex items-center justify-center group hover:border-cyan-500/50 transition-all duration-300">
            {/* Animated background */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-blue-500/10 to-cyan-500/10"></div>

            {/* SVG Body with animation */}
            <svg className="w-48 h-48 relative z-10" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Head */}
              <circle cx="50" cy="30" r="15" stroke="url(#gradient1)" strokeWidth="2" fill="rgba(0, 191, 255, 0.1)" className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
              
              {/* Torso */}
              <rect x="35" y="50" width="30" height="50" rx="5" stroke="url(#gradient1)" strokeWidth="2" fill="rgba(0, 191, 255, 0.1)" className={`transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
              
              {/* Arms */}
              <line x1="35" y1="65" x2="15" y2="80" stroke="url(#gradient1)" strokeWidth="2" className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
              <line x1="65" y1="65" x2="85" y2="80" stroke="url(#gradient1)" strokeWidth="2" className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
              
              {/* Legs */}
              <line x1="40" y1="100" x2="35" y2="140" stroke="url(#gradient1)" strokeWidth="2" className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
              <line x1="60" y1="100" x2="65" y2="140" stroke="url(#gradient1)" strokeWidth="2" className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />

              {/* Gradients */}
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgb(0, 191, 255)" />
                  <stop offset="100%" stopColor="rgb(0, 147, 255)" />
                </linearGradient>
              </defs>
            </svg>

            {/* Glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="absolute inset-0 bg-radial-gradient from-cyan-500/20 via-transparent to-transparent filter blur-2xl"></div>
            </div>
          </div>

          {/* Health Status Cards */}
          <div className="space-y-4">
            <div className="group p-6 rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-md hover:border-blue-500/50 hover:bg-white/[0.05] transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">Heart Health</h4>
                <span className="text-2xl font-bold text-cyan-400">92%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-[92%] group-hover:w-[95%] transition-all duration-500"></div>
              </div>
            </div>

            <div className="group p-6 rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-md hover:border-cyan-500/50 hover:bg-white/[0.05] transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">Immune System</h4>
                <span className="text-2xl font-bold text-blue-400">88%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full w-[88%] group-hover:w-[91%] transition-all duration-500"></div>
              </div>
            </div>

            <div className="group p-6 rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-md hover:border-blue-500/50 hover:bg-white/[0.05] transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">Energy Levels</h4>
                <span className="text-2xl font-bold text-cyan-400">95%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-[95%] group-hover:w-[98%] transition-all duration-500"></div>
              </div>
            </div>

            <div className="group p-6 rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-md hover:border-cyan-500/50 hover:bg-white/[0.05] transition-all duration-300 cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">Brain Function</h4>
                <span className="text-2xl font-bold text-blue-400">91%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full w-[91%] group-hover:w-[94%] transition-all duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

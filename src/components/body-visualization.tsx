'use client'

import { useState } from 'react'
import { Activity, Heart, Brain, Zap, Droplets, AlertCircle } from 'lucide-react'

interface OrganInfo {
  id: string
  name: string
  label: string
  affected: boolean
  severity: 'mild' | 'moderate' | 'severe'
  description: string
  icon: React.ReactNode
}

const organs: OrganInfo[] = [
  {
    id: 'heart',
    name: 'Heart',
    label: 'Heart & Cardiovascular',
    affected: true,
    severity: 'moderate',
    description: 'Amoxicillin may cause palpitations in rare cases',
    icon: <Heart className="w-5 h-5" />,
  },
  {
    id: 'lungs',
    name: 'Lungs',
    label: 'Respiratory System',
    affected: false,
    severity: 'mild',
    description: 'Generally well-tolerated',
    icon: <Zap className="w-5 h-5" />,
  },
  {
    id: 'brain',
    name: 'Brain',
    label: 'Nervous System',
    affected: false,
    severity: 'mild',
    description: 'No significant neurological effects',
    icon: <Brain className="w-5 h-5" />,
  },
  {
    id: 'liver',
    name: 'Liver',
    label: 'Hepatic System',
    affected: true,
    severity: 'mild',
    description: 'Liver function should be monitored',
    icon: <Zap className="w-5 h-5" />,
  },
  {
    id: 'kidneys',
    name: 'Kidneys',
    label: 'Renal System',
    affected: true,
    severity: 'moderate',
    description: 'Primarily eliminated through kidneys',
    icon: <Droplets className="w-5 h-5" />,
  },
]

export default function BodyVisualization() {
  const [selectedOrgan, setSelectedOrgan] = useState<string>('heart')
  const activeOrgans = organs.filter((o) => o.affected)
  const selectedOrgansData = organs.find((o) => o.id === selectedOrgan)

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild':
        return 'from-blue-400 to-cyan-400'
      case 'moderate':
        return 'from-yellow-400 to-orange-400'
      case 'severe':
        return 'from-red-400 to-orange-500'
      default:
        return 'from-blue-400 to-cyan-400'
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'mild':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/50'
      case 'moderate':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50'
      case 'severe':
        return 'bg-red-500/20 text-red-300 border-red-500/50'
      default:
        return 'bg-blue-500/20 text-blue-300 border-blue-500/50'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black py-12 px-4 sm:px-6 lg:px-8">
      {/* Background animated orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-cyan-500/50">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Organ Impact Analysis
            </h1>
          </div>
          <p className="text-slate-400 max-w-2xl">
            Interactive visualization showing how Amoxicillin-Clavulanate affects different organs and systems in your body
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Body Visualization */}
          <div className="lg:col-span-2">
            <div className="relative group">
              {/* Card backdrop */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl group-hover:from-blue-500/20 group-hover:to-cyan-500/20 transition-all duration-300"></div>
              
              <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8">
                {/* SVG Body Visualization */}
                <svg
                  viewBox="0 0 200 400"
                  className="w-full max-w-xs mx-auto"
                  style={{ filter: 'drop-shadow(0 0 30px rgba(0, 191, 255, 0.3))' }}
                >
                  {/* Define gradients */}
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00BFFF" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#0099FF" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="heartGradient">
                      <stop offset="0%" stopColor="#FF6B9D" stopOpacity={selectedOrgan === 'heart' ? '0.8' : '0.3'} />
                      <stop offset="100%" stopColor="#FF8B5F" stopOpacity={selectedOrgan === 'heart' ? '0.8' : '0.3'} />
                    </linearGradient>
                    <linearGradient id="lungGradient">
                      <stop offset="0%" stopColor="#00BFFF" stopOpacity={selectedOrgan === 'lungs' ? '0.6' : '0.2'} />
                      <stop offset="100%" stopColor="#0099FF" stopOpacity={selectedOrgan === 'lungs' ? '0.6' : '0.2'} />
                    </linearGradient>
                    <linearGradient id="brainGradient">
                      <stop offset="0%" stopColor="#9D4EDD" stopOpacity={selectedOrgan === 'brain' ? '0.6' : '0.2'} />
                      <stop offset="100%" stopColor="#7209B7" stopOpacity={selectedOrgan === 'brain' ? '0.6' : '0.2'} />
                    </linearGradient>
                    <linearGradient id="liverGradient">
                      <stop offset="0%" stopColor="#FFB703" stopOpacity={selectedOrgan === 'liver' ? '0.6' : '0.2'} />
                      <stop offset="100%" stopColor="#FB8500" stopOpacity={selectedOrgan === 'liver' ? '0.6' : '0.2'} />
                    </linearGradient>
                    <linearGradient id="kidneyGradient">
                      <stop offset="0%" stopColor="#3A86FF" stopOpacity={selectedOrgan === 'kidneys' ? '0.7' : '0.2'} />
                      <stop offset="100%" stopColor="#00D4FF" stopOpacity={selectedOrgan === 'kidneys' ? '0.7' : '0.2'} />
                    </linearGradient>
                  </defs>

                  {/* Body outline */}
                  <g filter="url(#glow)">
                    {/* Head */}
                    <circle cx="100" cy="40" r="25" fill="url(#bodyGradient)" stroke="#00BFFF" strokeWidth="2" />
                    
                    {/* Neck */}
                    <rect x="90" y="65" width="20" height="20" fill="url(#bodyGradient)" stroke="#00BFFF" strokeWidth="1" />
                    
                    {/* Torso */}
                    <path
                      d="M 80 85 Q 60 120 65 160 L 135 160 Q 140 120 120 85 Z"
                      fill="url(#bodyGradient)"
                      stroke="#00BFFF"
                      strokeWidth="2"
                    />

                    {/* Heart */}
                    <g
                      onClick={() => setSelectedOrgan('heart')}
                      className="cursor-pointer transition-all duration-300 hover:scale-110"
                      style={{
                        filter: selectedOrgan === 'heart' ? 'drop-shadow(0 0 15px #FF6B9D)' : 'none',
                      }}
                    >
                      <path
                        d="M 100 100 Q 90 90 80 100 Q 70 110 80 125 Q 100 145 100 145 Q 100 145 120 125 Q 130 110 120 100 Q 110 90 100 100 Z"
                        fill="url(#heartGradient)"
                        stroke={selectedOrgan === 'heart' ? '#FF6B9D' : '#FF6B9D'}
                        strokeWidth={selectedOrgan === 'heart' ? '2' : '1'}
                      />
                    </g>

                    {/* Lungs */}
                    <g
                      onClick={() => setSelectedOrgan('lungs')}
                      className="cursor-pointer transition-all duration-300 hover:scale-105"
                      style={{
                        filter: selectedOrgan === 'lungs' ? 'drop-shadow(0 0 15px #00BFFF)' : 'none',
                      }}
                    >
                      <ellipse cx="75" cy="115" rx="12" ry="20" fill="url(#lungGradient)" stroke="#00BFFF" strokeWidth={selectedOrgan === 'lungs' ? '2' : '1'} />
                      <ellipse cx="125" cy="115" rx="12" ry="20" fill="url(#lungGradient)" stroke="#00BFFF" strokeWidth={selectedOrgan === 'lungs' ? '2' : '1'} />
                    </g>

                    {/* Liver */}
                    <g
                      onClick={() => setSelectedOrgan('liver')}
                      className="cursor-pointer transition-all duration-300 hover:scale-105"
                      style={{
                        filter: selectedOrgan === 'liver' ? 'drop-shadow(0 0 15px #FFB703)' : 'none',
                      }}
                    >
                      <ellipse cx="115" cy="135" rx="18" ry="15" fill="url(#liverGradient)" stroke="#FFB703" strokeWidth={selectedOrgan === 'liver' ? '2' : '1'} />
                    </g>

                    {/* Kidneys */}
                    <g
                      onClick={() => setSelectedOrgan('kidneys')}
                      className="cursor-pointer transition-all duration-300 hover:scale-105"
                      style={{
                        filter: selectedOrgan === 'kidneys' ? 'drop-shadow(0 0 15px #3A86FF)' : 'none',
                      }}
                    >
                      <ellipse cx="75" cy="150" rx="10" ry="14" fill="url(#kidneyGradient)" stroke="#3A86FF" strokeWidth={selectedOrgan === 'kidneys' ? '2' : '1'} />
                      <ellipse cx="125" cy="150" rx="10" ry="14" fill="url(#kidneyGradient)" stroke="#3A86FF" strokeWidth={selectedOrgan === 'kidneys' ? '2' : '1'} />
                    </g>

                    {/* Legs */}
                    <rect x="80" y="160" width="10" height="50" fill="url(#bodyGradient)" stroke="#00BFFF" strokeWidth="1" rx="5" />
                    <rect x="110" y="160" width="10" height="50" fill="url(#bodyGradient)" stroke="#00BFFF" strokeWidth="1" rx="5" />
                  </g>
                </svg>

                {/* Legend */}
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {organs.map((organ) => (
                    <button
                      key={organ.id}
                      onClick={() => setSelectedOrgan(organ.id)}
                      className={`p-3 rounded-lg border transition-all duration-300 ${
                        selectedOrgan === organ.id
                          ? 'bg-blue-500/30 border-blue-400 shadow-lg shadow-blue-500/50'
                          : 'bg-slate-700/30 border-slate-600/50 hover:border-slate-500/50'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className={organ.affected ? 'w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 animate-pulse' : 'w-2 h-2 rounded-full bg-slate-500'} />
                        <span className="text-xs font-semibold text-slate-300">{organ.name}</span>
                      </div>
                      <p className="text-[10px] text-slate-400">{organ.affected ? 'Affected' : 'Normal'}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            {/* Selected Organ Details */}
            {selectedOrgansData && (
              <div className="group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl group-hover:from-blue-500/20 group-hover:to-cyan-500/20 transition-all duration-300"></div>
                
                <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${getSeverityColor(selectedOrgansData.severity)} shadow-lg`}>
                      {selectedOrgansData.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-blue-300 mb-1">{selectedOrgansData.label}</h3>
                      <p className="text-sm text-slate-400">{selectedOrgansData.name}</p>
                    </div>
                  </div>

                  {selectedOrgansData.affected && (
                    <div className={`p-3 rounded-lg border mb-4 ${getSeverityBadge(selectedOrgansData.severity)}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4" />
                        <span className="font-semibold capitalize">{selectedOrgansData.severity} Impact</span>
                      </div>
                      <p className="text-sm">{selectedOrgansData.description}</p>
                    </div>
                  )}

                  {!selectedOrgansData.affected && (
                    <div className="p-3 rounded-lg border bg-blue-500/10 border-blue-500/30 mb-4">
                      <p className="text-sm text-blue-300">✓ No significant effects expected</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Affected Organs Summary */}
            <div className="group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl group-hover:from-blue-500/20 group-hover:to-cyan-500/20 transition-all duration-300"></div>
              
              <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-blue-300 mb-4">Affected Systems ({activeOrgans.length})</h3>
                <div className="space-y-3">
                  {activeOrgans.map((organ) => (
                    <button
                      key={organ.id}
                      onClick={() => setSelectedOrgan(organ.id)}
                      className={`w-full p-3 rounded-lg border transition-all duration-300 text-left ${
                        selectedOrgan === organ.id
                          ? 'bg-blue-500/30 border-blue-400'
                          : 'bg-slate-700/30 border-slate-600/50 hover:border-slate-500/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-200">{organ.name}</span>
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${getSeverityBadge(organ.severity)}`}>
                          {organ.severity}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl group-hover:from-cyan-500/20 group-hover:to-blue-500/20 transition-all duration-300"></div>
              
              <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-cyan-300 mb-3">Monitoring Recommendations</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>Monitor kidney function with periodic lab tests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>Report any unusual heart palpitations immediately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>Check liver function tests if prolonged use</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

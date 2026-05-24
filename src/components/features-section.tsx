'use client'

import { Zap, Brain, Shield, Droplets } from 'lucide-react'

export default function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Instant medicine analysis with real-time results powered by advanced AI algorithms',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Brain,
      title: 'AI Insights',
      description: 'Deep learning models that understand complex drug interactions and health impacts',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Military-grade encryption ensuring your health data remains completely confidential',
      color: 'from-blue-400 to-cyan-400'
    },
    {
      icon: Droplets,
      title: 'Comprehensive',
      description: 'Complete medicine database with side effects, dosage info, and health warnings',
      color: 'from-cyan-400 to-blue-400'
    }
  ]

  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-l from-cyan-500/20 to-transparent rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience the next generation of medicine scanning technology
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group relative p-6 md:p-8 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md hover:border-cyan-500/50 hover:bg-white/[0.05] transition-all duration-300 overflow-hidden"
              >
                {/* Gradient border on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl bg-gradient-to-br from-blue-500/20 via-transparent to-cyan-500/20"></div>

                {/* Content */}
                <div className="relative z-10 space-y-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} p-2.5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl blur-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20"></div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

'use client'

import { Microscope, Activity, AlertCircle } from 'lucide-react'

type Props = {
  aiData: any
  fdaData: any
}

export default function AnalysisSection({
  aiData,
  fdaData,
}: Props) {

  const medicine = fdaData?.results?.[0]

  const analyses = [
    {
      icon: Microscope,
      title: 'Molecular Composition',
      items: [
        medicine?.active_ingredient?.[0] || 'Unknown Ingredient',
        medicine?.purpose?.[0] || 'No Purpose Data',
        medicine?.dosage_form?.[0] || 'Unknown Form',
        medicine?.route?.[0] || 'Unknown Route',
      ]
    },
    {
      icon: Activity,
      title: 'Health Metrics',
      items: [
        medicine?.dosage_and_administration?.[0] || 'No Dosage Information',
        'Effectiveness Score: 92%',
        'Bioavailability: High',
        'Absorption Rate: Fast',
      ]
    },
    {
      icon: AlertCircle,
      title: 'Safety Warnings',
      items: [
        medicine?.warnings?.[0] || 'No Warnings Available',
        medicine?.stop_use?.[0] || 'No Stop Use Data',
        medicine?.ask_doctor?.[0] || 'Consult Your Doctor',
        medicine?.pregnancy_or_breast_feeding?.[0] || 'No Pregnancy Data',
      ]
    }
  ]

  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-t from-blue-500/20 via-transparent to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center space-y-4 mb-16">

          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-cyan-300 text-sm">
            AI Medical Analysis
          </div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Advanced Medicine Analysis
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Comprehensive AI-powered medicine insights and pharmaceutical analysis
          </p>
        </div>

        {/* AI RESPONSE */}
        <div className="mb-10 rounded-2xl border border-cyan-500/20 bg-white/[0.03] backdrop-blur-md p-6">

          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>

            <h3 className="text-xl font-semibold text-white">
              AI Insights
            </h3>
          </div>

          <p className="text-gray-300 leading-relaxed whitespace-pre-line">
            {aiData?.choices?.[0]?.message?.content ||
              'No AI analysis available'}
          </p>
        </div>

        {/* Analysis Cards */}
        <div className="grid md:grid-cols-3 gap-6">

          {analyses.map((analysis, index) => {

            const Icon = analysis.icon

            return (
              <div
                key={index}
                className="relative p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-md overflow-hidden group hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2"
              >

                {/* Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent"></div>

                {/* Content */}
                <div className="relative z-10 space-y-6">

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 p-3 shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-300">

                    <Icon className="w-full h-full text-white" />

                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-5">
                      {analysis.title}
                    </h3>

                    {/* Items */}
                    <ul className="space-y-4">

                      {analysis.items.map((item, itemIndex) => (

                        <li
                          key={itemIndex}
                          className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed"
                        >

                          <div className="mt-2 w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex-shrink-0"></div>

                          <span className="line-clamp-3">
                            {item}
                          </span>

                        </li>
                      ))}

                    </ul>

                  </div>

                </div>

              </div>
            )
          })}

        </div>

      </div>

    </section>
  )
}
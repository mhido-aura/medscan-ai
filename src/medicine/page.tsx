'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Droplet, AlertCircle, Zap, Shield, Thermometer, CheckCircle2, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import BodyVisualization from '@/components/body-visualization'

interface ActiveIngredient {
  name: string
  strength: string
  unit: string
}

interface SideEffect {
  effect: string
  severity: 'mild' | 'moderate' | 'severe'
  frequency: string
}

interface MedicineData {
  id: string
  name: string
  category: string
  form: string
  route: string
  manufacturer: string
  activeIngredients: ActiveIngredient[]
  excipients: string[]
  sideEffects: SideEffect[]
  conservation: {
    temperature: string
    humidity: string
    light: string
    expiryAfterOpening: string
  }
  effectiveness: number
  indication: string
  contraindications: string[]
  interactions: string[]
}

const sampleMedicine: MedicineData = {
  id: '1',
  name: 'Amoxicillin-Clavulanate',
  category: 'Antibiotic',
  form: 'Oral Tablet',
  route: 'Oral',
  manufacturer: 'PharmaCorp International',
  activeIngredients: [
    { name: 'Amoxicillin Trihydrate', strength: '500', unit: 'mg' },
    { name: 'Clavulanic Acid', strength: '125', unit: 'mg' },
  ],
  excipients: [
    'Microcrystalline Cellulose',
    'Croscarmellose Sodium',
    'Magnesium Stearate',
    'Hypromellose',
    'Titanium Dioxide',
    'FD&C Blue No. 2',
  ],
  sideEffects: [
    {
      effect: 'Nausea',
      severity: 'mild',
      frequency: 'Common (5-10%)',
    },
    {
      effect: 'Diarrhea',
      severity: 'mild',
      frequency: 'Common (5-10%)',
    },
    {
      effect: 'Allergic Reaction',
      severity: 'severe',
      frequency: 'Rare (0.1-1%)',
    },
    {
      effect: 'Headache',
      severity: 'mild',
      frequency: 'Uncommon (1-5%)',
    },
  ],
  conservation: {
    temperature: '15-25°C (59-77°F)',
    humidity: 'Below 60% RH',
    light: 'Protect from light',
    expiryAfterOpening: '12 months',
  },
  effectiveness: 92,
  indication:
    'Treatment of various bacterial infections including ear infections, pneumonia, strep throat, urinary tract infections',
  contraindications: [
    'Hypersensitivity to penicillins or cephalosporins',
    'History of allergic reactions to beta-lactam antibiotics',
    'Severe liver disease',
  ],
  interactions: [
    'Methotrexate (may increase toxicity)',
    'Oral contraceptives (reduced efficacy)',
    'Warfarin (increased bleeding risk)',
    'Probenecid (increased amoxicillin levels)',
  ],
}

export default function MedicineDashboard() {
  const [medicine] = useState<MedicineData>(sampleMedicine)

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'moderate':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'severe':
        return 'bg-red-500/20 text-red-300 border-red-500/30'
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'mild':
        return '○'
      case 'moderate':
        return '◐'
      case 'severe':
        return '●'
      default:
        return '○'
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-bl from-cyan-500 to-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
      </div>

      <div className="relative z-10">
        {/* Header with navigation */}
        <div className="border-b border-slate-700/50 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section with Medicine Name */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-6">
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg border border-cyan-500/30">
                    <Droplet className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                      {medicine.name}
                    </h1>
                    <p className="text-slate-400 text-lg">{medicine.manufacturer}</p>
                  </div>
                </div>

                {/* Quick info badges */}
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                    {medicine.category}
                  </Badge>
                  <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                    {medicine.form}
                  </Badge>
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                    {medicine.route}
                  </Badge>
                </div>
              </div>

              {/* Effectiveness Score */}
              <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-800/50 to-slate-700/30 rounded-xl border border-cyan-500/20 backdrop-blur-md min-w-fit">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-slate-700"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="2"
                      strokeDasharray={`${(medicine.effectiveness / 100) * 339.29} 339.29`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                      transform="rotate(-90 60 60)"
                    />
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#0099FF" />
                        <stop offset="100%" stopColor="#00BFFF" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400">
                      {medicine.effectiveness}%
                    </div>
                    <div className="text-xs text-slate-400 mt-1">Effectiveness</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Indication */}
            <Card className="bg-slate-800/50 border-cyan-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                  Medical Indication
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 leading-relaxed">{medicine.indication}</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for detailed information */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start h-auto bg-transparent p-0 border-b border-slate-700/50 rounded-none">
              <TabsTrigger
                value="overview"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-cyan-500 data-[state=active]:bg-transparent px-4 py-3"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="ingredients"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-cyan-500 data-[state=active]:bg-transparent px-4 py-3"
              >
                Active Ingredients
              </TabsTrigger>
              <TabsTrigger
                value="excipients"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-cyan-500 data-[state=active]:bg-transparent px-4 py-3"
              >
                Excipients
              </TabsTrigger>
              <TabsTrigger
                value="side-effects"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-cyan-500 data-[state=active]:bg-transparent px-4 py-3"
              >
                Side Effects
              </TabsTrigger>
              <TabsTrigger
                value="storage"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-cyan-500 data-[state=active]:bg-transparent px-4 py-3"
              >
                Storage
              </TabsTrigger>
              <TabsTrigger
                value="body-analysis"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-cyan-500 data-[state=active]:bg-transparent px-4 py-3"
              >
                Organ Impact
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6 mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-slate-800/50 border-cyan-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Pharmaceutical Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-3 border-b border-slate-700/50">
                        <span className="text-slate-400">Pharmaceutical Form:</span>
                        <span className="text-cyan-400 font-medium">{medicine.form}</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-slate-700/50">
                        <span className="text-slate-400">Administration Route:</span>
                        <span className="text-cyan-400 font-medium">{medicine.route}</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-slate-700/50">
                        <span className="text-slate-400">Category:</span>
                        <span className="text-cyan-400 font-medium">{medicine.category}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Manufacturer:</span>
                        <span className="text-cyan-400 font-medium text-right max-w-xs">
                          {medicine.manufacturer}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-cyan-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Contraindications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {medicine.contraindications.map((contra, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-300 text-sm">{contra}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-slate-800/50 border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-lg">Drug Interactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {medicine.interactions.map((interaction, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-slate-700/30 rounded-lg border border-yellow-500/20 flex items-start gap-3"
                      >
                        <Zap className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{interaction}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Active Ingredients Tab */}
            <TabsContent value="ingredients" className="mt-6">
              <div className="grid gap-4">
                {medicine.activeIngredients.map((ingredient, idx) => (
                  <Card key={idx} className="bg-slate-800/50 border-cyan-500/20">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-cyan-400 mb-2">
                            {ingredient.name}
                          </h3>
                          <p className="text-slate-400 text-sm">
                            Strength: {ingredient.strength} {ingredient.unit}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                            Active
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Excipients Tab */}
            <TabsContent value="excipients" className="mt-6">
              <Card className="bg-slate-800/50 border-cyan-500/20">
                <CardHeader>
                  <CardTitle>Excipients (Inactive Ingredients)</CardTitle>
                  <CardDescription>
                    These ingredients provide structure and stability to the medicine
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {medicine.excipients.map((excipient, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-slate-700/30 rounded-lg border border-slate-600/50 text-slate-300 flex items-center gap-2"
                      >
                        <div className="w-2 h-2 rounded-full bg-slate-500"></div>
                        {excipient}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Side Effects Tab */}
            <TabsContent value="side-effects" className="mt-6">
              <div className="space-y-4">
                {medicine.sideEffects.map((sideEffect, idx) => (
                  <Card
                    key={idx}
                    className={`bg-slate-800/50 border ${getSeverityColor(
                      sideEffect.severity,
                    ).split(' ').pop()}`}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">{getSeverityIcon(sideEffect.severity)}</span>
                            <h3 className="text-lg font-semibold text-foreground">
                              {sideEffect.effect}
                            </h3>
                          </div>
                          <p className="text-sm text-slate-400">{sideEffect.frequency}</p>
                        </div>
                        <Badge className={getSeverityColor(sideEffect.severity)}>
                          {sideEffect.severity.charAt(0).toUpperCase() + sideEffect.severity.slice(1)}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Storage Tab */}
            <TabsContent value="storage" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(medicine.conservation).map(([key, value]) => (
                  <Card key={key} className="bg-slate-800/50 border-cyan-500/20">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                          <Thermometer className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-2 capitalize">
                            {key === 'expiryAfterOpening'
                              ? 'Expiry After Opening'
                              : key.replace(/([A-Z])/g, ' $1').trim()}
                          </h3>
                          <p className="text-cyan-400 text-sm font-medium">{value}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Body Analysis Tab */}
            <TabsContent value="body-analysis" className="mt-6">
              <div className="space-y-6">
                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-blue-300 text-sm flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">ℹ️</span>
                    <span>Interactive visualization showing which organs and systems are affected by this medicine</span>
                  </p>
                </div>
                <BodyVisualization />
              </div>
            </TabsContent>
          </Tabs>

          {/* Disclaimer */}
          <div className="mt-12 p-6 bg-slate-800/50 border border-amber-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-300 mb-2">Medical Disclaimer</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  This information is for educational purposes only and should not replace professional
                  medical advice. Always consult with a healthcare provider before starting, stopping, or
                  changing any medication. Do not use this application for self-diagnosis or treatment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

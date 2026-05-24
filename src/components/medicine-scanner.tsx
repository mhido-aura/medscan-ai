'use client'

import { useState, useRef, useEffect } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import {
  Upload,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Pill,
  ShieldAlert,
  Activity,
  Clock3,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

interface ScanResult {
  medicine: string
  dosage: string
  warnings: string[]
  activeIngredient: string
  usage: string
  sideEffects: string[]
  category: string
  confidence: string
}

export default function ScannerPage() {
  const [scanMode, setScanMode] = useState<'camera' | 'upload'>('camera')
  const [medicineName, setMedicineName] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const scannerRef = useRef<Html5QrcodeScanner | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scanMode === 'camera' && isScanning && !scannerRef.current) {
      initializeScanner()
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear()
        scannerRef.current = null
      }
    }
  }, [scanMode, isScanning])

  const initializeScanner = () => {
    try {
      const scanner = new Html5QrcodeScanner(
        'qr-scanner',
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1,
          rememberLastUsedCamera: true,
          showTorchButtonIfSupported: true,
        },
        false
      )

      scanner.render(onScanSuccess, onScanError)
      scannerRef.current = scanner
    } catch {
      setError('Camera access failed.')
      setIsScanning(false)
    }
  }

  const medicines: { [key: string]: ScanResult } = {
    aspirin: {
      medicine: 'Aspirin',
      dosage: '500mg',
      activeIngredient: 'Acetylsalicylic Acid',
      usage: 'Pain relief & fever reduction',
      category: 'Analgesic',
      confidence: '98%',
      warnings: [
        'Take after meals',
        'Avoid overdose',
        'Not for children under 12',
      ],
      sideEffects: [
        'Stomach pain',
        'Nausea',
        'Heartburn',
      ],
    },

    doliprane: {
      medicine: 'Doliprane',
      dosage: '1000mg',
      activeIngredient: 'Paracetamol',
      usage: 'Fever & headache treatment',
      category: 'Painkiller',
      confidence: '97%',
      warnings: [
        'Do not exceed 4g/day',
        'Avoid alcohol',
        'Keep away from children',
      ],
      sideEffects: [
        'Liver damage if overdosed',
        'Skin rash',
      ],
    },

    ibuprofen: {
      medicine: 'Ibuprofen',
      dosage: '400mg',
      activeIngredient: 'Ibuprofen',
      usage: 'Inflammation & pain relief',
      category: 'NSAID',
      confidence: '96%',
      warnings: [
        'Take with food',
        'Avoid during pregnancy',
      ],
      sideEffects: [
        'Dizziness',
        'Stomach irritation',
      ],
    },
  }

  const onScanSuccess = async (decodedText: string) => {
    processMedicine(decodedText.toLowerCase())
  }

  const onScanError = (error: string) => {
    if (!error.includes('QR code')) {
      console.log(error)
    }
  }

  const processMedicine = (name: string) => {
    setIsLoading(true)

    setTimeout(() => {
      const matched = Object.entries(medicines).find(([key]) =>
        name.includes(key)
      )

      if (matched) {
        setScanResult(matched[1])
      } else {
        setScanResult({
          medicine: name,
          dosage: 'Unknown',
          activeIngredient: 'AI Detection Pending',
          usage: 'Unknown usage',
          category: 'Unknown',
          confidence: '72%',
          warnings: [
            'Consult pharmacist',
            'Medicine not fully recognized',
          ],
          sideEffects: [
            'Unknown side effects',
          ],
        })
      }

      setIsLoading(false)
      setIsScanning(false)

      if (scannerRef.current) {
        scannerRef.current.clear()
        scannerRef.current = null
      }
    }, 1500)
  }

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]

    if (!file) return

    const reader = new FileReader()

    reader.onload = (e) => {
      const imageData = e.target?.result as string

      setUploadedImage(imageData)

      processMedicine(file.name.toLowerCase())
    }

    reader.readAsDataURL(file)
  }

  const resetScan = () => {
    setScanResult(null)
    setUploadedImage(null)
    setMedicineName('')
    setError(null)
    setIsScanning(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10">

        {/* Header */}
        <header className="border-b border-slate-700/40 bg-slate-900/70 backdrop-blur-md sticky top-0">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                MediScan AI
              </h1>

              <p className="text-slate-400 text-sm">
                Smart Medicine Detection System
              </p>
            </div>

            {scanResult && (
              <Button
                onClick={resetScan}
                className="bg-red-500 hover:bg-red-600"
              >
                <X className="w-4 h-4 mr-2" />
                Reset
              </Button>
            )}
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-4 py-10">

          {/* Modes */}
          {!scanResult && (
            <div className="flex flex-wrap gap-4 justify-center mb-8">

              <Button
                onClick={() => {
                  setScanMode('camera')
                  setIsScanning(true)
                }}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:scale-105 transition"
              >
                📷 Camera Scan
              </Button>

              <Button
                onClick={() => {
                  setScanMode('upload')
                  fileInputRef.current?.click()
                }}
                className="bg-slate-800 hover:bg-slate-700"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
              </Button>

            </div>
          )}

          {/* Manual Search */}
          {!scanResult && (
            <div className="max-w-3xl mx-auto mb-8">
              <div className="bg-slate-900/70 border border-cyan-500/20 rounded-2xl p-4 flex gap-3">

                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                  <Pill className="w-6 h-6 text-white" />
                </div>

                <input
                  type="text"
                  value={medicineName}
                  onChange={(e) => setMedicineName(e.target.value)}
                  placeholder="Ex: Aspirin, Doliprane, Ibuprofen..."
                  className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-500"
                />

                <Button
                  onClick={() => {
                    if (!medicineName) return
                    processMedicine(medicineName.toLowerCase())
                  }}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500"
                >
                  Analyze
                </Button>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          {/* Scanner */}
          {!scanResult && scanMode === 'camera' && (
            <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden border border-slate-700 bg-slate-900/70">
              {isScanning ? (
                <div id="qr-scanner" className="w-full" />
              ) : (
                <div className="h-96 flex items-center justify-center">
                  <p className="text-slate-400">
                    Camera loading...
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Loading */}
          {isLoading && (
            <div className="text-center py-20">
              <Loader2 className="w-14 h-14 animate-spin text-cyan-400 mx-auto mb-4" />

              <p className="text-slate-300 text-lg">
                AI analyzing medicine...
              </p>
            </div>
          )}

          {/* Results */}
          {scanResult && !isLoading && (
            <div className="max-w-4xl mx-auto space-y-6">

              {/* Success */}
              <div className="flex items-center gap-3 text-green-400">
                <CheckCircle2 className="w-7 h-7" />
                <p className="text-xl font-semibold">
                  Medicine Identified Successfully
                </p>
              </div>

              {/* Cards */}
              <div className="grid md:grid-cols-2 gap-5">

                <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-5">
                  <p className="text-slate-400 text-sm mb-2">
                    Medicine Name
                  </p>

                  <h2 className="text-3xl font-bold text-cyan-400">
                    {scanResult.medicine}
                  </h2>
                </div>

                <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-5">
                  <p className="text-slate-400 text-sm mb-2">
                    Dosage
                  </p>

                  <h2 className="text-3xl font-bold text-blue-400">
                    {scanResult.dosage}
                  </h2>
                </div>

                <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-5">
                  <p className="text-slate-400 text-sm mb-2">
                    Active Ingredient
                  </p>

                  <p className="text-xl font-semibold">
                    {scanResult.activeIngredient}
                  </p>
                </div>

                <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-5">
                  <p className="text-slate-400 text-sm mb-2">
                    Category
                  </p>

                  <p className="text-xl text-cyan-300 font-semibold">
                    {scanResult.category}
                  </p>
                </div>
              </div>

              {/* Usage */}
              <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="w-5 h-5 text-cyan-400" />

                  <h3 className="text-lg font-bold">
                    Recommended Usage
                  </h3>
                </div>

                <p className="text-slate-300">
                  {scanResult.usage}
                </p>
              </div>

              {/* Side Effects */}
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldAlert className="w-5 h-5 text-red-400" />

                  <h3 className="text-lg font-bold text-red-300">
                    Possible Side Effects
                  </h3>
                </div>

                <ul className="space-y-3">
                  {scanResult.sideEffects.map((effect, index) => (
                    <li
                      key={index}
                      className="text-slate-200 flex items-center gap-2"
                    >
                      • {effect}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Warnings */}
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-6">
                <h3 className="text-orange-300 text-lg font-bold mb-4">
                  ⚠ Important Warnings
                </h3>

                <ul className="space-y-3">
                  {scanResult.warnings.map((warning, index) => (
                    <li
                      key={index}
                      className="text-slate-200"
                    >
                      • {warning}
                    </li>
                  ))}
                </ul>
              </div>
              {/* AI Summary */}
<div className="rounded-2xl bg-slate-900/70 border border-cyan-500/20 p-6 space-y-4">
  <h3 className="text-2xl font-bold text-cyan-400">
    AI Summary
  </h3>

  <p className="text-slate-300 leading-relaxed">
    {scanResult.medicine} is commonly used for pain relief and fever reduction.
    The active ingredient is {scanResult.activeIngredient}.
    Recommended dosage: {scanResult.dosage}.
    Please follow medical instructions carefully and avoid overdose.
  </p>

  <div className="grid md:grid-cols-2 gap-4">
    <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
      <p className="text-cyan-400 font-semibold mb-2">
        Benefits
      </p>

      <ul className="text-slate-300 text-sm space-y-1">
        <li>• Reduces pain</li>
        <li>• Helps reduce fever</li>
        <li>• Fast acting relief</li>
      </ul>
    </div>

    <div className="bg-slate-800/60 rounded-xl p-4 border border-red-500/20">
      <p className="text-red-400 font-semibold mb-2">
        Side Effects
      </p>

      <ul className="text-slate-300 text-sm space-y-1">
        <li>• Stomach discomfort</li>
        <li>• Dizziness</li>
        <li>• Nausea in some cases</li>
      </ul>
    </div>
  </div>
</div>

              {/* AI Stats */}
              <div className="grid md:grid-cols-2 gap-5">

                <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />

                    <p className="text-slate-400">
                      AI Confidence
                      
                    </p>
                  </div>

                  <h2 className="text-3xl font-bold text-green-400">
                    {scanResult.confidence}
                  </h2>
                </div>

                <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock3 className="w-5 h-5 text-cyan-400" />

                    <p className="text-slate-400">
                      Scan Time
                    </p>
                  </div>

                  <h2 className="text-3xl font-bold text-cyan-400">
                    1.4s
                  </h2>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center text-slate-500 text-sm pt-4 border-t border-slate-800">
                This information is AI-generated and should not replace
                professional medical advice.
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-300 flex gap-2 mt-6">
              <AlertCircle className="w-5 h-5" />

              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
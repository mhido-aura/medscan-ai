'use client'

import { useState, useRef, useEffect } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { Upload, X, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ScanResult {
  medicine: string
  dosage: string
  warnings: string[]
  activeIngredient: string
}

interface HeroScannerProps {
  onClose: () => void
}

export default function HeroScanner({ onClose }: HeroScannerProps) {
  const [scanMode, setScanMode] = useState<'camera' | 'upload'>('camera')
  const [isScanning, setIsScanning] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const scannerRef = useRef<Html5QrcodeScanner | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Initialize camera scanner
  useEffect(() => {
    if (scanMode === 'camera' && isScanning && !scannerRef.current) {
      initializeScanner()
    }

    return () => {
      if (scannerRef.current) {
        try {
          scannerRef.current.clear()
        } catch (e) {
          console.log('[v0] Scanner cleanup:', e)
        }
        scannerRef.current = null
      }
    }
  }, [scanMode, isScanning])

  const initializeScanner = () => {
    try {
      const scanner = new Html5QrcodeScanner(
        'qr-scanner-hero',
        {
          fps: 10,
          qrbox: { width: 200, height: 200 },
          aspectRatio: 1,
          rememberLastUsedCamera: true,
          showTorchButtonIfSupported: true,
          defaultZoomValueIfSupported: 2,
        },
        false
      )

      scanner.render(onScanSuccess, onScanError)
      scannerRef.current = scanner
    } catch (err) {
      setError('Failed to initialize camera. Please check permissions.')
      setIsScanning(false)
    }
  }

  const onScanSuccess = async (decodedText: string) => {
    setIsLoading(true)
    setError(null)

    // Simulate API call to analyze medicine data
    setTimeout(() => {
      const mockResults: { [key: string]: ScanResult } = {
        'aspirin': {
          medicine: 'Aspirin',
          dosage: '500mg',
          activeIngredient: 'Acetylsalicylic Acid',
          warnings: ['May cause stomach upset', 'Not for children under 12', 'Do not use if allergic to salicylates'],
        },
        'ibuprofen': {
          medicine: 'Ibuprofen',
          dosage: '200mg',
          activeIngredient: 'Ibuprofen',
          warnings: ['Take with food', 'May cause dizziness', 'Consult doctor if pregnant'],
        },
        'paracetamol': {
          medicine: 'Paracetamol',
          dosage: '250mg',
          activeIngredient: 'Acetaminophen',
          warnings: ['Do not exceed 4g per day', 'May cause liver damage in overdose', 'Keep away from children'],
        },
      }

      const matchedResult = Object.entries(mockResults).find(([key]) =>
        decodedText.toLowerCase().includes(key)
      )

      if (matchedResult) {
        setScanResult(matchedResult[1])
      } else {
        setScanResult({
          medicine: 'Unknown Medicine',
          dosage: decodedText,
          activeIngredient: 'Analysis required',
          warnings: ['Please verify with healthcare provider'],
        })
      }

      setIsLoading(false)
      setIsScanning(false)
    }, 1500)
  }

  const onScanError = (error: string) => {
    console.log('[v0] Scan error:', error)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64 = e.target?.result as string
        setUploadedImage(base64)
        setIsLoading(true)
        setError(null)

        // Simulate image analysis
        setTimeout(() => {
          setScanResult({
            medicine: 'Scanned Medicine',
            dosage: '500mg',
            activeIngredient: 'Active ingredient detected',
            warnings: ['Consult healthcare provider for accuracy'],
          })
          setIsLoading(false)
        }, 1500)
      }
      reader.readAsDataURL(file)
    }
  }

  const resetScan = () => {
    setScanResult(null)
    setError(null)
    setUploadedImage(null)
    setIsScanning(true)
    setScanMode('camera')
  }

  const showDemoResult = () => {
    setScanResult({
      medicine: 'Aspirin',
      dosage: '500mg',
      activeIngredient: 'Acetylsalicylic Acid',
      warnings: ['May cause stomach upset', 'Not for children under 12', 'Do not use if allergic to salicylates'],
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Medicine Scanner
            </h2>
            <p className="text-gray-400 text-sm mt-2">Scan a QR code or upload an image to analyze medicine information</p>
          </div>

          {/* Results display */}
          {scanResult ? (
            <div className="space-y-6">
              {/* Success icon */}
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50">
                  <CheckCircle2 className="w-8 h-8 text-cyan-400" />
                </div>
              </div>

              {/* Medicine info */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Medicine</p>
                  <p className="text-2xl font-bold text-cyan-400">{scanResult.medicine}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                    <p className="text-xs text-gray-400">Dosage</p>
                    <p className="text-sm font-semibold text-white mt-1">{scanResult.dosage}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                    <p className="text-xs text-gray-400">Active Ingredient</p>
                    <p className="text-sm font-semibold text-white mt-1">{scanResult.activeIngredient}</p>
                  </div>
                </div>

                {/* Warnings */}
                {scanResult.warnings.length > 0 && (
                  <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/50">
                    <div className="flex gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-amber-300 mb-2">Important Warnings</p>
                        <ul className="space-y-1">
                          {scanResult.warnings.map((warning, idx) => (
                            <li key={idx} className="text-sm text-amber-200 flex items-start gap-2">
                              <span className="text-amber-400 mt-0.5">•</span>
                              <span>{warning}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Disclaimer */}
                <p className="text-xs text-gray-500 text-center p-3 bg-slate-800/30 rounded-lg">
                  This information is for educational purposes only. Always consult with a healthcare provider before taking any medicine.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={resetScan}
                  className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold transition-all"
                >
                  Scan Another
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-white font-semibold border border-slate-600/50 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Mode selection */}
              <div className="flex gap-3 flex-wrap justify-center">
                <button
                  onClick={() => {
                    setScanMode('camera')
                    setIsScanning(true)
                    setError(null)
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    scanMode === 'camera'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                      : 'bg-slate-700/50 text-slate-200 hover:bg-slate-600/50'
                  }`}
                  disabled={isLoading}
                >
                  📷 Camera
                </button>
                <button
                  onClick={() => {
                    setScanMode('upload')
                    fileInputRef.current?.click()
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    scanMode === 'upload'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                      : 'bg-slate-700/50 text-slate-200 hover:bg-slate-600/50'
                  }`}
                  disabled={isLoading}
                >
                  <Upload className="w-4 h-4 mr-2 inline" />
                  Upload
                </button>
                <button
                  onClick={showDemoResult}
                  className="px-4 py-2 rounded-lg font-semibold transition-all bg-slate-700/50 text-slate-200 hover:bg-slate-600/50"
                >
                  📋 Demo
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Scanner or upload area */}
              {scanMode === 'camera' ? (
                <div className="relative">
                  {isScanning ? (
                    <div id="qr-scanner-hero" className="rounded-lg overflow-hidden border-2 border-cyan-500/30" />
                  ) : (
                    <div className="aspect-square bg-slate-800/50 rounded-lg border-2 border-dashed border-cyan-500/30 flex items-center justify-center">
                      <p className="text-gray-400 text-center">Camera access denied or no camera available</p>
                    </div>
                  )}

                  {/* Animated scan frame overlay */}
                  {isScanning && (
                    <div className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden">
                      <div className="absolute inset-0 border-2 border-cyan-400/50 rounded-lg"></div>
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan"></div>
                    </div>
                  )}
                </div>
              ) : uploadedImage ? (
                <div className="space-y-4">
                  <img src={uploadedImage} alt="Uploaded" className="w-full max-h-64 object-cover rounded-lg" />
                  <button
                    onClick={() => {
                      setUploadedImage(null)
                      fileInputRef.current?.click()
                    }}
                    className="w-full px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-white font-semibold border border-slate-600/50 transition-all"
                  >
                    Choose Different Image
                  </button>
                </div>
              ) : null}

              {/* Loading state */}
              {isLoading && (
                <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
                  <span className="text-cyan-400 font-semibold">Analyzing medicine...</span>
                </div>
              )}

              {/* Error state */}
              {error && (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <span className="text-red-400 text-sm">{error}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

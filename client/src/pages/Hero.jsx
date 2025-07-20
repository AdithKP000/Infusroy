"use client"

import { Upload, Eye, Zap, ArrowRight, Sparkles, Play, Star } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Component() {
  const router = useNavigate()

  return (
    <section className="w-full min-h-screen py-12 md:py-16 lg:py-20 xl:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-4000"></div>

        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-bounce animation-delay-1000"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400 rounded-full animate-bounce animation-delay-2000"></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-pink-400 rounded-full animate-bounce animation-delay-3000"></div>
        <div className="absolute top-1/3 right-20 w-2 h-2 bg-cyan-400 rounded-full animate-bounce animation-delay-4000"></div>
      </div>

      <div className="container px-4 md:px-6 mx-auto max-w-7xl relative z-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_500px] lg:gap-16 xl:grid-cols-[1fr_600px] items-center">
          <div className="flex flex-col justify-center space-y-8 animate-in slide-in-from-left duration-1000">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-50 to-purple-50 text-slate-800 border border-blue-200 w-fit shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Zap className="w-4 h-4 mr-2 text-blue-600" />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
                  AR/VR Solutions
                </span>
                <Sparkles className="w-4 h-4 ml-2 text-purple-600" />
              </div>

              <h1 className="text-4xl font-black tracking-tight sm:text-5xl xl:text-7xl/tight">
                <span className="block text-slate-900 mb-2">Transform Your</span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  3D Models
                </span>
                <span className="block text-slate-900">
                  with{" "}
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Infusory
                    </span>
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                  </span>
                </span>
              </h1>

              <p className="max-w-[600px] text-slate-600 text-lg md:text-xl leading-relaxed">
                Upload, visualize, and experience your 3D models like never before. Our cutting-edge AR/VR platform
                brings your digital creations to life with{" "}
                <span className="font-semibold text-slate-800">immersive viewing experiences</span>.
              </p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full border border-gray-200 shadow-sm">
                  <Star className="w-4 h-4 text-yellow-500 mr-2" />
                  <span className="text-slate-700 font-medium">High-Quality Rendering</span>
                </div>
                <div className="flex items-center bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full border border-gray-200 shadow-sm">
                  <Zap className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="text-slate-700 font-medium">Real-time Preview</span>
                </div>
                <div className="flex items-center bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full border border-gray-200 shadow-sm">
                  <Eye className="w-4 h-4 text-purple-500 mr-2" />
                  <span className="text-slate-700 font-medium">AR/VR Ready</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => router("/upload")}
                className="group relative inline-flex items-center justify-center h-14 px-8 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Upload className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                <span  className="relative">Upload Your Model</span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
              </button>
              <button
                onClick={() => router("/model")}
                className="group relative inline-flex items-center justify-center h-14 px-8 rounded-2xl border-2 border-slate-300 bg-white/80 backdrop-blur-sm text-slate-700 font-semibold hover:bg-slate-50 hover:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <Play className="w-5 h-5 mr-3 text-blue-600 group-hover:text-purple-600 transition-colors duration-300" />
                <span className="relative">View Demo</span>
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

           
          </div>

          <div className="flex items-center justify-center lg:order-last animate-in slide-in-from-right duration-1000 animation-delay-300">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-3xl blur-3xl group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 group-hover:shadow-3xl transition-all duration-500 transform group-hover:scale-105">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src="./bee.png"
                    width="400"
                    height="400"
                    alt="3D Model Viewer Interface"
                    className="rounded-2xl transform group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>

                  {/* Interactive elements */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Play className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                </div>

                {/* Floating action buttons */}
                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-4 shadow-xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300 hover:scale-110">
                  <Eye className="w-6 h-6" />
                </div>

                <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-4 shadow-xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-300 hover:scale-110">
                  <Upload className="w-6 h-6" />
                </div>

                {/* Feature badges */}
                <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                  LIVE
                </div>

                <div className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  4K
                </div>
              </div>

              {/* Orbiting elements */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-purple-500 rounded-full animate-ping animation-delay-1000"></div>
              <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 w-3 h-3 bg-pink-500 rounded-full animate-ping animation-delay-2000"></div>
              <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 w-4 h-4 bg-cyan-500 rounded-full animate-ping animation-delay-3000"></div>
            </div>
          </div>
        </div>

        {/* Bottom section with trust indicators */}
       
      </div>
    </section>
  )
}

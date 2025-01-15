"use client"

import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <main className="h-svh w-full flex flex-col items-center justify-center bg-white dark:bg-gray-900">
          <div className="flex flex-col items-center space-y-6 p-4 text-center">
            <div className="relative">
              {/* Primary loader */}
              <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
    
              {/* Secondary pulsing circle */}
              <div className="absolute top-0 left-0 w-12 h-12">
                <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-25"></div>
              </div>
            </div>
    
            {/* Loading text */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                페이지를 불러오고 있습니다.
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                몇 분 정도 걸릴 수 있습니다.
              </p>
            </div>
    
            {/* Progress bar */}
            <div className="w-64 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full animate-[loading_2s_ease-in-out_infinite]"
                style={{
                  width: "75%",
                  animation: "loading 2s ease-in-out infinite",
                }}
              ></div>
            </div>
    
            {/* Loading dots */}
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-[bounce_1s_infinite]"></div>
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-[bounce_1s_infinite_0.2s]"></div>
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-[bounce_1s_infinite_0.4s]"></div>
            </div>
          </div>
    
          <style jsx>{`
            @keyframes loading {
              0% {
                transform: translateX(-100%);
              }
              50% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(100%);
              }
            }
          `}</style>
        </main>
      );
    };

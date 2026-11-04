import { useEffect, useRef } from 'react'

const SRC = 'https://stream.mux.com/kimF2ha9zLrX64H00UgLGPflCzNtl1T0215MlAmeOztv8.m3u8'

export default function BackgroundVideo() {
  const ref = useRef(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    // Safari умеет HLS сам, остальным браузерам помогает hls.js
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = SRC
      return
    }
    let hls = null
    let cancelled = false
    // hls.js грузим отдельным чанком только там, где он нужен
    import('hls.js').then(({ default: Hls }) => {
      if (cancelled || !Hls.isSupported()) return
      hls = new Hls()
      hls.loadSource(SRC)
      hls.attachMedia(video)
    })
    return () => {
      cancelled = true
      if (hls) hls.destroy()
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <video
        ref={ref}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover opacity-100"
      />
    </div>
  )
}

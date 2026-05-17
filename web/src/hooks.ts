import { useEffect, useRef, useState } from 'react'
import { MUSIC_ENABLED, MUSIC_FILE, MUSIC_START_VOLUME } from './config'

export function useProgress(stepCount: number) {
  const [pct, setPct] = useState(0)
  const [step, setStep] = useState(0)

  useEffect(() => {
    let cancelled = false
    let gotRealEvent = false
    let simTimeout: number | undefined

    const setStepFromPct = (next: number) => {
      const targetStep = Math.min(stepCount - 1, Math.floor((next / 100) * stepCount))
      setStep(targetStep)
    }

    const onMsg = (e: MessageEvent) => {
      const d = e?.data
      if (!d || typeof d !== 'object') return

      if (typeof d.loadFraction === 'number') {
        gotRealEvent = true
        const next = Math.max(0, Math.min(100, d.loadFraction * 100))
        setPct(next)
        setStepFromPct(next)
        return
      }

      switch (d.eventName) {
        case 'startInitFunctionOrder':
          gotRealEvent = true
          setStep(0)
          break
        case 'initFunctionInvoking':
          gotRealEvent = true
          if (typeof d.idx === 'number' && typeof d.count === 'number' && d.count > 0) {
            const next = Math.min(30, (d.idx / d.count) * 30)
            setPct((p) => Math.max(p, next))
            setStepFromPct(next)
          }
          break
        case 'startDataFileEntries':
          gotRealEvent = true
          break
        case 'performMapLoadFunction':
        case 'onDataFileEntry':
          gotRealEvent = true
          break
        case 'endDataFileEntries':
          gotRealEvent = true
          setPct((p) => Math.max(p, 98))
          setStepFromPct(98)
          break
      }
    }

    window.addEventListener('message', onMsg)

    const tick = () => {
      if (cancelled || gotRealEvent) return
      setPct((p) => {
        const next = Math.min(98, p + 1 + Math.random() * 4)
        setStepFromPct(next)
        if (next < 98) simTimeout = window.setTimeout(tick, 600 + Math.random() * 700)
        return next
      })
    }
    const startSim = window.setTimeout(() => {
      if (!gotRealEvent) tick()
    }, 1500)

    return () => {
      cancelled = true
      window.removeEventListener('message', onMsg)
      window.clearTimeout(startSim)
      if (simTimeout) window.clearTimeout(simTimeout)
    }
  }, [stepCount])

  return { pct, step }
}

export function useSessionId() {
  const [id, setId] = useState('—')
  useEffect(() => {
    const bytes = crypto.getRandomValues(new Uint8Array(4))
    const hex = Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('')
    setId(`0x${hex.toUpperCase()}`)
  }, [])
  return id
}

export function useClock() {
  const [t, setT] = useState(() => stamp())
  useEffect(() => {
    const id = setInterval(() => setT(stamp()), 1000)
    return () => clearInterval(id)
  }, [])
  return t
}

function stamp() {
  const d = new Date()
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`
}

export function useLoadscreenAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(MUSIC_ENABLED)
  const [volume, setVolume] = useState(MUSIC_START_VOLUME)

  useEffect(() => {
    if (!MUSIC_ENABLED) return
    const a = new Audio(MUSIC_FILE)
    a.loop = true
    a.volume = MUSIC_START_VOLUME
    a.play().catch(() => {})
    audioRef.current = a
    return () => { a.pause(); audioRef.current = null }
  }, [])

  useEffect(() => {
    const adjust = (delta: number) => {
      const a = audioRef.current
      if (!a) return
      const next = Math.max(0, Math.min(1, a.volume + delta))
      a.volume = next
      setVolume(next)
    }
    const toggle = () => {
      const a = audioRef.current
      if (!a) return
      if (a.paused) { a.play().catch(() => {}); setPlaying(true) }
      else { a.pause(); setPlaying(false) }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'KeyW') adjust(+0.05)
      else if (e.code === 'KeyS') adjust(-0.05)
      else if (e.code === 'KeyP') toggle()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return { playing, volume }
}

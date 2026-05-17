import { Box, Center, Stack } from '@mantine/core'
import { memo, useEffect, useState } from 'react'
import { Background } from './components/Background'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Logo } from './components/Logo'
import { Progress } from './components/Progress'
import { Wordmark } from './components/Wordmark'
import { TASK_STEPS } from './config'
import { useProgress } from './hooks'

const Chrome = memo(function Chrome() {
  return (
    <>
      <Background />
      <Header />
      <Footer />
    </>
  )
})

export default function App() {
  const { pct, step } = useProgress(TASK_STEPS.length)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e?.data?.fullyLoaded) setHidden(true)
    }
    window.addEventListener('message', onMsg)
    return () => window.removeEventListener('message', onMsg)
  }, [])

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#141517',
        transition: 'opacity 700ms',
      }}
      style={{ opacity: hidden ? 0 : 1, pointerEvents: hidden ? 'none' : 'auto' }}
    >
      <Chrome />
      <Center component="main" h="100%" sx={{ position: 'relative', zIndex: 10 }}>
        <Stack spacing={0} align="center">
          <Logo />
          <Box mt="xl">
            <Wordmark />
          </Box>
          <Progress pct={pct} label={TASK_STEPS[step]} />
        </Stack>
      </Center>
    </Box>
  )
}

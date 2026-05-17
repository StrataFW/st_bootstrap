import { Stack, Text, Title } from '@mantine/core'
import { memo } from 'react'
import { SERVER_NAME, TAGLINE, VERSION } from '../config'

const heroBase = {
  fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif',
  fontWeight: 800,
  letterSpacing: '0.18em',
  fontSize: 'clamp(3rem, 7vw, 6rem)',
  lineHeight: 0.92,
}

export const Wordmark = memo(function Wordmark() {
  return (
    <Stack spacing={4} align="center">
      <Title order={1} sx={{ ...heroBase, color: '#C1C2C5' }}>
        {SERVER_NAME}
      </Title>
      <Title
        order={2}
        sx={{
          ...heroBase,
          fontWeight: 600,
          fontSize: 'clamp(1.4rem, 3vw, 2.5rem)',
          letterSpacing: '0.4em',
          color: '#5C5F66',
        }}
      >
        {TAGLINE}
      </Title>
      <Text
        mt={14}
        color="dark.3"
        sx={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 500,
          fontSize: 'clamp(10px, 0.6vw, 13px)',
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
        }}
      >
        {VERSION} · built on ox_core
      </Text>
    </Stack>
  )
})

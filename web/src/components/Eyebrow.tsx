import { Divider, Group, Text } from '@mantine/core'
import { memo, type ReactNode } from 'react'

export const Eyebrow = memo(function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <Group spacing="md" align="center">
      <Divider w={24} color="blue.6" size="sm" />
      <Text
        weight={600}
        tt="uppercase"
        color="dark.2"
        sx={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 'clamp(9px, 0.55vw, 12px)',
          letterSpacing: '0.24em',
        }}
      >
        {children}
      </Text>
      <Divider w={24} color="blue.6" size="sm" />
    </Group>
  )
})

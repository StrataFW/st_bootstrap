import { Box, Group, Progress as MantineProgress, Stack, Text, createStyles } from '@mantine/core'
import { memo, useEffect, useMemo, useState } from 'react'

const useStyles = createStyles((theme) => ({
  caps: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 600,
    fontSize: 'clamp(11px, 0.6vw, 13px)',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
  },
  pctBig: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 700,
    fontSize: 'clamp(1.05rem, 1.4vw, 1.45rem)',
    letterSpacing: '0.04em',
    fontVariantNumeric: 'tabular-nums',
    color: theme.white,
  },
}))

export const Progress = memo(function Progress({ pct, label }: { pct: number; label: string }) {
  const { classes } = useStyles()
  const pctStr = useMemo(() => String(Math.round(pct)).padStart(2, '0'), [pct])

  const [shownLabel, setShownLabel] = useState(label)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (label === shownLabel) return
    setVisible(false)
    const t = setTimeout(() => {
      setShownLabel(label)
      setVisible(true)
    }, 220)
    return () => clearTimeout(t)
  }, [label])

  return (
    <Stack spacing="md" align="stretch" w="min(640px, 60vw)" mt="clamp(28px, 3vw, 48px)">
      <MantineProgress value={pct} size="sm" radius="sm" color="blue" />

      <Group position="apart" align="center" noWrap>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Text
            className={classes.caps}
            color="dark.0"
            sx={{
              opacity: visible ? 1 : 0,
              transition: 'opacity 220ms ease',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {shownLabel}
          </Text>
        </Box>

        <Group spacing={6} align="baseline" sx={{ flexShrink: 0 }}>
          <Text className={classes.pctBig}>{pctStr}</Text>
          <Text className={classes.caps} color="blue.4">%</Text>
        </Group>
      </Group>
    </Stack>
  )
})

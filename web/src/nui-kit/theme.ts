import type { MantineThemeOverride, MantineTheme } from '@mantine/core'

export const theme: MantineThemeOverride = {
  colorScheme:         'dark',
  primaryColor:        'blue',
  fontFamily:          'Montserrat, ui-sans-serif, system-ui, sans-serif',
  fontFamilyMonospace: 'Montserrat, ui-sans-serif, system-ui, sans-serif',
  fontSizes:           { xs: 12, sm: 14, md: 16, lg: 20, xl: 24 },
  headings: {
    fontFamily: 'Montserrat, ui-sans-serif, system-ui, sans-serif',
    fontWeight: 700,
  },
  defaultRadius: 'sm',

  components: {
    Badge: {
      defaultProps: { variant: 'light' },
      styles:       { root: { textTransform: 'uppercase' as const, letterSpacing: '0.06em' } },
    },

    Button: {
      defaultProps: { variant: 'light' },
      styles: {
        root: {
          textTransform: 'uppercase' as const,
          minHeight:     'clamp(24px, 1.35vw, 32px)',
          paddingLeft:   'clamp(10px, 0.7vw, 15px)',
          paddingRight:  'clamp(10px, 0.7vw, 15px)',
          fontSize:      'clamp(11px, 0.55vw, 13px)',
          letterSpacing: '0.04em',
        },
      },
    },

    ActionIcon: {
      styles: {
        root: {
          width:    'clamp(20px, 1.2vw, 30px)',
          height:   'clamp(20px, 1.2vw, 30px)',
          minWidth: 'clamp(20px, 1.2vw, 30px)',
        },
      },
    },

    Input: {
      styles: {
        input: {
          minHeight: 'clamp(26px, 1.45vw, 34px)',
          fontSize:  'clamp(11px, 0.55vw, 13px)',
        },
      },
    },

    Select: {
      styles: {
        input: {
          minHeight: 'clamp(26px, 1.45vw, 34px)',
          fontSize:  'clamp(11px, 0.55vw, 13px)',
        },
        item: { fontSize: 'clamp(11px, 0.55vw, 13px)' },
      },
    },

    NumberInput: {
      styles: {
        input: {
          minHeight: 'clamp(26px, 1.45vw, 34px)',
          fontSize:  'clamp(11px, 0.55vw, 13px)',
        },
      },
    },

    Textarea: {
      styles: {
        input: {
          fontSize:   'clamp(11px, 0.55vw, 13px)',
          lineHeight: 1.5,
        },
      },
    },

    SegmentedControl: {
      styles: (theme: MantineTheme) => ({
        root:   { backgroundColor: theme.colors.dark[8] },
        label: {
          fontSize:      'clamp(10px, 0.55vw, 12px)',
          fontWeight:    600,
          letterSpacing: '0.02em',
          padding:       'clamp(4px, 0.3vw, 7px) clamp(6px, 0.45vw, 10px)',
        },
        active: { backgroundColor: theme.colors.dark[6] },
      }),
    },

    Switch: {
      styles: (theme: MantineTheme) => ({
        track: { borderColor: theme.colors.dark[5] },
        label: { fontSize: 'clamp(11px, 0.6vw, 13px)', fontWeight: 600 },
      }),
    },

    Slider: {
      styles: (theme: MantineTheme) => ({
        track: { backgroundColor: theme.colors.dark[6] },
        markLabel: {
          fontSize: 'clamp(9px, 0.5vw, 11px)',
          color:    theme.colors.dark[3],
        },
      }),
    },

    Tabs: {
      styles: (theme: MantineTheme) => ({
        tab: {
          fontSize:   'clamp(11px, 0.6vw, 13px)',
          fontWeight: 600,
          '&[data-active]': { borderColor: theme.colors[theme.primaryColor][6] },
        },
      }),
    },

    Tooltip: {
      defaultProps: { transition: 'pop', withinPortal: true },
      styles: (theme: MantineTheme) => ({
        tooltip: {
          fontSize:        'clamp(10px, 0.55vw, 12px)',
          backgroundColor: theme.colors.dark[5],
        },
      }),
    },

    Progress: {
      styles: (theme: MantineTheme) => ({
        root: { backgroundColor: theme.colors.dark[6] },
        bar:  { transition: 'width 200ms linear' },
      }),
    },
  },
}

import { H } from '@highlight-run/next/client'

export const highlightConfig = {
  projectId: process.env.NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID || 'ng2zj60g',
  tracingOrigins: [
    'localhost',
    'isr-perf-test.catalyst-canary.store',
    /^https:\/\/.*\.cloudflare\.com$/,
  ],
  networkRecording: {
    enabled: true,
    recordHeadersAndBody: true,
  },
  enableSegmentIntegration: false,
  enableCanvasRecording: false,
}

H.init(highlightConfig)
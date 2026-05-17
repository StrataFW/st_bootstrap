import { useEffect } from 'react'

export const isInGame =
  typeof (window as unknown as { invokeNative?: unknown }).invokeNative !== 'undefined'

export async function nui<T = unknown>(
  method:   string,
  body?:    unknown,
  fallback: string = 'strata-nui',
): Promise<T> {
  if (!isInGame) {
    console.debug('[nui:dev]', method, body)
    return { ok: true } as T
  }

  const resourceName =
    (window as unknown as { GetParentResourceName?: () => string })
      .GetParentResourceName?.() ?? fallback

  const res = await fetch(`https://${resourceName}/${method}`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body:    JSON.stringify(body ?? {}),
  })
  return (await res.json()) as T
}

export function useNuiEvent<T = unknown>(
  event: string,
  handler: (payload: T) => void,
) {
  useEffect(() => {
    const listener = (e: MessageEvent) => {
      if (e.data?.type === event) handler(e.data.payload as T)
    }
    window.addEventListener('message', listener)
    return () => window.removeEventListener('message', listener)
  }, [event, handler])
}

import { useRouter } from "next/router"
import { useEffect } from "react"

export const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''

export type Event = {
  action: string
  category: string
  label?: Record<string, string | number | boolean>
  value?: string
}

// PVを測定する
export const pageview = (path: string) => {
  window.gtag('config', gaId, {
    page_path: path,
  })
}

// GAイベントを発火させる
export const event = ({action, category, label}: Event) => {
  if (gaId === '') {
    return
  }
  window.gtag('event', action, {
    event_category: category,
    event_label: label ? JSON.stringify(label) : undefined,
  })
}

// _app.tsx で読み込む
export const usePageView = () => {
  const router = useRouter()

  useEffect(() => {
    if (gaId === '') {
      return
    }

    const handleRouteChange = (path: string) => {
      pageview(path)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}

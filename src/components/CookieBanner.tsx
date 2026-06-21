import { useState, useEffect } from 'react'
import s from './CookieBanner.module.css'

const STORAGE_KEY = 'bbb_consent'

function updateConsent(granted: boolean) {
  window.gtag?.('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
    ad_storage: 'denied',
  })
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) {
      setVisible(true)
    } else {
      updateConsent(saved === 'accepted')
    }
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    updateConsent(true)
    setVisible(false)
  }

  function refuse() {
    localStorage.setItem(STORAGE_KEY, 'refused')
    updateConsent(false)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={s.banner} role="dialog" aria-label="Consentement aux cookies">
      <p className={s.text}>
        On utilise Google Analytics pour comprendre comment le site est utilisé et l'améliorer. Aucune donnée publicitaire.
      </p>
      <div className={s.actions}>
        <button className={s.refuse} onClick={refuse}>Refuser</button>
        <button className={s.accept} onClick={accept}>Accepter</button>
      </div>
    </div>
  )
}

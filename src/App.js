import './css/index.css'
import React, { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Login from "./Login"
import Account from './Account_nomod'

export default function Home() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? <Login /> : <Account key={session.user.id} session={session} />}
    </div>
  )
}
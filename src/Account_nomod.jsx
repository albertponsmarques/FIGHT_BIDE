import React, { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Avatar from './AvatarNomod'
import { NavLink } from 'react-router-dom'
import "./css/account.css"
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

export default function AccountNomod({ session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-widget">
      <div>
        <h1>
          PROFILE
        </h1>
      </div>
      <div className='avatar'>
        <Avatar
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url)
        }}
    />
      </div>
      <div className='inputDiv'>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div className='inputDiv'>
        <input
          id="username"
          type="text"
          value={username} 
          disabled
          />
      </div>
      <div className='inputDiv'>
        <input
          id="website"
          type="website"
          value={website}
          disabled
        />
      </div>
      <div className='AButton'>
            <h3>Update your profile:</h3>
            <AwesomeButton type="primary" size="medium">
              <NavLink className="nav-link" to="/login">
                  update
              </NavLink>
            </AwesomeButton>
        </div>
      <div className='AButton'>
      <AwesomeButton type="primary" size="medium" onPress={() => supabase.auth.signOut()} >Sign Out</AwesomeButton>
      </div>
    </div>
  )
}
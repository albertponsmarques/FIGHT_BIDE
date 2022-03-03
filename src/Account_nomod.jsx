import React, { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Avatar from './AvatarNomod'
import Boton from './Boton'
import { NavLink } from 'react-router-dom'
import "./css/account.css"
import { AwesomeButton } from "react-awesome-button";
import "./css/awesomeButtons.css";  


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
        <h1 className='account_title'>
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

      <div>
            <h3>Update your profile</h3>
            <Boton linkTo={"/login"} textButton={"update"}/>
      <div className='AButton'>
            <h3>Update your profile:</h3>
            <Boton linkTo={"/login"} textButton={"update"} size="large" type="primary"/>
        </div>
      <div className='AButton'>
        <BotonAction type="secondary" size="large" action={() => supabase.auth.signOut()} textButton="Sign Out"/>
      </div>
    </div>
    </div>
  )
}
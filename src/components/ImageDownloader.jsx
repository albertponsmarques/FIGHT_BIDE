import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

export default function Image({ url, size }) {
  const [image, setimage] = useState(null)

  useEffect(() => {
      console.log(url)
    if (url) downloadImage(url)
  }, [url])

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage.from('newsimg').download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setimage(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }


  return (
    <div>
      {image ? (
        <img
          src={image}
          alt="image"
          className="news image"
          style={{ height: size, width: size + 150 }}
        />
      ) : (
        <div className="news no-image" style={{ height: size, width: size }} />
      )}
    </div>
  )
}
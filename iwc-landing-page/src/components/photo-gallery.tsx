'use client'

import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import Image from 'next/image'

interface Photo {
  id: string
  url: string
  description: string
  date: Date
}

interface PhotoTileProps {
  photos: Photo[]
  interval?: number
}

const PhotoTile: React.FC<PhotoTileProps> = ({ photos, interval = 5000 }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFlipped(true)
      setTimeout(() => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length)
        setIsFlipped(false)
      }, 500)
    }, interval)

    return () => clearInterval(timer)
  }, [photos, interval])

  const currentPhoto = photos[currentPhotoIndex]

  return (
    <div className={`relative bg-amber-700 w-full h-0 pb-[100%] overflow-hidden ${isFlipped ? 'flipped' : ''}`}>
      <div className="absolute inset-0 transition-transform duration-1000 transform-style-preserve-3d">
        <div className="absolute inset-0 backface-hidden">
          <Image
            src={currentPhoto.url}
            alt={currentPhoto.description}
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 backface-hidden transform rotate-y-180 bg-amber-700 bg-opacity-90 flex flex-col justify-end p-4 text-white">
          <p className="text-sm mb-2">{currentPhoto.description}</p>
          <p className="text-xs">{format(currentPhoto.date, 'MMMM d, yyyy')}</p>
        </div>
      </div>
    </div>
  )
}

interface PhotoGalleryProps {
  photos: Photo[][]
  columns?: number
}

export default function PhotoGalleryComponent({ photos, columns = 3 }: PhotoGalleryProps) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {photos.map((photoGroup, index) => (
        <PhotoTile key={index} photos={photoGroup} />
      ))}
    </div>
  )
}
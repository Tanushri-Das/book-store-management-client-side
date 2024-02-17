"use client";
import { AuthContext } from '@/Contexts/AuthProvider/AuthProvider'
import React, { useContext } from 'react'

const page = () => {
  const {user}=useContext(AuthContext)
  return (
    <div>{user?.displayName}</div>
  )
}

export default page
import axios from 'axios'
import React from 'react'

const api = axios.create({
  baseURL: "https://internshipapi-1.onrender.com/api"
})

export default api

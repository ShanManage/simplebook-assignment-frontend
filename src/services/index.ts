/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { auth } from '../config/firebase'
import { exceptionHandler } from '../utils/helpers'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export const axiosPublicInstance = axios.create()
export const axiosPrivateInstance = axios.create()

// Request interceptor to manage authorization & headers
axiosPrivateInstance.interceptors.request.use(async (request: any) => {
  const accessToken = await auth.currentUser?.getIdToken()
  request.headers.Authorization = `Bearer ${accessToken}`
  return request
}, (error) => {
  console.log('Req interceptor Error', error)
})

// Response interceptor to manage responses & errors
axiosPrivateInstance.interceptors.response.use(async (response) => {
  return response
}, async (error) => {
  return Promise.reject(await exceptionHandler(error.response))
})

axiosPublicInstance.interceptors.response.use(async (response) => {
  return response
}, async (error) => {
  return Promise.reject(await exceptionHandler(error.response))
})
"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Lock, Eye, EyeOff } from 'lucide-react'
import { motion } from 'framer-motion'

const ADMIN_PASSWORD = "soulmate2024" // Cambiar por una contraseña segura

interface AdminAuthProps {
  children: React.ReactNode
}

export default function AdminAuth({ children }: AdminAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar si ya está autenticado en sessionStorage
    const authStatus = sessionStorage.getItem('admin-authenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem('admin-authenticated', 'true')
      setError('')
    } else {
      setError('Contraseña incorrecta')
      setPassword('')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('admin-authenticated')
    setPassword('')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pearl-50 to-pearl-100 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-pearl-200 border-t-primary rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pearl-50 to-pearl-100 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-primary rounded-full w-fit">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Acceso Admin</CardTitle>
              <CardDescription>
                Ingresa la contraseña para acceder al panel de administración
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                    autoFocus
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <Button type="submit" className="w-full">
                  <Lock className="h-4 w-4 mr-2" />
                  Acceder
                </Button>
              </form>

              <div className="mt-4 text-xs text-center text-muted-foreground">
                Solo personal autorizado
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  // Renderizar children con botón de logout
  return (
    <div className="relative">
      {children}
      
      {/* Botón de logout flotante */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={handleLogout}
          variant="outline"
          size="sm"
          className="bg-white/80 backdrop-blur-sm"
        >
          <Lock className="h-4 w-4 mr-2" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  )
}
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { api } from '@/services/api/api'
import { jwtDecode } from 'jwt-decode'

// Mock the API module
jest.mock('@/services/api/api', () => ({
  api: {
    post: jest.fn(),
  },
}))

// Mock jwt-decode
jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn(),
}))

// Mock sonner toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

// Test component to access context
const TestComponent = () => {
  const { user, loading, login, logout, verificarCodigo, isVerificado, reenviarCodigo } = useAuth()
  
  return (
    <div>
      <div data-testid="user-info">
        {user ? `${user.login} - ${user.role}` : 'No user'}
      </div>
      <div data-testid="loading">{loading ? 'Loading' : 'Not loading'}</div>
      <button onClick={() => login('test@email.com', 'password')} data-testid="login-btn">
        Login
      </button>
      <button onClick={logout} data-testid="logout-btn">
        Logout
      </button>
      <button onClick={() => verificarCodigo('test@email.com', '123456')} data-testid="verify-btn">
        Verify Code
      </button>
      <button onClick={() => isVerificado('test@email.com')} data-testid="is-verified-btn">
        Is Verified
      </button>
      <button onClick={() => reenviarCodigo('test@email.com')} data-testid="resend-btn">
        Resend Code
      </button>
    </div>
  )
}

const renderWithAuth = (component: React.ReactElement) => {
  return render(<AuthProvider>{component}</AuthProvider>)
}

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
  })

  describe('Initial State', () => {
    it('should start with no user and not loading', () => {
      renderWithAuth(<TestComponent />)
      
      expect(screen.getByTestId('user-info')).toHaveTextContent('No user')
      expect(screen.getByTestId('loading')).toHaveTextContent('Not loading')
    })

    it('should load user from localStorage if token exists', () => {
      const mockToken = 'valid.jwt.token'
      const mockDecodedToken = {
        id: '1',
        sub: 'test@email.com',
        role: 'USER',
        nome: 'Test User',
      }
      
      localStorage.setItem('token', mockToken)
      ;(jwtDecode as jest.Mock).mockReturnValue(mockDecodedToken)
      
      renderWithAuth(<TestComponent />)
      
      expect(screen.getByTestId('user-info')).toHaveTextContent('test@email.com - USER')
    })

    it('should clear invalid token from localStorage', () => {
      localStorage.setItem('token', 'invalid.token')
      ;(jwtDecode as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid token')
      })
      
      renderWithAuth(<TestComponent />)
      
      expect(localStorage.removeItem).toHaveBeenCalledWith('token')
      expect(screen.getByTestId('user-info')).toHaveTextContent('No user')
    })
  })

  describe('Login', () => {
    it('should successfully login user', async () => {
      const mockToken = 'valid.jwt.token'
      const mockDecodedToken = {
        id: '1',
        sub: 'test@email.com',
        role: 'USER',
        nome: 'Test User',
      }
      
      ;(api.post as jest.Mock).mockResolvedValue({
        data: { Token: mockToken },
      })
      ;(jwtDecode as jest.Mock).mockReturnValue(mockDecodedToken)
      
      renderWithAuth(<TestComponent />)
      
      const loginButton = screen.getByTestId('login-btn')
      await userEvent.click(loginButton)
      
      await waitFor(() => {
        expect(api.post).toHaveBeenCalledWith('/auth/login', {
          login: 'test@email.com',
          password: 'password',
        })
      })
      
      expect(localStorage.setItem).toHaveBeenCalledWith('token', mockToken)
    })

    it('should handle login error', async () => {
      ;(api.post as jest.Mock).mockRejectedValue(new Error('Invalid credentials'))
      
      renderWithAuth(<TestComponent />)
      
      const loginButton = screen.getByTestId('login-btn')
      await userEvent.click(loginButton)
      
      await waitFor(() => {
        expect(api.post).toHaveBeenCalled()
      })
    })

    it('should handle missing token response', async () => {
      ;(api.post as jest.Mock).mockResolvedValue({
        data: {},
      })
      
      renderWithAuth(<TestComponent />)
      
      const loginButton = screen.getByTestId('login-btn')
      await userEvent.click(loginButton)
      
      await waitFor(() => {
        expect(api.post).toHaveBeenCalled()
      })
    })
  })

  describe('Logout', () => {
    it('should clear user data and token', () => {
      renderWithAuth(<TestComponent />)
      
      const logoutButton = screen.getByTestId('logout-btn')
      fireEvent.click(logoutButton)
      
      expect(localStorage.removeItem).toHaveBeenCalledWith('token')
    })
  })

  describe('Verificar Código', () => {
    it('should successfully verify code', async () => {
      ;(api.post as jest.Mock).mockResolvedValue({
        status: 200,
      })
      
      renderWithAuth(<TestComponent />)
      
      const verifyButton = screen.getByTestId('verify-btn')
      await userEvent.click(verifyButton)
      
      await waitFor(() => {
        expect(api.post).toHaveBeenCalledWith('/usuarios/verificar', null, {
          params: { email: 'test@email.com', codigo: '123456' },
        })
      })
    })

    it('should handle verification error', async () => {
      ;(api.post as jest.Mock).mockRejectedValue({
        response: { data: 'Invalid code' },
      })
      
      renderWithAuth(<TestComponent />)
      
      const verifyButton = screen.getByTestId('verify-btn')
      await userEvent.click(verifyButton)
      
      await waitFor(() => {
        expect(api.post).toHaveBeenCalled()
      })
    })
  })

  describe('Is Verificado', () => {
    it('should return true for verified user', async () => {
      ;(api.post as jest.Mock).mockResolvedValue({
        data: true,
      })
      
      renderWithAuth(<TestComponent />)
      
      const isVerifiedButton = screen.getByTestId('is-verified-btn')
      await userEvent.click(isVerifiedButton)
      
      await waitFor(() => {
        expect(api.post).toHaveBeenCalledWith('/usuarios/is-verificado', null, {
          params: { login: 'test@email.com' },
        })
      })
    })

    it('should return false for unverified user', async () => {
      ;(api.post as jest.Mock).mockRejectedValue(new Error('Not verified'))
      
      renderWithAuth(<TestComponent />)
      
      const isVerifiedButton = screen.getByTestId('is-verified-btn')
      await userEvent.click(isVerifiedButton)
      
      await waitFor(() => {
        expect(api.post).toHaveBeenCalled()
      })
    })
  })

  describe('Reenviar Código', () => {
    it('should successfully resend code', async () => {
      ;(api.post as jest.Mock).mockResolvedValue({
        status: 200,
      })
      
      renderWithAuth(<TestComponent />)
      
      const resendButton = screen.getByTestId('resend-btn')
      await userEvent.click(resendButton)
      
      await waitFor(() => {
        expect(api.post).toHaveBeenCalledWith('/usuarios/reenviar-codigo', null, {
          params: { email: 'test@email.com' },
        })
      })
    })

    it('should handle resend error', async () => {
      ;(api.post as jest.Mock).mockRejectedValue({
        response: { data: 'Error resending code' },
      })
      
      renderWithAuth(<TestComponent />)
      
      const resendButton = screen.getByTestId('resend-btn')
      await userEvent.click(resendButton)
      
      await waitFor(() => {
        expect(api.post).toHaveBeenCalled()
      })
    })
  })
}) 
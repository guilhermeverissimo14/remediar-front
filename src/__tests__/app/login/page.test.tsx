import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginPage from '@/app/login/page'
import { AuthProvider } from '@/contexts/AuthContext'

// Mock the AuthContext
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    login: jest.fn(),
    loading: false,
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}))

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

const renderLoginPage = () => {
  return render(
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  )
}

describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render login form with all elements', () => {
      renderLoginPage()
      
      // Check for main elements
      expect(screen.getByText('Realize seu Login')).toBeInTheDocument()
      expect(screen.getByText('Entre com seu email e senha')).toBeInTheDocument()
      
      // Check for form inputs
      expect(screen.getByPlaceholderText('usertest@gmail.com')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('********')).toBeInTheDocument()
      
      // Check for buttons
      expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Cadastre-se' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'Esqueceu a senha?' })).toBeInTheDocument()
    })

    it('should render logo and background images', () => {
      renderLoginPage()
      
      const images = screen.getAllByRole('img')
      expect(images.length).toBeGreaterThan(0)
    })

    it('should show password toggle button', () => {
      renderLoginPage()
      
      const passwordInput = screen.getByPlaceholderText('********')
      expect(passwordInput).toHaveAttribute('type', 'password')
      
      const toggleButton = screen.getByRole('button', { name: '' }) // Eye icon button
      expect(toggleButton).toBeInTheDocument()
    })
  })

  describe('Form Interaction', () => {
    it('should update email input value', async () => {
      renderLoginPage()
      
      const emailInput = screen.getByPlaceholderText('usertest@gmail.com')
      await userEvent.type(emailInput, 'test@example.com')
      
      expect(emailInput).toHaveValue('test@example.com')
    })

    it('should update password input value', async () => {
      renderLoginPage()
      
      const passwordInput = screen.getByPlaceholderText('********')
      await userEvent.type(passwordInput, 'password123')
      
      expect(passwordInput).toHaveValue('password123')
    })

    it('should toggle password visibility', async () => {
      renderLoginPage()
      
      const passwordInput = screen.getByPlaceholderText('********')
      const toggleButton = screen.getByRole('button', { name: '' })
      
      // Initially password should be hidden
      expect(passwordInput).toHaveAttribute('type', 'password')
      
      // Click toggle button
      await userEvent.click(toggleButton)
      
      // Password should be visible
      expect(passwordInput).toHaveAttribute('type', 'text')
      
      // Click toggle button again
      await userEvent.click(toggleButton)
      
      // Password should be hidden again
      expect(passwordInput).toHaveAttribute('type', 'password')
    })
  })

  describe('Form Submission', () => {
    it('should call login function with form data', async () => {
      const mockLogin = jest.fn()
      jest.spyOn(require('@/contexts/AuthContext'), 'useAuth').mockReturnValue({
        login: mockLogin,
        loading: false,
      })
      
      renderLoginPage()
      
      const emailInput = screen.getByPlaceholderText('usertest@gmail.com')
      const passwordInput = screen.getByPlaceholderText('********')
      const submitButton = screen.getByRole('button', { name: 'Entrar' })
      
      await userEvent.type(emailInput, 'test@example.com')
      await userEvent.type(passwordInput, 'password123')
      await userEvent.click(submitButton)
      
      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123')
      })
    })

    it('should show loading state during submission', async () => {
      jest.spyOn(require('@/contexts/AuthContext'), 'useAuth').mockReturnValue({
        login: jest.fn(),
        loading: true,
      })
      
      renderLoginPage()
      
      const submitButton = screen.getByRole('button', { name: 'Entrando...' })
      expect(submitButton).toBeDisabled()
    })

    it('should show error message on login failure', async () => {
      const mockLogin = jest.fn().mockRejectedValue(new Error('Invalid credentials'))
      jest.spyOn(require('@/contexts/AuthContext'), 'useAuth').mockReturnValue({
        login: mockLogin,
        loading: false,
      })
      
      renderLoginPage()
      
      const emailInput = screen.getByPlaceholderText('usertest@gmail.com')
      const passwordInput = screen.getByPlaceholderText('********')
      const submitButton = screen.getByRole('button', { name: 'Entrar' })
      
      await userEvent.type(emailInput, 'test@example.com')
      await userEvent.type(passwordInput, 'wrongpassword')
      await userEvent.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
      })
    })

    it('should clear error message when form is resubmitted', async () => {
      const mockLogin = jest.fn()
        .mockRejectedValueOnce(new Error('Invalid credentials'))
        .mockResolvedValueOnce(undefined)
      
      jest.spyOn(require('@/contexts/AuthContext'), 'useAuth').mockReturnValue({
        login: mockLogin,
        loading: false,
      })
      
      renderLoginPage()
      
      const emailInput = screen.getByPlaceholderText('usertest@gmail.com')
      const passwordInput = screen.getByPlaceholderText('********')
      const submitButton = screen.getByRole('button', { name: 'Entrar' })
      
      // First submission - error
      await userEvent.type(emailInput, 'test@example.com')
      await userEvent.type(passwordInput, 'wrongpassword')
      await userEvent.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
      })
      
      // Clear form and resubmit
      await userEvent.clear(emailInput)
      await userEvent.clear(passwordInput)
      await userEvent.type(emailInput, 'test@example.com')
      await userEvent.type(passwordInput, 'correctpassword')
      await userEvent.click(submitButton)
      
      await waitFor(() => {
        expect(screen.queryByText('Invalid credentials')).not.toBeInTheDocument()
      })
    })
  })

  describe('Navigation', () => {
    it('should have correct link to registration page', () => {
      renderLoginPage()
      
      const registerLink = screen.getByRole('link', { name: 'Cadastre-se' })
      expect(registerLink).toHaveAttribute('href', '/register/')
    })

    it('should have correct link to forgot password page', () => {
      renderLoginPage()
      
      const forgotPasswordLink = screen.getByRole('link', { name: 'Esqueceu a senha?' })
      expect(forgotPasswordLink).toHaveAttribute('href', 'esqueceu-senha/#')
    })
  })

  describe('Accessibility', () => {
    it('should have proper form labels and structure', () => {
      renderLoginPage()
      
      const emailInput = screen.getByPlaceholderText('usertest@gmail.com')
      const passwordInput = screen.getByPlaceholderText('********')
      
      expect(emailInput).toHaveAttribute('type', 'email')
      expect(passwordInput).toHaveAttribute('type', 'password')
    })

    it('should have proper button types', () => {
      renderLoginPage()
      
      const submitButton = screen.getByRole('button', { name: 'Entrar' })
      expect(submitButton).toHaveAttribute('type', 'submit')
    })
  })
}) 
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '@/components/ui/input'

describe('Input', () => {
  describe('Rendering', () => {
    it('should render input with default props', () => {
      render(<Input placeholder="Enter text" />)
      
      const input = screen.getByPlaceholderText('Enter text')
      expect(input).toBeInTheDocument()
      expect(input).toHaveClass('flex', 'h-10', 'w-full', 'rounded-md', 'border')
    })

    it('should render input with custom className', () => {
      render(<Input className="custom-class" placeholder="Custom" />)
      
      const input = screen.getByPlaceholderText('Custom')
      expect(input).toHaveClass('custom-class')
    })

    it('should render input with different types', () => {
      const { rerender } = render(<Input type="text" placeholder="Text" />)
      
      let input = screen.getByPlaceholderText('Text')
      expect(input).toHaveAttribute('type', 'text')
      
      rerender(<Input type="email" placeholder="Email" />)
      input = screen.getByPlaceholderText('Email')
      expect(input).toHaveAttribute('type', 'email')
      
      rerender(<Input type="password" placeholder="Password" />)
      input = screen.getByPlaceholderText('Password')
      expect(input).toHaveAttribute('type', 'password')
      
      rerender(<Input type="number" placeholder="Number" />)
      input = screen.getByPlaceholderText('Number')
      expect(input).toHaveAttribute('type', 'number')
    })

    it('should render disabled input', () => {
      render(<Input disabled placeholder="Disabled" />)
      
      const input = screen.getByPlaceholderText('Disabled')
      expect(input).toBeDisabled()
      expect(input).toHaveClass('cursor-not-allowed', 'opacity-50')
    })

    it('should render read-only input', () => {
      render(<Input readOnly placeholder="Read only" />)
      
      const input = screen.getByPlaceholderText('Read only')
      expect(input).toHaveAttribute('readonly')
    })

    it('should render input with value', () => {
      render(<Input value="Initial value" placeholder="With value" />)
      
      const input = screen.getByPlaceholderText('With value')
      expect(input).toHaveValue('Initial value')
    })

    it('should render input with id and name', () => {
      render(<Input id="test-input" name="testName" placeholder="With id and name" />)
      
      const input = screen.getByPlaceholderText('With id and name')
      expect(input).toHaveAttribute('id', 'test-input')
      expect(input).toHaveAttribute('name', 'testName')
    })
  })

  describe('Interaction', () => {
    it('should handle value changes', async () => {
      render(<Input placeholder="Change me" />)
      
      const input = screen.getByPlaceholderText('Change me')
      await userEvent.type(input, 'New value')
      
      expect(input).toHaveValue('New value')
    })

    it('should handle onChange events', async () => {
      const handleChange = jest.fn()
      render(<Input onChange={handleChange} placeholder="Change handler" />)
      
      const input = screen.getByPlaceholderText('Change handler')
      await userEvent.type(input, 'test')
      
      expect(handleChange).toHaveBeenCalled()
    })

    it('should handle onFocus events', () => {
      const handleFocus = jest.fn()
      render(<Input onFocus={handleFocus} placeholder="Focus test" />)
      
      const input = screen.getByPlaceholderText('Focus test')
      fireEvent.focus(input)
      
      expect(handleFocus).toHaveBeenCalledTimes(1)
    })

    it('should handle onBlur events', () => {
      const handleBlur = jest.fn()
      render(<Input onBlur={handleBlur} placeholder="Blur test" />)
      
      const input = screen.getByPlaceholderText('Blur test')
      fireEvent.blur(input)
      
      expect(handleBlur).toHaveBeenCalledTimes(1)
    })

    it('should handle onKeyDown events', () => {
      const handleKeyDown = jest.fn()
      render(<Input onKeyDown={handleKeyDown} placeholder="Key test" />)
      
      const input = screen.getByPlaceholderText('Key test')
      fireEvent.keyDown(input, { key: 'Enter' })
      
      expect(handleKeyDown).toHaveBeenCalledTimes(1)
    })

    it('should handle onKeyUp events', () => {
      const handleKeyUp = jest.fn()
      render(<Input onKeyUp={handleKeyUp} placeholder="Key up test" />)
      
      const input = screen.getByPlaceholderText('Key up test')
      fireEvent.keyUp(input, { key: 'Enter' })
      
      expect(handleKeyUp).toHaveBeenCalledTimes(1)
    })

    it('should not allow input when disabled', async () => {
      render(<Input disabled placeholder="Disabled input" />)
      
      const input = screen.getByPlaceholderText('Disabled input')
      await userEvent.type(input, 'test')
      
      expect(input).toHaveValue('')
    })

    it('should handle controlled input', () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState('')
        return (
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Controlled"
          />
        )
      }
      
      render(<TestComponent />)
      
      const input = screen.getByPlaceholderText('Controlled')
      expect(input).toHaveValue('')
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(
        <Input
          aria-label="Custom label"
          aria-describedby="description"
          aria-required="true"
          placeholder="Accessible"
        />
      )
      
      const input = screen.getByRole('textbox', { name: 'Custom label' })
      expect(input).toHaveAttribute('aria-describedby', 'description')
      expect(input).toHaveAttribute('aria-required', 'true')
    })

    it('should support ref forwarding', () => {
      const ref = React.createRef<HTMLInputElement>()
      render(<Input ref={ref} placeholder="Ref test" />)
      
      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })

    it('should have proper input attributes', () => {
      render(
        <Input
          required
          minLength={3}
          maxLength={10}
          pattern="[A-Za-z]+"
          placeholder="Attributes"
        />
      )
      
      const input = screen.getByPlaceholderText('Attributes')
      expect(input).toHaveAttribute('required')
      expect(input).toHaveAttribute('minLength', '3')
      expect(input).toHaveAttribute('maxLength', '10')
      expect(input).toHaveAttribute('pattern', '[A-Za-z]+')
    })

    it('should have proper autocomplete attributes', () => {
      render(<Input autoComplete="email" placeholder="Email" />)
      
      const input = screen.getByPlaceholderText('Email')
      expect(input).toHaveAttribute('autoComplete', 'email')
    })
  })

  describe('Styling', () => {
    it('should apply focus styles', () => {
      render(<Input placeholder="Focus styles" />)
      
      const input = screen.getByPlaceholderText('Focus styles')
      expect(input).toHaveClass('focus-visible:outline-none', 'focus-visible:ring-2')
    })

    it('should apply disabled styles', () => {
      render(<Input disabled placeholder="Disabled styles" />)
      
      const input = screen.getByPlaceholderText('Disabled styles')
      expect(input).toHaveClass('cursor-not-allowed', 'opacity-50')
    })

    it('should apply file input styles when type is file', () => {
      render(<Input type="file" />)
      
      const input = screen.getByRole('button')
      expect(input).toHaveClass('file:border-0', 'file:bg-transparent')
    })
  })

  describe('File Input', () => {
    it('should render file input correctly', () => {
      render(<Input type="file" />)
      
      const input = screen.getByRole('button')
      expect(input).toBeInTheDocument()
    })

    it('should handle file selection', () => {
      const handleChange = jest.fn()
      render(<Input type="file" onChange={handleChange} />)
      
      const input = screen.getByRole('button')
      const file = new File(['test'], 'test.txt', { type: 'text/plain' })
      
      fireEvent.change(input, { target: { files: [file] } })
      
      expect(handleChange).toHaveBeenCalled()
    })
  })

  describe('Form Integration', () => {
    it('should work with form submission', () => {
      const handleSubmit = jest.fn((e) => e.preventDefault())
      
      render(
        <form onSubmit={handleSubmit}>
          <Input name="test" placeholder="Form input" />
          <button type="submit">Submit</button>
        </form>
      )
      
      const submitButton = screen.getByRole('button', { name: 'Submit' })
      fireEvent.click(submitButton)
      
      expect(handleSubmit).toHaveBeenCalled()
    })

    it('should have proper form attributes', () => {
      render(
        <Input
          form="test-form"
          formAction="/submit"
          formMethod="post"
          placeholder="Form attributes"
        />
      )
      
      const input = screen.getByPlaceholderText('Form attributes')
      expect(input).toHaveAttribute('form', 'test-form')
      expect(input).toHaveAttribute('formAction', '/submit')
      expect(input).toHaveAttribute('formMethod', 'post')
    })
  })
}) 
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

describe('Button', () => {
  describe('Rendering', () => {
    it('should render button with default variant', () => {
      render(<Button>Click me</Button>)
      
      const button = screen.getByRole('button', { name: 'Click me' })
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('inline-flex', 'items-center', 'justify-center')
    })

    it('should render button with different variants', () => {
      const { rerender } = render(<Button variant="destructive">Delete</Button>)
      
      let button = screen.getByRole('button', { name: 'Delete' })
      expect(button).toHaveClass('bg-destructive', 'text-destructive-foreground')
      
      rerender(<Button variant="outline">Outline</Button>)
      button = screen.getByRole('button', { name: 'Outline' })
      expect(button).toHaveClass('border', 'border-input', 'bg-background')
      
      rerender(<Button variant="secondary">Secondary</Button>)
      button = screen.getByRole('button', { name: 'Secondary' })
      expect(button).toHaveClass('bg-secondary', 'text-secondary-foreground')
      
      rerender(<Button variant="ghost">Ghost</Button>)
      button = screen.getByRole('button', { name: 'Ghost' })
      expect(button).toHaveClass('hover:bg-accent', 'hover:text-accent-foreground')
      
      rerender(<Button variant="link">Link</Button>)
      button = screen.getByRole('button', { name: 'Link' })
      expect(button).toHaveClass('text-primary', 'underline-offset-4')
    })

    it('should render button with different sizes', () => {
      const { rerender } = render(<Button size="default">Default</Button>)
      
      let button = screen.getByRole('button', { name: 'Default' })
      expect(button).toHaveClass('h-10', 'px-4', 'py-2')
      
      rerender(<Button size="sm">Small</Button>)
      button = screen.getByRole('button', { name: 'Small' })
      expect(button).toHaveClass('h-9', 'rounded-md', 'px-3')
      
      rerender(<Button size="lg">Large</Button>)
      button = screen.getByRole('button', { name: 'Large' })
      expect(button).toHaveClass('h-11', 'rounded-md', 'px-8')
      
      rerender(<Button size="icon">Icon</Button>)
      button = screen.getByRole('button', { name: 'Icon' })
      expect(button).toHaveClass('h-10', 'w-10')
    })

    it('should render disabled button', () => {
      render(<Button disabled>Disabled</Button>)
      
      const button = screen.getByRole('button', { name: 'Disabled' })
      expect(button).toBeDisabled()
      expect(button).toHaveClass('pointer-events-none', 'opacity-50')
    })

    it('should render button with custom className', () => {
      render(<Button className="custom-class">Custom</Button>)
      
      const button = screen.getByRole('button', { name: 'Custom' })
      expect(button).toHaveClass('custom-class')
    })

    it('should render button with asChild prop', () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      )
      
      const link = screen.getByRole('link', { name: 'Link Button' })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/test')
    })
  })

  describe('Interaction', () => {
    it('should handle click events', async () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Click me</Button>)
      
      const button = screen.getByRole('button', { name: 'Click me' })
      await userEvent.click(button)
      
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should not handle click events when disabled', async () => {
      const handleClick = jest.fn()
      render(<Button disabled onClick={handleClick}>Disabled</Button>)
      
      const button = screen.getByRole('button', { name: 'Disabled' })
      await userEvent.click(button)
      
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('should handle keyboard events', async () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Keyboard</Button>)
      
      const button = screen.getByRole('button', { name: 'Keyboard' })
      button.focus()
      
      await userEvent.keyboard('{Enter}')
      expect(handleClick).toHaveBeenCalledTimes(1)
      
      await userEvent.keyboard(' ')
      expect(handleClick).toHaveBeenCalledTimes(2)
    })

    it('should handle focus and blur events', () => {
      const handleFocus = jest.fn()
      const handleBlur = jest.fn()
      
      render(
        <Button onFocus={handleFocus} onBlur={handleBlur}>
          Focus Test
        </Button>
      )
      
      const button = screen.getByRole('button', { name: 'Focus Test' })
      
      fireEvent.focus(button)
      expect(handleFocus).toHaveBeenCalledTimes(1)
      
      fireEvent.blur(button)
      expect(handleBlur).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(
        <Button aria-label="Custom label" aria-describedby="description">
          Button
        </Button>
      )
      
      const button = screen.getByRole('button', { name: 'Custom label' })
      expect(button).toHaveAttribute('aria-describedby', 'description')
    })

    it('should support ref forwarding', () => {
      const ref = React.createRef<HTMLButtonElement>()
      render(<Button ref={ref}>Ref Test</Button>)
      
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })

    it('should have proper button type', () => {
      render(<Button type="submit">Submit</Button>)
      
      const button = screen.getByRole('button', { name: 'Submit' })
      expect(button).toHaveAttribute('type', 'submit')
    })
  })

  describe('Styling', () => {
    it('should apply focus styles', () => {
      render(<Button>Focus</Button>)
      
      const button = screen.getByRole('button', { name: 'Focus' })
      expect(button).toHaveClass('focus-visible:outline-none', 'focus-visible:ring-2')
    })

    it('should apply hover styles', () => {
      render(<Button>Hover</Button>)
      
      const button = screen.getByRole('button', { name: 'Hover' })
      expect(button).toHaveClass('hover:bg-primary/90')
    })

    it('should apply disabled styles', () => {
      render(<Button disabled>Disabled</Button>)
      
      const button = screen.getByRole('button', { name: 'Disabled' })
      expect(button).toHaveClass('pointer-events-none', 'opacity-50')
    })
  })

  describe('Children', () => {
    it('should render text children', () => {
      render(<Button>Simple text</Button>)
      
      expect(screen.getByRole('button', { name: 'Simple text' })).toBeInTheDocument()
    })

    it('should render complex children', () => {
      render(
        <Button>
          <span>Icon</span>
          <span>Text</span>
        </Button>
      )
      
      const button = screen.getByRole('button')
      expect(button).toHaveTextContent('IconText')
    })

    it('should render empty children', () => {
      render(<Button></Button>)
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('')
    })
  })
}) 
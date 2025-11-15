# Testes Unitários - Frontend Remediar

Este documento descreve os testes implementados para o frontend da aplicação Remediar.

## Estrutura dos Testes

### Testes Unitários

Os testes unitários estão localizados em `src/__tests__/` e seguem a estrutura:

```
src/__tests__/
├── contexts/
│   └── AuthContext.test.tsx
├── app/
│   └── login/
│       └── page.test.tsx
└── components/
    └── ui/
        ├── Button.test.tsx
        └── Input.test.tsx
```

### Testes Implementados

#### 1. AuthContext.test.tsx
**Localização**: `contexts/AuthContext.test.tsx`

**Funcionalidades testadas**:
- Estado inicial do contexto
- Login com credenciais válidas
- Login com credenciais inválidas
- Logout
- Verificação de código
- Verificação de status de usuário
- Reenvio de código

**Cobertura**:
- Gerenciamento de estado
- Interação com API
- Tratamento de erros
- Persistência de dados (localStorage)
- Decodificação de JWT

#### 2. LoginPage.test.tsx
**Localização**: `app/login/page.test.tsx`

**Funcionalidades testadas**:
- Renderização do formulário
- Interação com inputs
- Toggle de visibilidade da senha
- Submissão do formulário
- Estados de loading
- Tratamento de erros
- Navegação

**Cobertura**:
- Componentes de UI
- Hooks personalizados
- Integração com contexto
- Validação de formulário
- Acessibilidade

#### 3. Button.test.tsx
**Localização**: `components/ui/Button.test.tsx`

**Funcionalidades testadas**:
- Renderização com diferentes variantes
- Renderização com diferentes tamanhos
- Estados disabled/enabled
- Eventos de clique
- Eventos de teclado
- Acessibilidade
- Ref forwarding

**Cobertura**:
- Props e variantes
- Interações do usuário
- Estilos CSS
- Acessibilidade (ARIA)

#### 4. Input.test.tsx
**Localização**: `components/ui/Input.test.tsx`

**Funcionalidades testadas**:
- Renderização com diferentes tipos
- Estados disabled/readonly
- Eventos de mudança
- Eventos de foco/blur
- Validação de formulário
- Acessibilidade
- Integração com formulários

**Cobertura**:
- Props e tipos
- Interações do usuário
- Validação
- Acessibilidade

## Como Executar os Testes

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Dependências instaladas

### Instalar Dependências
```bash
cd Codigo/front-remediar
npm install
```

### Executar Todos os Testes
```bash
npm test
```

### Executar Testes em Modo Watch
```bash
npm run test:watch
```

### Executar Testes com Cobertura
```bash
npm run test:coverage
```

### Executar Testes Específicos
```bash
# Executar teste específico
npm test -- AuthContext.test.tsx

# Executar testes que correspondem a um padrão
npm test -- --testNamePattern="login"

# Executar testes de um diretório específico
npm test -- contexts/
```

### Executar em Modo Debug
```bash
# Executar com logs detalhados
npm test -- --verbose

# Executar com debugger
npm test -- --runInBand --detectOpenHandles
```

## Configuração de Teste

### Jest Configuration
O Jest está configurado em `jest.config.js` com:
- Suporte a TypeScript
- Mapeamento de módulos (@/ alias)
- Configuração para Next.js
- Ambiente jsdom
- Cobertura de código

### Setup de Teste
O arquivo `jest.setup.js` configura:
- Mocks para Next.js (router, Image, Link)
- Mocks para localStorage
- Mocks para APIs do navegador
- Configurações globais

### Mocks Implementados

#### Next.js
```javascript
// Router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    // ...
  })
}))

// Image component
jest.mock('next/image', () => ({
  default: (props) => <img {...props} />
}))
```

#### APIs
```javascript
// localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock
```

## Padrões de Teste

### Nomenclatura
- Arquivos: `{ComponentName}.test.tsx`
- Describes: `{ComponentName}`
- Tests: `should {behavior} when {condition}`

### Estrutura AAA (Arrange, Act, Assert)
```typescript
describe('Component', () => {
  it('should do something when condition is met', () => {
    // Arrange - Preparar dados e mocks
    const mockFunction = jest.fn()
    render(<Component onAction={mockFunction} />)
    
    // Act - Executar ação
    fireEvent.click(screen.getByRole('button'))
    
    // Assert - Verificar resultado
    expect(mockFunction).toHaveBeenCalled()
  })
})
```

### Renderização de Teste
```typescript
// Renderização simples
render(<Component />)

// Renderização com providers
render(
  <AuthProvider>
    <Component />
  </AuthProvider>
)

// Renderização customizada
const renderWithAuth = (component: React.ReactElement) => {
  return render(<AuthProvider>{component}</AuthProvider>)
}
```

### Mocks
```typescript
// Mock de módulo
jest.mock('@/services/api/api', () => ({
  api: {
    post: jest.fn(),
    get: jest.fn(),
  },
}))

// Mock de função
const mockLogin = jest.fn()
jest.spyOn(require('@/contexts/AuthContext'), 'useAuth')
  .mockReturnValue({ login: mockLogin })
```

### Assertions
```typescript
// Verificar presença de elemento
expect(screen.getByText('Login')).toBeInTheDocument()

// Verificar atributos
expect(button).toHaveAttribute('type', 'submit')

// Verificar classes CSS
expect(element).toHaveClass('custom-class')

// Verificar chamadas de função
expect(mockFunction).toHaveBeenCalledWith('expected-arg')

// Verificar estado
expect(screen.getByTestId('loading')).toHaveTextContent('Loading')
```

## Cobertura de Testes

### Métricas Alvo
- **Cobertura de Linhas**: 80%+
- **Cobertura de Branches**: 70%+
- **Cobertura de Funções**: 90%+

### Relatórios
Os relatórios de cobertura são gerados em:
- `coverage/lcov-report/index.html`
- Console durante execução

### Configuração de Cobertura
```javascript
// jest.config.js
collectCoverageFrom: [
  'src/**/*.{js,jsx,ts,tsx}',
  '!src/**/*.d.ts',
  '!src/**/*.stories.{js,jsx,ts,tsx}',
],
coverageThreshold: {
  global: {
    branches: 70,
    functions: 70,
    lines: 70,
    statements: 70,
  },
},
```

## Boas Práticas

### 1. Isolamento
- Cada teste deve ser independente
- Limpar mocks entre testes
- Usar `beforeEach` para setup

### 2. Nomes Descritivos
- Descrever comportamento esperado
- Incluir condição quando relevante
- Usar linguagem clara

### 3. Dados de Teste
- Usar dados realistas
- Evitar dados hardcoded
- Usar factories quando apropriado

### 4. Mocks
- Mock apenas dependências externas
- Verificar interações importantes
- Usar mocks apropriados

### 5. Assertions
- Uma assertion por teste quando possível
- Verificar comportamento, não implementação
- Usar assertions específicas

### 6. Acessibilidade
- Testar atributos ARIA
- Verificar navegação por teclado
- Testar leitores de tela

## Troubleshooting

### Problemas Comuns

#### 1. Testes Falhando por Mocks
```bash
# Limpar cache do Jest
npm test -- --clearCache
```

#### 2. Timeout em Testes
```bash
# Aumentar timeout
npm test -- --testTimeout=10000
```

#### 3. Problemas de Módulos
```bash
# Verificar configuração de módulos
npm test -- --verbose
```

### Logs de Debug
```bash
# Habilitar logs detalhados
npm test -- --verbose --detectOpenHandles
```

## Próximos Passos

### Testes Pendentes
- [ ] Testes para todos os componentes
- [ ] Testes para todas as páginas
- [ ] Testes de hooks personalizados
- [ ] Testes de utilitários
- [ ] Testes de validação

### Melhorias
- [ ] Adicionar testes E2E com Playwright
- [ ] Implementar testes de performance
- [ ] Adicionar testes de acessibilidade
- [ ] Configurar CI/CD para testes

## Contribuição

Para adicionar novos testes:

1. Seguir a estrutura de nomenclatura
2. Usar padrão AAA
3. Adicionar documentação
4. Manter cobertura alta
5. Executar todos os testes antes do commit
6. Testar acessibilidade 
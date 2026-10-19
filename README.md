# 🌟 Stellar Social Wallet

Un SDK innovador que permite a los usuarios crear carteras de Stellar utilizando métodos de autenticación social como Google, Facebook, número de teléfono o wallets crypto existentes.

## 🚀 Características Principales

- **Autenticación Social**: Login con Google, Facebook, y número de teléfono
- **Integración Crypto**: Conexión con Freighter wallet
- **Generación Determinística**: Creación automática de keypairs de Stellar basados en métodos de auth social
- **Smart Contracts**: Contratos inteligentes Soroban para gestión de cuentas sociales
- **Demo Interactiva**: Aplicación Next.js que demuestra todas las funcionalidades

## 📦 Estructura del Proyecto

```
stellar-social-wallet/
├── stellar-social-sdk/     # 📱 SDK principal en TypeScript
├── demo-app/              # 🎨 Aplicación demo en Next.js
└── contracts/             # 📜 Smart contracts en Soroban (Rust)
```

## 🎯 Demo App

La aplicación demo en `demo-app/` es una **aplicación Next.js completamente funcional** que muestra:

### ✨ Funcionalidades Implementadas

- **Login Social Múltiple**:
  - 📧 Autenticación con Google
  - 📘 Autenticación con Facebook (mock para MVP)
  - 📱 Verificación por número de teléfono (código demo: `123456`)
  - 🦊 Conexión con Freighter wallet

- **Gestión de Cuenta**:
  - 🔑 Visualización de dirección Stellar
  - 💰 Consulta de balances en tiempo real
  - 📋 Lista de métodos de autenticación activos

- **Transacciones**:
  - 💸 Envío de pagos de prueba
  - 🔐 Adición de nuevos métodos de auth (demo passkeys)

### 🖼️ Interfaz de Usuario

- **Diseño Moderno**: Interfaz glassmorphism con gradientes
- **Responsive**: Adaptable a dispositivos móviles y desktop
- **Notificaciones**: Sistema de toast para feedback en tiempo real
- **Loading States**: Indicadores de carga para mejor UX

## 🛠️ SDK Características

El `stellar-social-sdk` proporciona:

### 🔐 Métodos de Autenticación
```typescript
// Autenticación con Google
const result = await sdk.authenticateWithGoogle();

// Autenticación con teléfono
const result = await sdk.authenticateWithPhone({
  phoneNumber: '+1234567890',
  verificationCode: '123456'
});

// Conexión con Freighter
const result = await sdk.connectFreighter();
```

### 💳 Gestión de Cuentas
```typescript
// Obtener balance
const balances = await account.getBalance();

// Enviar pago
const hash = await account.sendPayment(
  destinationAddress,
  amount,
  assetCode,
  memo
);

// Agregar método de auth
await account.addAuthMethod(newAuthMethod);
```

### 🔑 Generación Determinística
- Genera keypairs únicos basados en el método de autenticación
- Permite recuperación de cuenta con el mismo método social
- Compatibilidad completa con el ecosistema Stellar

## 🚀 Inicio Rápido

### Prerequisitos
- Node.js 18+
- npm o yarn
- Stellar CLI (para contratos)

### 1. Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd stellar-social-wallet

# Instalar dependencias del SDK
cd stellar-social-sdk
npm install
npm run build

# Instalar dependencias de la demo
cd ../demo-app
npm install
```

### 2. Ejecutar Demo App

```bash
cd demo-app
npm run dev
```

Visita `http://localhost:3000` para ver la aplicación funcionando.

### 3. Desarrollar con el SDK

```bash
cd stellar-social-sdk
npm run dev  # Modo watch para desarrollo
```

## 🔧 Configuración

### SDK Configuration
```typescript
const sdk = new StellarSocialSDK({
  contractId: 'YOUR_CONTRACT_ID',
  network: 'testnet', // o 'mainnet'
  googleClientId: 'YOUR_GOOGLE_CLIENT_ID', // opcional
  horizonUrl: 'https://horizon-testnet.stellar.org' // opcional
});
```

### Variables de Entorno (Demo App)
Crea un archivo `.env.local` en `demo-app/`:
```env
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_CONTRACT_ID=your_contract_id
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

## 🏗️ Smart Contracts

Los contratos Soroban en `contracts/social-account/` manejan:

- **Inicialización de Cuentas**: Setup inicial de cuentas sociales
- **Gestión de Auth Methods**: Agregar/remover métodos de autenticación
- **Recuperación**: Sistema de recuperación de cuentas
- **Transacciones**: Validación y ejecución de operaciones

### Comandos de Contratos
```bash
cd contracts/social-account/contracts/social-wallet

# Compilar contrato
make build

# Ejecutar tests
make test

# Formatear código
make fmt
```

## 🌐 Red y Testing

### Testnet
- La aplicación está configurada para usar **Stellar Testnet**
- Las cuentas nuevas se fondean automáticamente via Friendbot
- Contract ID de prueba incluido

### Testing de Autenticación
- **Google**: Requiere configuración de OAuth real
- **Facebook**: Implementación mock para MVP
- **Teléfono**: Código de verificación fijo: `123456`
- **Freighter**: Requiere extensión instalada

## 📚 API Reference

### StellarSocialSDK
```typescript
class StellarSocialSDK {
  constructor(config: SocialAuthConfig)
  async initialize(): Promise<void>
  async authenticateWithGoogle(): Promise<AuthResult>
  async authenticateWithFacebook(): Promise<AuthResult>
  async authenticateWithPhone(verification: PhoneVerification): Promise<AuthResult>
  async connectFreighter(): Promise<AuthResult>
}
```

### StellarSocialAccount
```typescript
class StellarSocialAccount {
  publicKey: string
  authMethods: AuthMethod[]
  
  async getBalance(): Promise<Balance[]>
  async sendPayment(destination: string, amount: string, asset?: string, memo?: string): Promise<string>
  async addAuthMethod(method: AuthMethod): Promise<void>
  async removeAuthMethod(methodId: string): Promise<void>
}
```

## 🎯 Casos de Uso

- **Onboarding Web3**: Entrada fácil para usuarios no-crypto
- **DApps Sociales**: Aplicaciones que necesitan auth social + blockchain
- **Wallets Multi-Auth**: Carteras con múltiples métodos de acceso
- **Recuperación de Cuentas**: Sistema robusto de recuperación social

## 🔜 Roadmap

- [ ] Implementación real de Facebook Auth
- [ ] Soporte para más providers (Twitter, Discord, etc.)
- [ ] Autenticación biométrica/passkeys
- [ ] Multisig social recovery
- [ ] Integración con más wallets
- [ ] Mainnet deployment

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🆘 Soporte

- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Documentación**: Ver `CLAUDE.md` para guías de desarrollo
- **Stellar Docs**: [Soroban Documentation](https://soroban.stellar.org/)

---

**Construido con ❤️ para el ecosistema Stellar**
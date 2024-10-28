# next-firebase-auth

**next-firebase-auth** é um projeto de exemplo que demonstra a implementação de autenticação com Firebase em **Next.js**, utilizando uma interface estilosa feita com **shadcn** e validação de formulários com **Zod**.

## ✨ Funcionalidades

- 🔒 **Autenticação com Firebase**:
    - 📨 Login com **E-mail e Senha**
    - 🌐 Login com **Google**
- ✍️ **Cadastro de Novo Usuário**
- 🔄 **Solicitação de Troca de Senha**
- 🔑 **Página de Redefinição de Senha**
- 🎨 Interface de usuário estilizada com **[shadcn](https://ui.shadcn.com/)**
- ✅ Validação de formulários com **[Zod](https://zod.dev/)**


## Pré-requisitos

Para rodar este projeto, é necessário configurar o Firebase e habilitar os métodos de autenticação. Consulte a [documentação do Firebase Auth](https://firebase.google.com/docs/auth?hl=pt-br) para mais detalhes.

### 🛠️ Passo a Passo para Configurar o Firebase

1. Acesse o [console do Firebase](https://console.firebase.google.com/).
2. Crie um novo projeto ou selecione um projeto existente.
3. Vá até **Authentication** > **Método de login**.
4. Ative os provedores de:
    - **E-mail/Senha**
    - **Google**
5. Siga as instruções para configurar cada provedor.

### 🔧 Configuração do Firebase no Projeto

Após configurar os métodos de autenticação no console do Firebase, crie um arquivo `.env.local` na raiz do projeto com as variáveis de ambiente para conectar seu projeto ao Firebase.

1. No seu projeto Firebase, acesse **Configurações do projeto** > **Configurações gerais**.
2. Copie as credenciais de configuração do Firebase.
3. No diretório raiz do projeto, crie um arquivo `.env.local` e adicione as variáveis:

```plaintext
NEXT_PUBLIC_FIREBASE_API_KEY=SUAS_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=SEU_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=SEU_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=SEU_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=SEU_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=SEU_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=SEU_MEASUREMENT_ID
```

### 📝 Configuração do Firebase no Código
Aqui está a configuração do Firebase utilizada no código do projeto:

```typescript

// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

Certifique-se de preencher o arquivo .env.local com as informações corretas do seu projeto Firebase.

### ▶️ Executando o Projeto
Para iniciar o projeto, basta executar:

```typescript
npm install
npm run dev
```

Acesse o projeto em http://localhost:3000 para ver o exemplo de autenticação Firebase em ação.

Sinta-se à vontade para personalizar o projeto e explorar as funcionalidades de autenticação do Firebase Auth com Next.js!
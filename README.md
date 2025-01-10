# SmartSE - Repositório com Backend (Node.js/Express/Socket.IO) e Frontend (Next.js 15)

Este repositório contém dois projetos principais:
- **Backend**: Um servidor Node.js utilizando Express e Socket.IO, localizado na pasta `backend`.
- **Frontend**: Uma aplicação Next.js 15, localizada na pasta `smartse`.

## **Requisitos**
Certifique-se de ter instalado em sua máquina:
- Node.js (v16 ou superior)
- npm ou pnpm (gerenciador de pacotes)
- Git

---

## **1. Clonar o Repositório**

Clone o repositório para sua máquina local:

```bash
git clone https://github.com/MatheusSRMO/smartsesistemas.git
cd smartsesistemas
```

---

## **2. Configurar o Backend**

1. Navegue até a pasta `backend`:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```
   ou, se estiver usando `pnpm`:
   ```bash
   pnpm install
   ```

3. Inicie o servidor:
   ```bash
   node index.js
   ```

4. Verifique se o servidor está rodando em [http://localhost:3005](http://localhost:3005).

---

## **3. Configurar o Frontend**

1. Navegue até a pasta `smartse`:
   ```bash
   cd ../smartse
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```
   ou, se estiver usando `pnpm`:
   ```bash
   pnpm install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env.local` na pasta `smartse` com as seguintes configurações:
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:3000
     AUTH_SECRET="super secret" 

    TUCANO_CLOUD_SECRET="t_cloud_xxx"
    TUCANO_CLOUD_PROJECT_ID="xxx"

    API_URL="https://api.smartse.tucano.app/"

     ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

5. Acesse o frontend em [http://localhost:3000](http://localhost:3000).

# testeFrontOnFly

## Stack

- Vue 3 + TypeScript
- Vite
- Quasar V2
- Sass (SCSS)
- BEM para nomenclatura CSS


## Como rodar o projeto localmente

1. Clone o repositório:
   ```sh
   git clone <url-do-repo>
   cd testeFrontOnFly
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```

3. Rode o frontend:
   ```sh
   npm run dev
   ```

4. Rode o backend fake (JSON Server) em outro terminal:
   ```sh
   npm run json-server
   ```
   O JSON Server ficará disponível em http://localhost:3000.

5. Acesse o frontend em http://localhost:5173 (ou porta indicada pelo Vite).

> Para o projeto funcionar corretamente, é necessário rodar ambos os comandos (dev e json-server) ao mesmo tempo.

---

Se quiser rodar os testes:
```sh
npm run test:unit
```


## Arquitetura

```text
src/
  assets/
    styles/           # Tokens, mixins e estilos globais
  components/
    hotel/            # HotelCard, HotelDetailsDrawer e estilos
    search/           # SearchDestinationField, SearchFiltersBar e estilos
  layouts/            # Layouts base
  pages/              # HomePage, AboutView, etc.
  plugins/            # Configurações de plugins (ex: Quasar)
  router/             # Rotas da aplicação
  stores/             # Pinia stores (ex: counter)
  views/              # Views principais
  main.ts             # Entry point
  payload.json        # Dados mockados para o JSON Server
```

## Comandos

```sh
npm install
npm run dev
npm run build
npm run json-server
npm run test:unit
```

### Executando os testes unitários

- Rode `npm run test:unit` para executar o Vitest uma vez.
- Use `npm run test:unit -- --watch` caso queira manter o runner observando alterações.
- Os specs ficam em `src/tests/**` e já cobrem os services (`CityService`, `HotelService`) com mocks do `JsonServerClient`.

## Padroes de design

### Cores

- primary-100: #009EFB
- primary-200: #007DC7
- success-100: #00835C
- info-100: #ADADB3
- info-200: #84858C
- info-300: #84858C
- info-400: #696A71
- info-500: #58585F
- info-600: #434347

### Regras visuais

- Container: tamanho maximo de 1200px
- Espacamento: utilizar multiplos de 4
- Arredondamento: utilizar multiplos de 4
- Fonte: Poppins
- Tamanho da fonte padrao: 12px
- Tamanho dos titulos: 16px

# testeFrontOnFly

## Stack

- Vue 3 + TypeScript
- Vite
- Quasar V2
- Sass (SCSS)
- BEM para nomenclatura CSS

## Arquitetura

```text
src/
  assets/
    styles/
  layouts/
  pages/
  plugins/
  router/
  main.ts
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

## Continuação do modulo 8

Aqui vamos converter a aplicação desenvolvida no módulo 7 baseada em componente criados com classe para 'react hooks'

- Inicialmente adicionamos sua dependência para o eslint

  > yarn add eslint-plugin-react-hooks -D

- Configuramos o arquivo 'eslintrc'

```js
plugins: ['react', 'prettier', 'react-hooks'],

// E na rules
'react-hooks/rules-of-hooks': 'error',
'react-hooks/exhaustive-deps': 'warn',

```

## Hooks com Redux

### useSelector

- Com este hook conseguimos capturar o estado da variavel passada pelo redux
- Utilizamos 'useSelector' ao inves do 'connect' para buscar o estado de uma variavel
- Ele recebe um estado inteiro e com isso podemos selecionar as informações que queremos daquele estado

```js
const amount = useSelector(state =>
  state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {})
);
```

### useDispatch

- Com este hook conseguimos disparar 'actions' para o redux

```js
const dispatch = useDispatch();
/////
dispatch(CartActions.addToCartRequest(id));
```

# Rascunho para estudo/lembrete

## Estrutura do projeto

1. Iniciamos o projeto
   > npx create-react-app introducao_redux
2. Rodamos a aplicação
   > yarn start

### Configuramos o ESlint, Prettier e EditorConfig

### EditorConfig

- Primeria adicionamos a extensão 'EditorConfig' no programa que estamo usando
- Na raiz do projeto clicamos com o botão direito e selecionamos a opção 'Generate .editorconfig' e modificamos as opções 'false' para 'true'. O arquivo ficará da seguinte forma:

```
root = true

[*]
end_of_line = lf
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

### ESLint e Prettier

- ESLint: procura por erros
- Prettier: deixa o código mais 'bonito'

1. Adicionamos o 'eslint' como depedência de desenvolvimento
   > yarn add eslint -D
2. Inicializamos o arquivo de configuração do eslint
   > yarn eslint --init
3. Selecionamos as seguintes opções que vão aparecer no terminal
   3.1. How would you like to use ESLint?
   To check syntax only
   To check syntax and find problems
   ❯ To check syntax, find problems, and enforce code style

   3.2. What type of modules does your project use? (Use arrow keys)
   ❯ JavaScript modules (import/export)
   CommonJS (require/exports)
   None of these

   3.3. Which framework does your project u
   se? (Use arrow keys)
   ❯ React
   Vue.js
   None of these

   3.4. Where does your code run?
   ❯ ◉ Browser
   ◯ Node

   3.5. How would you like to define a style for your project?
   (Use arrow keys)
   ❯ Use a popular style guide
   Answer questions about your style
   Inspect your JavaScript file(s)

   3.6. Which style guide do you want to follow? (Use arrow keys)
   ❯ Airbnb (https://github.com/airbnb/javascript)
   Standard (https://github.com/standard/standard)
   Google (https://github.com/google/eslint-config-google)

   3.7. What format do you want your config file to be in? (Use arrow keys)
   ❯ JavaScript
   YAML
   JSON

4. A instalação é feita por padrão utilizando o 'npm', o que gerav um arquivo 'package-lock.json', mas como estamos trabalhando com o yarn,removemos este arquivo e rodamos o yarn para realizar o mapeamento das novas dependencias no 'yarn.lock'

   > yarn

5. Instalamos a extenção ESlint na IDE

6. Adicionamos as bibliotecas para integração do ESlint com o Prettier

   > yarn add prettier eslint-config-prettier eslint-plugin-prettier babel-eslint -D

7. Configuramos o arquivo '.eslintrc.js'

```js
module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.js'] }],
    'import/prefer-default-export': 'off',
  },
};
```

8. Criamos um arquivo '.prettierrc' para resolver problema de regras duplicadas entre o ESlint e o Prettier na raiz do projeto

```
{
  "singleQuote": true,
  "trailingComma": "es5"
}
```

9. No arquivo 'settings.json' do VSCode inserimos as configurações abaixo

```
"eslint.autoFixOnSave": true,
"eslint.validate": [
  {
    "language": "javascript",
    "autoFix": true
  },
  {
    "language": "javascriptreact",
    "autoFix": true
  }
],
```

10. Dá um fix em todos os arquivos '.js' na pasta 'src'
    > yarn eslint --fix src --ext .js

## Configurando API

- Utilizamos um serviço chamado 'json-server', que cria uma Api fake utilizando passando dados em json para ela. E consumimos estes dados para simular a aplicação

1. Salvamos o arquivo 'json' com os dados em 'server.json'
2. Rodamos o 'json-server'
   > npx json-server server.json -p 3333

## Configurando o Redux

1. Instalamos o pacote e sua integração com o react
   > yarn add redux react-redux
2. Em 'src' criamos uma pasta 'store', onde ficaram todos os arquivos relacionados ao redux
3. Dentro, criamos um arquivo 'index.js' para configuração inicial

```js
import { createStore } from 'redux';

/**
 * Criamos o reducer 'cart', inicialmente vazio
 * e passamos como parametro para o store, que não pode
 * ser criado sem nenhum reducer
 */
function cart() {
  return [];
}

const store = createStore(cart);

export default store;
```

4. Em 'App.js' importamos o 'react-redux', e sua função 'Provider', que vai deixar disponivel o 'store' (estado global) disponivel para todos os componentes

```js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import GlobalStyle from './styles/global';
import Header from './components/Header';
import Routes from './routes';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes />
        <GlobalStyle />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
```

## Notas de lembrete sobe algumas propriedades do redux

```js

/**
 * A partir do momento que tivermos novos reducers
 * adicionamos neste arquivo, que vai combinar todos os reducers
 * em um unico reducer
 */
export default combineReducers({
  cart,
});

======================================================

/* Todo componente que a gente conecta com redux recebe
   * uma propriedade chamada 'dispatch', que serve basicamente
   * para dispararmos uma action ao redux
   * */
  handleAddProduct = product => {
    const { dispatch } = this.props;

    dispatch({
      type: 'ADD_TO_CART',
      product,
    });
  };

  ==============================

  /**
 * O connect pode receber alguns paramentros
 * - O primeiro é uma função que recebe um estado, que é o
 * estado inteiro do reducer, que retorna as informações que
 * requemos acessar dentro do componente
 */

export default connect(state => ({
  cartSize: state.cart.length,
}))(Header);

==================================



/**
 * Toda vez que realizamos um dispatch dentro de um componente
 * todos os reduces da aplicação são chamados, por isso criamos
 * o switch abaixo, para que a action 'ADD_TO_CART', por exemplo
 * seja ouvida somente pelo reducer 'cart'
 */

/**
 * Todo reducer recebe por padrão uma variavel 'state'
 * e outra 'action'
 * - A 'action' é exatamente a action que disparamos do produto, por
 * exemplo, 'ADD_TO_CART'
 * - O 'state' é o state anterior a nossa atual alteração, por exemplo,
 * antes de adicionar um produto ao carrinho, o state é o array vazio
 */
export default function cart(state = [], action) {
  // console.log(state);
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.product];

    /**
     * Se chegar outra action que não seja o 'ADD_TO_CART'
     * este reducer deixa o estado na maneira que esta
     */
    default:
      return state;
  }
}

```

## Reactotron + Flux

1. Adiciona a dependencia do reactotron e de sua integração com o redux
   > yarn add reactotron-react-js reactotron-redux
2. Criamos uma pasta 'config' e dentro dela e o arquivo 'ReactotronConfig.js'

```js
import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';

if (process.env.NODE_ENV === 'development') {
  const tron = Reactotron.configure()
    .use(reactotronRedux())
    .connect();

  tron.clear();

  console.tron = tron;
}
```

3. Adicionamos às regras no arquivo '.eslintrc'

```js
'no-console': ['error', { allow: ['tron'] }]
```

- A partir dai podemos utilizar 'console.tron.log()' para utilizar o reactotron, mas a parte do redux ainda não esta integrada.

4. Para fazer isso no arquivo 'index' na pasta store adicionamos mais algumasa configurações, onde verificarmos se estamos em ambiente ou não e armazenamos na constante 'enhancer', passando ela como parametro no 'createStore'

```js
import { createStore } from 'redux';

import rootReducer from './modules/rootReducer';

// Verificamos se estamos em ambiente de desenvolvimento
const enhancer =
  process.env.NODE_ENV === 'development' ? console.tron.createEnhancer() : null;

const store = createStore(rootReducer, enhancer);

export default store;
```

5. E importamos essa configuração do reactotron no 'App.js'. É IMPORTANTE QUE ESSA IMPORTAÇÃO VENHA ANTES DA IMPORTAÇÃO DO 'STORE'

```js
import './config/ReactotronConfig';
```

## Produto duplicado no carrinho

- Utilizamos o 'immer' para trabalhar com o estado
  > yarn add immer
- Essa biblioteca nos possibilita criar um rascunho (draft) do 'state' do reducer para podermos manipula-lo, o que não é possivel com o 'state' original por causa do conceito da imutabilidade

## Configurando Redux Saga

- Middleware: é basicamente um interceptador, assim como a gente tem no node, mas aqui ao invés de interceptar rotas, o middleware do redux consegue interceptar actions. Sempre que a gente dispara uma action, o middleware pode entrar em ação fazendo algum efeito colateral (side effect)
- Para utilizar esse conceito utilizamos o redux-saga
  > yarn add redux-saga
- Criamos um arquivo 'sagas.js' dentro de 'modules/cart' para configurar a parte do carrinho

```js
import { call, put, all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';

import { addToCartSuccess } from './actions';
/**
 * O '*' é uma funcionalidade do javascript que se chama
 * 'generator', seria como se a gente escrecesse
 * um 'async' na frente da função
 *  Aqui utilizamos o 'generator' pois ele é mais
 * 'potente' que o 'async/await'
 */
function* addToCart({ id }) {
  // 'yield' é como se fosse o 'await' do 'generator'
  // 'call' é responsavel por chamar metodos que são assincronos e que retornam promisses
  // 'put': método responsavel por disparar uma action
  const response = yield call(api.get, `/products/${id}`);

  yield put(addToCartSuccess(response.data));
}

/**
 * Ficamos ouvindo as 'actions' atraves do metodo 'takeLatest'
 *
 */

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
```

- Criamos um arquivo 'rootSaga.js', que junta todos os 'sagas' em um unico arquivo

```js
import { all } from 'redux-saga/effects';

import cart from './cart/sagas';

export default function* rootSaga() {
  return yield all([cart]);
}
```

## Reactotron + Saga

- Configurando o plugin do redux-saga pro reactotron

1. Adicionamos sua dependencia
   > yarn add reactotron-redux-saga
2. Importamos no 'ReactotronConfig' e chamamos com o 'use'

```js
import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';

if (process.env.NODE_ENV === 'development') {
  const tron = Reactotron.configure()
    .use(reactotronRedux())
    .use(reactotronSaga())
    .connect();

  tron.clear();

  console.tron = tron;
}
```

|
|
|
|
|
|
|
======================
Condigo para revisar e estudar

```js
import produce from 'immer';
/**
 * Toda vez que realizamos um dispatch dentro de um componente
 * todos os reduces da aplicação são chamados, por isso criamos
 * o switch abaixo, para que a action 'ADD_TO_CART', por exemplo
 * seja ouvida somente pelo reducer 'cart'
 */

/**
 * Todo reducer recebe por padrão uma variavel 'state'
 * e outra 'action'
 * - A 'action' é exatamente a action que disparamos do produto, por
 * exemplo, 'ADD_TO_CART'
 * - O 'state' é o state anterior a nossa atual alteração, por exemplo,
 * antes de adicionar um produto ao carrinho, o state é o array vazio
 */
export default function cart(state = [], action) {
  // console.log(state);
  switch (action.type) {
    case '@cart/ADD_SUCCESS':
      /*
      return [
        ...state,
        {
          ...action.product,
          amount: 1, // quantidade de cada produto no carrinho
        },
      ];
    */

      /**
       * Refazemos o return pois utilizaremos o 'immer'
       */
      /**
       * Recebemos um 'state' base e criamos um 'draft',
       * todas as alterações que nele fizermos, serão
       * refletidas no nosso estado
       *
       */
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.product.id);
        /**
         * Se já existir o produto quando formos adiciona-los,
         * somamos mais um a sua quantidade, evitando assim, a duplicidade do mesmo no carrinho
         */
        if (productIndex >= 0) {
          draft[productIndex].amount += 1;
        } else {
          draft.push({
            ...action.product,
            amount: 1,
          });
        }
      });

    case '@cart/REMOVE':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });

    case '@cart/UPDATE_AMOUNT': {
      if (action.amount <= 0) {
        return state;
      }

      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          draft[productIndex].amount = Number(action.amount);
        }
      });
    }
    default:
      return state;
  }
}
```

===========================

```js
import { call, put, all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';

import { addToCartSuccess } from './actions';
/**
 * O '*' é uma funcionalidade do javascript que se chama
 * 'generator', seria como se a gente escrecesse
 * um 'async' na frente da função
 *  Aqui utilizamos o 'generator' pois ele é mais
 * 'potente' que o 'async/await'
 */
function* addToCart({ id }) {
  // 'yield' é como se fosse o 'await' do 'generator'
  // 'call' é responsavel por chamar metodos que são assincronos e que retornam promisses
  // 'put': método responsavel por disparar uma action
  const response = yield call(api.get, `/products/${id}`);

  yield put(addToCartSuccess(response.data));
}

/**
 * Ficamos ouvindo as 'actions' atraves do metodo 'takeLatest'
 *
 */

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
```

## React Toastify

- Utilizado para exibir mensagem ao usuario

  > yarn add react-toastify

- Importamos no 'App.js' e, o utilizamos como componente

```js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import './config/ReactotronConfig';
import GlobalStyle from './styles/global';
import Header from './components/Header';
import Routes from './routes';

import store from './store';

function App() {
  return (
    /**
     * Importamos o 'BrowserRouter' aqui, pois o 'Header' vai precisar
     * ter acesso as propriedades para realizar a navegação
     */
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes />
        <GlobalStyle />
        <ToastContainer autoClose={3000} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
```

- Importamos no 'global.js'

```js
import 'react-toastify/dist/ReactToastify.css';
```

- A partir dai já podemos exibir as mensagens em tela
- Importamos o 'toast'

```js
import { toast } from 'react-toastify';
```

- E chamamos o metodo error, por exemplo

```js
toast.error('Quantidade solicitada fora de estoque');
```

## Navegando no saga

- Quando precisarmos realizar uma navegação do usuario depois de uma chamada do sagar finalizar, precisamos fazer essa navegacao dentro do proprio saga e não dentro do componente
- Para fazer isso utilizamos o 'history'
  > yarn add history
- Dentro de 'services' criamos um arquivo chamado 'history.js'

```js
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export default history;
```

- Configuramos 'App.js'

```js
import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import './config/ReactotronConfig';
import GlobalStyle from './styles/global';
import Header from './components/Header';
import Routes from './routes';

import history from './services/history'; // <----
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}> // <----
        <Header />
        <Routes />
        <GlobalStyle />
        <ToastContainer autoClose={3000} />
      </Router> // <----
    </Provider>
  );
}

export default App;

```

- E em 'sagas.js' importamos e, após adicionar o produto ao carrinho chamada a rota

```js
import history from '../../../services/history';
.
.
.
yield put(addToCartSuccess(data));
history.push('/cart');
```

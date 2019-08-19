import { combineReducers } from 'redux';

import cart from './cart/reducer';

/**
 * A partir do momento que tivermos novos reducers
 * adicionamos neste arquivo, que vai combinar todos os reducers
 * em um unico reducer
 */
export default combineReducers({
  cart,
});

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { MdShoppingBasket } from 'react-icons/md';

import { Container, Cart } from './styles';

import logo from '../../assets/images/logo.svg';

function Header({ cartSize }) {
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="RocketShoes" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span>{cartSize} itens</span>
        </div>
        <MdShoppingBasket size={36} color="#FFF" />
      </Cart>
    </Container>
  );
}

/**
 * O connect pode receber alguns paramentros
 * - O primeiro é uma função que recebe um estado, que é o
 * estado inteiro do reducer, que retorna as informações que
 * requemos acessar dentro do componente
 */

export default connect(state => ({
  cartSize: state.cart.length,
}))(Header);

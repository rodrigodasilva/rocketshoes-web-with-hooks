import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';

export default function Home() {
  // function Home({ amount, addToCartRequest }) {
  // Antiga implementação utilizando classe
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     products: [],
  //   };
  // }
  const [products, setProducts] = useState([]);
  const amount = useSelector(state =>
    state.cart.reduce((sumAmount, product) => {
      sumAmount[product.id] = product.amount;

      return sumAmount;
    }, {})
  );

  // ///////////////////////////////////////////////

  // Antiga implementação utilizando classe
  // async componentDidMount() {
  //   const response = await api.get('products');

  //   const data = response.data.map(product => ({
  //     ...product,
  //     priceFormatted: formatPrice(product.price),
  //   }));

  //   this.setState({ products: data });
  // }
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('products');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }

    loadProducts();
  }, []);
  // ///////////////////////////////////////////////

  // Aqui não precisamos usar 'useCallback' pois ela não depende
  // de outras variaves ou estados, ela precisa apenas do id que lhe é passado
  function handleAddProduct(id) {
    // const { addToCartRequest } = this.props; -----
    // addToCartRequest(id);------
    dispatch(CartActions.addToCartRequest(id));
  }

  // render() {
  //   const { products } = this.state;
  //   const { amount } = this.props;

  return (
    <ProductList>
      {products.map(product => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>

          <button
            type="button"
            // onClick={() => this.handleAddProduct(product.id)}
            onClick={() => handleAddProduct(product.id)}
          >
            <div>
              <MdAddShoppingCart size={16} color="#fff" />{' '}
              {amount[product.id] || 0}
            </div>
            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
  // }
}

// const mapStateToProps = state => ({ --------------------
//   amount: state.cart.reduce((amount, product) => {
//     amount[product.id] = product.amount;

//     return amount;
//   }, {}), // inicia o amount vazio
// }); -------------------------------------

// const mapDispatchToProps = dispatch => -------------------
//   bindActionCreators(CartActions, dispatch);

// export default connect(
//   // mapStateToProps, ----
//   null,
//   mapDispatchToProps
// )(Home); -------------------------

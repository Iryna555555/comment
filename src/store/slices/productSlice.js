import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from '../api/productApi'
//Redux Toolkit используется для управления глобальным состоянием 
// приложения. В каждом slice-файле мы создаём хранилище (state), 
// определяем действия (reducers) и асинхронные запросы (extraReducers).


const initialState = {
  products: JSON.parse(localStorage.getItem('products')) || [],  // Загруженные товары
  dailyProduct: null, // "Товар дня"
  dailyProductActive: false, // управляет отображением "товара дня".
  currentProducts: [] // список товаров с учётом скидок и сортировки.
};

const productSlice = createSlice({
  name: 'products', //  список товаров.
  initialState, // Создаём initialState (начальное состояние):
  reducers: { // Определяем reducers (функции для управления состоянием):
    setProducts: (state, action) => { //  обновляет список товаров.
      state.products = action.payload;
    },
    initDailyProduct: (state) => { // выбирает случайный товар и даёт ему скидку 50%.
      if(state.products.length !== 0){
        let newDailyProduct = {...state.products[Math.floor(Math.random()*state.products.length)]}; //search random product i nthe array
        newDailyProduct.discont_price = Number((newDailyProduct.price / 2).toFixed(2)); //set discount property to product of the day
        state.dailyProduct = newDailyProduct;
      }
    },
    showDailyProduct: (state) => { // включает отображение "товара дня".
      state.dailyProductActive = true;
    },
    closeDailyProduct: (state) => { // скрывает "товар дня".
      state.dailyProductActive = false;
    },
    initCurrentProducts: (state) => { // добавляет "товар дня" в список товаров.
      const { id } = state.dailyProduct; 
      state.currentProducts = [...state.products];
      let index = state.currentProducts.findIndex(product => product.id === id);
      if(index !== -1){
        state.currentProducts.splice(index, 1, state.dailyProduct);
      }
    }
  },
  extraReducers: (builder) => { // Используем extraReducers для загрузки товаров из API (fetchProducts.fulfilled)
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload; // сохраняем загруженные товары.
      state.currentProducts = [...action.payload];
    })
  }
});

export const { setProducts, initDailyProduct, showDailyProduct, closeDailyProduct, initCurrentProducts } = productSlice.actions; 
export default productSlice.reducer;

// Что здесь происходит?
// productSlice.actions – объект, содержащий все функции-редьюсеры, объявленные в reducers.
// Используем деструктуризацию, чтобы экспортировать только нужные действия:
// setProducts – устанавливает новый список товаров.
// initDailyProduct – выбирает "товар дня" (случайный продукт).
// showDailyProduct – включает отображение "товара дня".
// closeDailyProduct – скрывает "товар дня".
// initCurrentProducts – обновляет список товаров с учётом "товара дня".

// Что здесь происходит?
// productSlice.reducer – это сама функция-редьюсер, которая управляет состоянием products.
// export default позволяет подключить этот редьюсер в store/index.js, чтобы Redux мог его использовать.

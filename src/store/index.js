import {configureStore} from '@reduxjs/toolkit';  // Импорт функции для создания store
import themeReducer from './slices/themeSlice'; // Редьюсер для управления темой
import categoryReducer from './slices/categorySlice'; // Редьюсер для категорий
import filterReducer from "./slices/filterSlice"; // Редьюсер для фильтров
import productReducer from "./slices/productSlice"; // Редьюсер для товаров


// Создаём store с объединёнными редьюсерами
const store = configureStore({
    reducer: {
        theme: themeReducer, // Управление темной/светлой темой
        category: categoryReducer, // Хранение и загрузка категорий
        filter: filterReducer, // Фильтрация товаров
        products: productReducer // Хранение списка товаров и акций
    }
})

// Экспортируем store, чтобы использовать в Provider
export default store;


// 📌 Разбор кода:

// configureStore({ reducer: {...} }) – создаёт Redux-хранилище.
// Редьюсеры (themeReducer, categoryReducer, filterReducer, productReducer) – это куски глобального состояния приложения.

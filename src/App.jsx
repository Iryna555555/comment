import {BrowserRouter, Routes, Route} from 'react-router' // Импорт маршрутизации
import { Provider} from 'react-redux'; // Провайдер Redux-хранилища
import store from './store'; // Импорт store
import Home from './pages/Home/Home.jsx' // Главная страница
import Layout from './pages/Layout.jsx' // Основной шаблон приложения
import Categories from './pages/Categories/Categories.jsx' // Страница категорий
import NotFound from './pages/NotFound/NotFound.jsx'; // Страница 404
import AllSales from './pages/AllSales/AllSales.jsx' // Все товары со скидками
import AllProducts from './pages/AllProducts/AllProducts.jsx'  // Все товары
import Cart from './pages/Cart/Cart.jsx' // Корзина
import Favorites from './pages/Favorites/Favorites.jsx' // Избранные товары
import Product from "./pages/Product/Product.jsx"; // Страница товара
import Category from './pages/Category/Category.jsx' // Страница одной категории


function App() {

  return (
    <>
    <Provider store={store}> {/* Оборачиваем приложение в Redux */}
    <BrowserRouter> {/* Включаем маршрутизацию */}
        <Routes> {/* Определяем маршруты */}
            <Route path='/' element={<Layout />}> {/* Общий Layout для всех страниц */}
              <Route index element={<Home />}/>
              <Route path='/categories' element={<Categories />} />
              <Route path='/categories/:title' element={<Category />} />
              <Route path='/all-products' element={<AllProducts />} /> 
              <Route path='/all-products/product' element={<Product />} />
              <Route path='/all-sales' element={<AllSales />} /> 
              <Route path='/cart' element={<Cart />} /> 
              <Route path='/favorites' element={<Favorites />} /> 
              <Route path='/*' element={<NotFound />}/>
            </Route>
        </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App

// 📌 Разбор кода:

// <Provider store={store}> – оборачивает приложение в Redux-хранилище.
// <BrowserRouter> – включает маршрутизацию в приложении.
// <Routes> – определяет все маршруты.
// <Route path="/" element={<Layout />}> – общий layout (Navbar + Footer).
// <Route path="*" element={<NotFound />} /> – для несуществующих страниц.

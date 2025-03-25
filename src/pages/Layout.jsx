import React, { useEffect } from 'react' // Подключаем React для работы с компонентами.
import { Outlet } from 'react-router' // Импорт Outlet для вложенных маршрутов
import Navbar from '../components/Navbar/Navbar' // шапка сайта.
import Footer from '../components/Footer/Footer'; //  подвал сайта.
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../store/api/productApi';
import { initCurrentProducts, initDailyProduct } from '../store/slices/productSlice';
import DailyProduct from '../components/DailyProduct/DailyProduct'; // всплывающее окно с товаром дня.

const Layout = () => {
  const dark = useSelector(state => state.theme.isDark); // хук для получения данных из хранилища.
  // 🔍 Разбор кода:
  // const dark = useSelector(state => state.theme.isDark);

  // Получаем из Redux-хранилища состояние темной темы (true/false).
  // const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  const dailyProduct = useSelector(state => state.products.dailyProduct);
  // Создаём функцию dispatch() для отправки Redux-действий.
  const dispatch = useDispatch(); // хук для вызова действий (dispatch).

  // useEffect – хук, который запускает побочные эффекты (например, загрузку данных).
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts()); // fetchProducts – функция загрузки товаров из API.
    }
    dispatch(initDailyProduct()); // initDailyProduct – функция выбора "товара дня".
    dispatch(initCurrentProducts()); //initCurrentProducts – функция инициализации списка товаров.
  }, [dispatch, products]);

  //   🔍 Разбор useEffect():
  // useEffect() выполняется при первом рендере компонента.
  // [dispatch] – массив зависимостей (эффект сработает только при изменении dispatch).
  // Внутри useEffect():
  // dispatch(fetchProducts()) – загружаем список товаров из API.
  // dispatch(initDailyProduct()) – выбираем "товар дня".
  // dispatch(initCurrentProducts()) – обновляем текущий список товаров.


  return (
    <div className={`main-container ${dark ? "dark" : ""}`}>
      {/*className="main-container" – основной контейнер.
${dark ? "dark" : ""} – если включена тёмная тема, добавляется класс "dark". */}
      <Navbar />
      <main className='main'>
        {dailyProduct ? <DailyProduct /> : ""} 
        {/*dailyProduct ? <DailyProduct /> : "" – если есть "товар дня", он отображается. */}
        <Outlet />
        {/* <Outlet /> – сюда подставляются динамически загружаемые страницы (например, Home.jsx, Cart.jsx).*/}
        {/* Outlet – специальный компонент, который загружает нужную страницу в зависимости от маршрута. */}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
// Экспортируем Layout, чтобы использовать в App.jsx.
// 🔥 Итог: Что делает Layout.jsx?
// Загружает список товаров из API при первом запуске.
// Определяет, включена ли темная тема, и применяет нужный класс.
// Отображает Navbar, Footer, "Товар дня" и основную страницу.
// Позволяет App.jsx загружать динамические страницы (<Outlet />).


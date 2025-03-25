import React from 'react' // подключаем React для компонента
import "./Favorites.scss"; // подключаем стили для страницы избранного
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'; // хлебные крошки: навигационный путь
import Filtration from '../../components/Filtration/Filtration';
import ProductList from '../../components/ProductList/ProductList'; // компонент, который отображает список карточек товаров
import { useSelector } from 'react-redux'; // хук для получения данных из Redux-хранилища

const Favorites = () => { //Функциональный компонент страницы "Избранное".

  const likedProduct = useSelector(state => state.favorite.liked);
  // достаём массив избранных товаров из состояния

  return (
    <div className='favorites'> {/**Внешний контейнер страницы (для стилизации). */}
      <Breadcrumbs />  {/**— Навигация: Main page / Favorites */}
      <h1 className="page-title">Liked products</h1> {/**Заголовок страницы. */}
      <Filtration discounted={true} />
      <ProductList products={likedProduct} />
    </div>
    /**Что проверяем |	Что показываем
    Если favorites.length > 0 |	Отображаем список товаров
    Иначе	Пишем: | "No favorites yet..." */
  )
}

export default Favorites
//// экспортируем компонент, чтобы использовать его в маршрутах

// ✅ Что делает Favorites.jsx:
// Задача |	Где реализовано
// Получить список избранного |	useSelector(...).favorites
// Показать хлебные крошки |	<Breadcrumbs />
// Отобразить карточки или текст |	<ProductList /> или <p>
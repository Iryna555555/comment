// это страница, где отображаются все товары со скидками, а также фильтр и сортировка специально для акций.
import React from 'react' // Подключаем React для создания компонента.
import "./AllSales.scss"; // Подключаем стили для страницы всех скидок.
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'; // Импорт хлебных крошек (навигационного пути сверху страницы).
import Filtration from '../../components/Filtration/Filtration';
// — Подключаем компонент Filtration:
// Цена "от / до"
// Сортировка
// 🔹 Обрати внимание: здесь нет пропа discounted={true}, потому что все товары уже со скидкой.
import ProductList from '../../components/ProductList/ProductList'; // Компонент, который отображает карточки товаров.
import { useSelector } from 'react-redux'; //Хук из Redux Toolkit: позволяет взять данные из хранилища.

const AllSales = () => { //Объявляем функциональный компонент страницы.

  const products = useSelector(state => state.products.currentProducts);
  // Что делаем	| Зачем
  // useSelector(...) |	Получаем данные из Redux
  // state.products.currentProducts |	Это список товаров с учётом "товара дня"

  return (
    <div className='all-sales'> {/**Обёртка для страницы, класс all-sales используется для стилизации. */}
    <Breadcrumbs /> {/**Показывает путь: Main page / All sales*/}
    <Filtration /> {/** Компонент фильтра. Здесь НЕ передаём discounted={true}, потому что мы уже на странице скидок, и ProductList сам отфильтрует товары по пропу sales={true}. */}
    <ProductList products={products} sales={true} />{/**Проп	Что делает
products	Массив всех товаров из Redux
sales={true}	Указывает ProductList, что нужно отобразить только товары со скидкой (product.discont_price !== null) */}
    </div>
  )
}

export default AllSales
//Экспортируем компонент, чтобы он использовался в маршруте /all-sales.

// ✅ Что делает | AllSales.jsx:
// Что отображает	| Компонент
// Навигацию сверху	| <Breadcrumbs />
// Фильтр по цене и сортировка	| <Filtration />
// Только товары со скидкой	| <ProductList sales={true} />

// 🧠 Как это работает с ProductList:
// Внутри ProductList.jsx:
// Копировать
// Редактировать
// const currentProducts = sales
//   ? products.filter(product => product.discont_price !== null)
//   : products;
// 🔸 То есть:
// Если ты передаёшь sales={true} — карточки будут только со скидкой
// А дальше ещё фильтруются по цене, сортировке


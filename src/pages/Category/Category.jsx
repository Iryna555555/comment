import React, { useEffect, useState } from "react";
// React — для компонентов
// useEffect — запускает код при загрузке или изменениях
// useState — создаёт локальное состояние
import { useParams } from "react-router-dom";
// useParams — достаёт параметры из URL (например, название категории)
import Filtration from "../../components/Filtration/Filtration";
//// компонент фильтрации (цена, скидка, сортировка)
import "./Category.scss"; //// стили страницы Category
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs"; // хлебные крошки — навигация: Main page / Categories / ...
import { useSelector } from "react-redux"; // хук для получения данных из Redux-хранилища
import ProductList from '../../components/ProductList/ProductList'; // компонент, который отрисовывает карточки товаров

const Category = () => { // — Функциональный компонент страницы категории.

  const { title } = useParams();
  // useParams() — получает параметры из URL (например, название категории или ID) достаём "title" из URL: например, /categories/Plants => title = "Plants"
  const [products, setProducts] = useState([]);
  // храним товары, относящиеся к выбранной категории
  const categories = useSelector(state => state.category.categories);
  // достаём список категорий из глобального хранилища

  const category = categories.find((category) => category.title === title)
// ищем категорию, у которой title совпадает с параметром из URL

  useEffect(() => { // Хук запускается один раз при загрузке страницы.
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://exam-server-5c4e.onrender.com/products/all");
        //— Делаем GET-запрос ко всем товарам.
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
          //— Если сервер вернул ошибку — выбрасываем исключение.
        }
        const data = await response.json();
        // преобразуем ответ в JSON
        setProducts(data.filter(product => product.categoryId === category.id));
        // сохраняем только те товары, которые относятся к текущей категории
      } catch (err) {
        console.error("Error loading products:", err);
        // если ошибка — выводим в консоль
      }
    };
    fetchProducts();
    // эффект выполняется один раз при монтировании
  }, []);


  return (
    <div className="category"> {/**Обёртка страницы категории. */}
      <Breadcrumbs /> {/** Показывает путь: Main page / Categories / [название] */}
      <h1 className="page-title">{category ? category.name : "Category Not Found"}</h1>
      {/* {— Если категория найдена — показываем её имя.— Иначе — "Category Not Found".} */}
      <Filtration discounted={true} /> {/** компонент фильтрации с включённым фильтром по скидке */}
      <div className="category__list">
        <ProductList products={products} />
       {/**— Передаём отфильтрованные товары в компонент ProductList, который отрисует карточки. */}
      </div>
    </div>
  );
};

export default Category;
//// делаем компонент доступным для использования в маршрутах

// ✅ Что делает Category.jsx:
// Что делает |	Где и как реализовано
// Получает title из URL |	useParams()
// Ищет категорию по названию |	categories.find(...)
// Загружает товары с сервера |	fetch() внутри useEffect()
// Фильтрует товары по categoryId |	product.categoryId === category.id
// Отображает название категории |	<h1>{category.name}</h1>
// Показывает фильтр и товары |	<Filtration /> + <ProductList />

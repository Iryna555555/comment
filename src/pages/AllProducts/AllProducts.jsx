//Это страница, которая показывает все товары магазина и даёт возможность их фильтровать и сортировать.

import React, { useEffect } from "react"; //Импортируем React и хук useEffect,
import { useSelector } from "react-redux"; //Импортируем хук useSelector, чтобы достать данные из Redux-хранилища.
import Filtration from "../../components/Filtration/Filtration"; // Компонент фильтрации товаров: по цене, скидкам, сортировке.
import "./AllProducts.scss"; //Подключаем стили для страницы (например, оформление заголовка и отступов).
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs"; //— "Хлебные крошки" — показывают, где пользователь находится на сайте:Main page / All products
import ProductList from "../../components/ProductList/ProductList"; //— Компонент, который рисует сетку карточек товаров на основе переданных данных.

const AllProducts = () => { //Объявляем функциональный компонент.
  const products = useSelector((state) => state.products.currentProducts);  
  // Что делает	| Зачем
  // useSelector	| Достаёт данные из глобального store
  // state.products.currentProducts	- Это список товаров, уже с учётом "товара дня"
  // 💡 Это не просто products, а текущие отображаемые товары, подготовленные в productSlice.
  
  return (
    <div className="all-products">  {/**Вся страница обёрнута в div с классом all-products (для отступов, фона и т. д.) */}
      <Breadcrumbs />
      <h1 className="page-title">All products</h1> {/**— Большой заголовок страницы.
💡 Класс page-title у тебя используется и в других местах (общий стиль).*/}
      <Filtration discounted={true} />
      {/**Что делает	Объяснение
Filtration	Компонент с полями "от / до", чекбоксом скидки и сортировкой
discounted={true}	Показывает чекбокс "только товары со скидкой" */}
      <ProductList products={products}/>
      {/**— Передаём products в компонент ProductList, чтобы он отрисовал карточки товаров.
📌 Всё, что попало в filteredProducts внутри ProductList, — будет здесь отрисовано. */}
    </div>
  );
};

export default AllProducts;

//— Экспортируем компонент, чтобы он подключался в маршрутизации (App.jsx, путь /all-products).

// Что делает AllProducts.jsx в целом:
// Что отображает |	Компонент
// Хлебные крошки |	<Breadcrumbs />
// Заголовок |	<h1>
// Фильтр товаров |	<Filtration />
// Карточки товаров |	<ProductList />
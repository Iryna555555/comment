import React, { useEffect } from 'react';
// Подключаем React и хук useEffect, чтобы выполнить действие при 
// загрузке страницы (например, загрузку категорий).
import "./categories.scss"; //  Подключаем файл стилей для этой страницы.
import { Link } from 'react-router-dom'; //Импортируем компонент Link — создаёт переходы без перезагрузки страницы.
import { useDispatch, useSelector } from 'react-redux';
// — Подключаем хуки Redux:
// useSelector — читаем данные из Redux-хранилища
// useDispatch — отправляем действия
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'; //— Импортируем "хлебные крошки", чтобы показывать путь:Main page / Categories
import { fetchCategories } from '../../store/api/category'; // — Импортируем асинхронный запрос, который загружает список категорий с сервера.

const Categories = () => { //Объявляем функциональный компонент страницы.

    const { categories } = useSelector((state) => state.category); //— Читаем массив categories из хранилища.
    //Если он пустой — значит, надо загрузить с сервера.

    const dispatch = useDispatch(); //Чтобы отправлять действия в Redux, например dispatch(fetchCategories())

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(fetchCategories());
        }
    }, [])
    //     Что делает	Почему нужно
    // useEffect(...)	Запускается после рендера
    // if (categories.length === 0)	Только если ещё не загружены
    // dispatch(fetchCategories())	Загружаем категории с сервера
    // 💡 Здесь можно добавить [] как второй аргумент, чтобы эффект запускался только один раз:


    return (
        <div className='categories'> {/** Внешний контейнер всей страницы. */}
            <div className="categories__container"> {/**Обёртка для центрирования и отступов. */}
                <Breadcrumbs />
                <h2 className="page-title">Categories</h2> {/** Заголовок страницы. Класс page-title — общий стиль. */}
                <div className="categories__list"> {/**Контейнер для карточек категорий. */}
                    {categories.map((category) => (
                        <Link key={category.id} to={`/categories/${category.title}`} className="category-card">
                            {/**— Для каждой категории:создаём ссылку (Link):-ведёт на /categories/название:

-оборачиваем в category-card. // .map() — создаёт новый массив, перебирая каждый элемент и возвращая результат функции
// 🔹 В React часто используется, чтобы отрисовать список компонентов — например, карточки товаров или категории.*/}
                            {category.image && (
                                <img
                                    src={`https://exam-server-5c4e.onrender.com${category.image}`}
                                    alt={category.title}
                                    className="category-card__image"
                                    /**— Если у категории есть изображение:отображаем его:добавляем alt для доступности и SEO */
                                />
                            )}
                            <span className="category-card__link">{category.title}</span>
                            {/**Текст — название категории (например, "Plants", "Tools") */}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Categories;   
// — Чтобы можно было использовать в App.jsx (в маршрутах). 

// ✅ Что делает Categories.jsx:
// Что |	Компонент / логика
// Загружает категории с сервера |	dispatch(fetchCategories())
// Показывает хлебные крошки |	<Breadcrumbs />
// Отображает карточки категорий |	.map(...) по categories
// Позволяет перейти в категорию |	<Link to="/categories/:title" />
//Это шапка сайта, в которой живут логотип, ссылки на страницы, 
// переключатель темы, счётчики избранного и корзины, а также "бургер" 
// меню для мобильной версии. 
import React, { useEffect, useState } from 'react'
// — Используем React и хуки:
// useState — для ширины окна и состояния бургер-меню.
// useEffect — чтобы следить за изменением размера окна.
import "./Navbar.scss"; //  Стили для компонента.
import { NavLink, Link } from 'react-router';
// NavLink добавляет class="active" для текущей страницы.
// — Link — для обычных переходов без перезагрузки.
import { Heart, Moon, ShoppingBag, Sun, X } from 'lucide-react';
// — Иконки:
// 💖 Heart — избранное,
// 👜 ShoppingBag — корзина,
// 🌙 Moon, ☀️ Sun — темы,
// ❌ X — закрытие меню.
import { useDispatch } from 'react-redux'; //dispatch(toggleTheme()) переключает светлую/тёмную тему.
import { toggleTheme } from '../../store/slices/themeSlice';
import Button from '../Button/Button'; // Кнопка "1 day discount!" показывает модалку с товаром дня.
import { showDailyProduct } from '../../store/slices/productSlice';



const Navbar = () => {

    const [width, setWidth] = useState(window.outerWidth);
    // Сохраняем текущую ширину окна (используем для адаптива).

    const [isOpen, setIsOpen] = useState(false);
    //— Управляет отображением бургер-меню на мобильных.

    const dispatch = useDispatch(); //— Готовим dispatch() для вызова Redux-действий.

    // toggles dark-mode after click
    const toggleThemeHandler = () => {
        dispatch(toggleTheme());
        //— При нажатии на переключатель темы вызывается toggleTheme() из Redux.
    }

    // displays product of the day
    const handleDisplayDailyProduct = () => {
        if(isOpen) setIsOpen(false) // // Закрываем бургер-меню/ closes burger-menu if active
        dispatch(showDailyProduct()); // Показываем модалку "товар дня"
    }

    useEffect(() => { // следим за размером экрана
        const resizeHandler = () => setWidth(window.outerWidth);
        window.addEventListener("resize", resizeHandler);
        //  Когда меняется размер окна, обновляем width.
        // — Это позволяет адаптивно переключаться между десктопом и мобильной версией.

        return () => {window.removeEventListener("resize", resizeHandler)}
    }, []);



  return (
    <>
        <nav className="navbar">
            <div className="nav-left">
                <img src="/logo.png" alt="" className="logo" />
                <label className="switch"> {/*— Переключатель темы (визуально стилизованный switch). */}
                    <input type="checkbox" />
                    <span onClick={toggleThemeHandler} className='slider'>
                    <Sun className='icon' />
                    <Moon className='icon' />
                    </span>
                </label>
            </div>
            {width >= 768 && 
            <div className="nav-mid">
                <Button className={"discount__title"} onClick={handleDisplayDailyProduct}>1 day discount!</Button>
                {/*— Кнопка, открывающая "товар дня". */}
                <div className="links">
                    <NavLink to="/" className={({ isActive }) => `link ${isActive ? "active" : ""}`}>Main Page</NavLink>
                    <NavLink to="/categories" className={({ isActive }) => `link ${isActive ? "active" : ""}`}>Categories</NavLink>
                    <NavLink to="/all-products" className={({ isActive }) => `link ${isActive ? "active" : ""}`}>All products</NavLink>
                    <NavLink to="/all-sales" className={({ isActive }) => `link ${isActive ? "active" : ""}`}>All sales</NavLink>
                    {/*Ссылки на основные страницы. */}
                </div>
            </div>}
            <div className="nav-right">
                <div className="icon-item">
                    <Link to={"/favorites"}><Heart className='icon' /></Link>
                    <span className="count">1</span>
                    {/* Иконка избранного и счётчик (пока захардкожен 1). */}
                </div>
                <div className="icon-item">
                    <Link to={"/cart"}><ShoppingBag className='icon' /></Link>
                    <span className="count">10</span>
                    {/*— Корзина и количество товаров (пока 10). */}
                </div>
                {width < 768 &&
                <>
                <div className="burger" onClick={() => setIsOpen(!isOpen)}>
                    {/* Бургер-меню (три полоски), открывает боковую панель. */}
                    <div className={isOpen ? "bar open" : "bar"}></div>
                    <div className={isOpen ? "bar open" : "bar"}></div>
                    <div className={isOpen ? "bar open" : "bar"}></div>
                </div>
                <div className={`menu ${isOpen ? "open" : ""}`}>
                    {/*Появляется при isOpen === true. */}
                    <div className="menu-content">
                        <X className='icon' onClick={() => setIsOpen(false)} />
                            {/*— Крестик закрывает меню. */}
                            <div className="menu-links">
                            <Link to="/" onClick={() => setIsOpen(false)} className="link">Main Page</Link>
                            <Link to="/categories" onClick={() => setIsOpen(false)} className="link">Categories</Link>
                            <Link to="/all-products" onClick={() => setIsOpen(false)} className="link">All products</Link>
                            <Link to="/all-sales" onClick={() => setIsOpen(false)} className="link">All sales</Link>
                            {/*При клике по пункту меню — меню закрывается. */}
                            <Button className="discount__title" onClick={handleDisplayDailyProduct}>1 day discount!</Button>
                            </div>
                    </div>
                </div>
                </>
                }

            </div>
        </nav>
    </>
    )
}

export default Navbar

// ✅ Итог — Что делает Navbar.jsx
// Что отображает	| Как
// Логотип	| Слева в .nav-left
// Переключатель темы |	React + Redux
// Ссылки по страницам |	NavLink, Link
// Кнопка "1 day discount"  |	Открывает модалку
// Бургер-меню на мобильных |	через useState и width
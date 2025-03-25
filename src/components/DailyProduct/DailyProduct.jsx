// DailyProduct.jsx — это всплывающее окно с "товаром дня", который отображается со скидкой 50%.

import React from 'react' // Импортируем React, чтобы создавать компонент.
import "./DailyProduct.scss"; // Импортируем стили компонента (визуальное оформление).
import { useDispatch, useSelector } from 'react-redux';
// - **`useSelector`** — получаем данные из Redux-хранилища.  
// - **`useDispatch`** — используем для отправки действий (actions) в Redux.
import { Heart } from 'lucide-react'; // Импорт иконки "сердце" из библиотеки lucide-react.
import Button from '../Button/Button'; // - Импорт собственного компонента `Button`.
import { LuX } from 'react-icons/lu'; // Импорт иконки "крестик" (закрыть окно) из библиотеки react-icons.
import { closeDailyProduct } from '../../store/slices/productSlice'; // - Импорт действия Redux, которое **закрывает окно "товара дня"**.

const DailyProduct = () => {
    const product = useSelector(state => state.products.dailyProduct); // Извлекаем сам "товар дня" из Redux-хранилища.
    const isActive = useSelector(state => state.products.dailyProductActive); // - Получаем флаг: **показывать ли всплывающее окно?**
    const dispatch = useDispatch(); // Создаём функцию dispatch(), чтобы отправлять действия в Redux.

    const handleCloseWindow = () => {
        dispatch(closeDailyProduct())
        // - Функция обработчик: при вызове **отправляет действие в Redux**, чтобы закрыть модальное окно.
    }


    return (
        <div className={`modalWindow ${isActive ? "shown" : ""}`}>
            {/*Контейнер модального окна.
Если isActive === true, добавляется класс shown → окно отображается. */}
            <div className="productContainer">
                {/*<div className="productContainer"> ``` - Внутренний блок, в котором отображается содержимое "товара дня". */}
                <div className="productContainer__header">
                    <h2 className="dailyProduct__title">50% discount on product of the day!</h2>
                    <LuX className='icon' onClick={handleCloseWindow} />
                    {/*<div className="productContainer__header"> <h2 className="dailyProduct__title">50% discount on product of the day!</h2> <LuX className='icon' onClick={handleCloseWindow}/> </div> ``` - Заголовок модального окна. - Крестик `LuX` вызывает `handleCloseWindow`, чтобы **закрыть окно**. */}
                </div>
                <div className="dailyProduct">
                    {/* <div className="dailyProduct"> ``` - Основной блок с информацией о товаре. */}
                    <div className="dailyProduct__header">
                        <span className="dailyProduct__discount">-50%</span>
                        <Heart className='icon' />
                        {/*<div className="dailyProduct__header"> <span className="dailyProduct__discount">-50%</span> <Heart className='icon' /> </div> ``` - Отображается значок `-50%` и иконка "лайка" (сердце). */}
                    </div>
                    <img className="dailyProduct__image" src={`https://exam-server-5c4e.onrender.com${product.image}`}></img>
                    {/*- Отображение изображения товара.  
- URL собирается динамически из `product.image`. */}
                    <div className="dailyProduct__footer">
                        <h3 className="dailyProduct__name">{product.title}</h3>
                        <div className="dailyProduct__prices">
                            <span className="dailyProduct__current-price">${product.discont_price.toFixed(2)}</span>
                            <span className="dailyProduct__old-price">${(product.price).toFixed(2)}</span>
                            {/*Название товара.
Две цены:- discont_price — цена со скидкой. - price — старая цена.
Используем .toFixed(2) — округление до двух знаков после запятой. */}
                        </div>
                    </div>
                </div>

                <Button type={"secondary"} className={"btn-daily"}>Add to cart</Button>
                {/*- Кнопка "добавить в корзину".  
- Используем наш `Button` с типом `"secondary"` и дополнительным классом `"btn-daily"`. */}
            </div>
        </div>
    )
}

export default DailyProduct // Экспортируем компонент для использования в Layout.jsx.

// ИТОГ: что делает компонент DailyProduct?
// Что делает	Как работает
// Показывает всплывающее окно	| По флагу dailyProductActive из Redux
// Отображает товар дня | 	С информацией: картинка, название, цены
// Скидка 50%	| discont_price = price / 2 задаётся в productSlice
// Закрытие окна	| Через иконку крестика и dispatch(closeDailyProduct())
// Кнопка добавления в корзину	| Пока не реализована, но предусмотрена
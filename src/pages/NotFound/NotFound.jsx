//страница 404, которая отображается, если пользователь перешёл по несуществующему адресу.
import React, {useEffect, useState} from 'react'
// подключаем React и хуки (useEffect/useState пока не используются)
import "./NotFound.scss"; // стили для страницы 404
import Button from '../../components/Button/Button'; // импорт собственной кнопки с разными стилями
import { useNavigate } from 'react-router'; // хук для перехода по маршрутам программно
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'; // хлебные крошки (можно использовать, но сейчас в JSX их нет)

const NotFound = () => { {/**Объявляем компонент 404-страницы. */}

  const navigate = useNavigate(); // получаем функцию навигации из react-router

  const goHomeHandler = () => {
    navigate("/"); // при клике на кнопку — перейти на главную
  }

  return (
    <>
        <div className="not-found"> {/**— Контейнер для всей страницы 404 */}
        <img src="/404.png" alt="" className='notFound__img' /> {/** картинка с ошибкой 404 (лежит в public) */}
        <h2 className='notFound__title'>Page Not Found</h2> {/**заголовок страницы */}
        <p className="notFound__text">We’re sorry, the page you requested could not be found.
        Please go back to the homepage.</p>
        {/**текстовое сообщение с извинением и инструкцией */}
        <Button type={"primary"} onClick={goHomeHandler}>Go Home</Button>
        {/** основная кнопка, при нажатии вернёт пользователя на главную */}
      </div>
    </>
  )
}

export default NotFound
// экспортируем компонент для использования в маршрутах


// 💛 Что делает обновлённый NotFound.jsx:
// Что |	Как
// Показывает красивую 404-картинку	| <img src="/404.png" />
// Объясняет ситуацию	| <p>We’re sorry...
// Даёт кнопку вернуться	| <Button onClick={goHomeHandler} />
// Работает без перезагрузки	| useNavigate()
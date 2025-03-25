import React from 'react'; // Импортируем React для создания компонента.
import "./ProductCard.scss"; // Подключаем стили для карточки товара.
import { Heart, ShoppingBag } from 'lucide-react'
// — Импортируем иконки:
// 💖 Heart — добавить в избранное (визуально);
// 🛍 ShoppingBag — иконка корзины.


const ProductCard = ({ discont_price, image, title, price }) => { //— Это функциональный компонент.— Получает пропсы:
  return (
    <div className="product-card"> {/*Вся карточка товара. Это внешний контейнер. */}
      {discont_price && (
        /*— Если есть discont_price, значит у товара скидка.
  — Считаем её в процентах:  Округляем через Math.round() — получаем целое число, например -30%. */
        <div className="discont-badge">-{Math.round((price - discont_price) / price * 100)}%</div>
      )}
      <img className="product-image" src={`https://exam-server-5c4e.onrender.com${image}`} alt={title} />

      <div className="product-icons">
        <Heart className="icon" />
        <ShoppingBag className="icon" />
      </div>

      <div className='card_footer'>
        <h3 className="product-title">{title}</h3>
        <div className="product-price">
          <span className="current-price">${discont_price ? discont_price.toFixed(2) : price.toFixed(2)}</span>
          {discont_price && (
            <span className="old-price">${price.toFixed(2)}</span>
            /*— Основная цена:Если есть скидка → показываем discont_price
Иначе → обычную price
— Метод .toFixed(2) делает $49.00 вместо $49.:Если есть скидка, показываем старую цену — зачёркнутую. */
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
// — Экспортируем компонент для использования в ProductList, Category, AllProducts, AllSales и др.

// ✅ Что делает ProductCard
// Элемент |	Назначение
// Скидка -XX% |	Если discont_price есть
// Картинка |	Показывает товар
// Иконки |	Лайк и корзина (визуальные)
// Название |	Отображает title
// Цены |	Новая + зачёркнутая старая
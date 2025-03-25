import React from 'react' //  Импортируем React — без него мы не сможем создавать компоненты.
import "./Cart.scss"; // Подключаем файл со стилями для корзины.
import Button from '../../components/Button/Button'; //  Импортируем наш кастомный компонент Button, с разными стилями (type: "primary", "secondary" и т. д.)
import { useNavigate } from 'react-router'; //  Импортируем хук useNavigate из React Router:
// 🔹 С его помощью можно программно перейти на другую страницу.

const Cart = () => {

  const navigate = useNavigate(); // Получаем функцию navigate, чтобы переходить по маршрутам.

  const handleBackToStore = () => {
    navigate("/all-products"); // 	Переводит пользователя на страницу со всеми товарами
  }
  // 🔸 Эта функция вызывается, когда пользователь нажимает кнопку "Back to the store" или "Continue shopping".

  return (
    <div className='cart'>
      <div className="cart-header"> {/* Заголовок страницы: "Shopping cart" */}
        <h1 className="page-title">Shopping cart</h1> {/*Класс page-title — используется в проекте для единых заголовков.*/}
        <Button type={"secondary"} className={"btn-back"} onClick={handleBackToStore}>Back to the store</Button>
        {/* Кнопка "Назад в магазин"Свойство	Значение,type="secondary"	стиль кнопки (например, с серым фоном)
onClick={...}	при клике вызываем handleBackToStore() */}
      </div>
      <p className='cart-empty'>Look like you have no items in your basket currently.</p>
      {/*— Сообщение для пользователя: «Кажется, у вас пока нет товаров в корзине».
🔸 Этот текст можно будет заменить на список товаров, когда появится логика добавления в корзину. */}
      <Button className={"btn-cart"} onClick={handleBackToStore}>Continue Shopping</Button>
      {/* Ещё одна кнопка, чтобы вернуться в каталог.Особенность	Пояснение
className="btn-cart"	Стилизация кнопки отдельно от кнопки "Назад",onClick	Повторяет поведение верхней кнопки */}
    </div>
  )
}

export default Cart

// ✅ Что делает Cart.jsx:
// Что| 	Как реализовано
// Заголовок "Shopping cart" |	через h1
// Кнопка вернуться в магазин |	navigate("/all-products")
// Сообщение о пустой корзине |	p.cart-empty
// Повторная кнопка "Continue Shopping" |	для удобства пользователя


// Что можно улучшить позже:
// Идея	Как сделать
// Подключить корзину из Redux	useSelector(state => state.cart.items)
// Если есть товары — показывать их	через .map() по массиву
// Добавить цену, кнопки удаления, оформление заказа	при развитии проекта
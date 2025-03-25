import "./Product.scss"; // стили для страницы товара
import React from "react"; // базовый импорт React
import { useParams } from "react-router-dom"; // получаем данные из URL
import { useState, useEffect } from "react"; // хуки состояния и жизненного цикла
import { Heart, Plus, Minus } from 'lucide-react'; // иконки
import Button from '../../components/Button/Button'; // кастомная кнопка
import { useDispatch, useSelector } from "react-redux"; // хуки Redux
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs"; // хлебные крошки
import { addToCart } from "../../store/slices/cartSlice"; // действие для корзины
import { toggleLike } from "../../store/slices/favoriteSlice"; // действие для лайка


function Product() {
  {/**— Функциональный компонент товара. */ }
  const { productTitle } = useParams(); // получаем название товара из URL
  const { currentProducts } = useSelector(state => state.products); // получаем все текущие товары
  const product = currentProducts.find(product => product.title === productTitle); // ищем товар по title
  const [readMore, setReadMore] = useState(false); // для "Read more" текста
  const [count, setCount] = useState(1); // количество товара для корзины
  const [modal, setModal] = useState(false); // модальное окно с увеличенной картинкой
  const likedProducts = useSelector(state => state.favorite.liked); // список лайкнутых товаров
  const [isProductLiked, setIsProductLiked] = useState(false); // флаг — лайкнут ли текущий товар
  const dispatch = useDispatch(); // функция для вызова Redux-экшенов
  const [width, setWidth] = useState(window.innerWidth); // ширина экрана (для адаптива)


  const openText = () => setReadMore(!readMore); // открыть / свернуть описание

  const counterIncrement = () => setCount(prev => prev + 1); // +1
  const counterDecrement = () => count > 1 && setCount(prev => prev - 1); // -1 (не меньше 1)

  const toggleModal = () => setModal(!modal); // открыть / закрыть модальное окно


  const getSalePercent = (discountPrice, currentPrice) => {
    return Math.round(100 - discountPrice / (currentPrice / 100)); // вычисляем % скидки
    //     🔹 Вычисляет, на сколько процентов снизилась цена.
    // 🧠 Принцип:
    // Сначала считает, какую часть от полной цены составляет цена со скидкой.
    // Вычитает это из 100 — получаем процент скидки.
    // Math.round() — округляет до целого числа.
  };


  const addProduct = (product) => {
    dispatch(addToCart({ ...product, count: count })); // добавляем товар с количеством
    //     🧠 Что делает:
    // Получает товар в параметре product
    // Создаёт новый объект, копируя все свойства товара (...product)
    // Добавляет свойство count — выбранное пользователем количество
    // 💛 Для чего это:
    // 👉 Чтобы добавить товар в корзину с нужным количеством
    // 📦 Сохраняется в cartSlice внутри Redux-хранилища
  }

  const toggleLikeProduct = (product) => {
    setIsProductLiked(!isProductLiked);
    dispatch(toggleLike(product));
    //     🧠 Что делает:
    // setIsProductLiked(!isProductLiked)
    // ⤷ Переключает локальное состояние:
    // если было true, станет false, и наоборот
    // (визуально влияет на иконку сердечка ❤️)
    // dispatch(toggleLike(product))
    // ⤷ Отправляет товар в Redux:
    // если он уже в liked[] — удалит
    // если нет — добавит
    // (это делает toggleLike в favoriteSlice.js)
    // ✅ Для чего:
    // Чтобы лайкать или дизлайкать товар, сохраняя это в Redux + меняя состояние локально (иконка).
  }

  const salePercent = getSalePercent(product?.discont_price, product?.price);  // процент скидки
  // 📌 Что делает:
  // 🔸 Вызывает функцию getSalePercent(...), чтобы посчитать процент скидки на товар.
  // 🧠 Аргументы:
  // product?.discont_price — цена со скидкой
  // product?.price — оригинальная цена
  // ?. — защита от ошибки, если product ещё не загружен (чтобы не было "undefined is not an object")
  // ✅ Результат:
  // В salePercent будет храниться целое число, например 30, которое можно вывести в бейдже -30%.



  useEffect(() => { //  Хук, который выполняет код после первого рендера.
    const resizeHandler = () => setWidth(window.innerWidth); //// функция, которая обновляет ширину окна в состоянии

    window.addEventListener("resize", resizeHandler); // добавляем слушатель события "resize" (при изменении размера окна)

    return () => window.removeEventListener("resize", resizeHandler);
    // при размонтировании компонента — удаляем слушатель
    // чтобы не было утечки памяти
    {/**🔍 Что делает:
Этот useEffect:
следит за размером окна браузера
обновляет width, когда пользователь меняет размер окна
✅ Для чего используется:
Чтобы адаптировать интерфейс под ширину экрана
Например: показывать по-разному описание или заголовок на телефоне и десктопе
*/}
  }, []) // пустой массив зависимостей — значит, useEffect сработает один раз при загрузке



  useEffect(() => { // Запускаем эффект, когда компонент загружается или обновляется product.
    {/**🔍 Что делает этот useEffect?
При загрузке товара (или если product изменится):
Прокручивает страницу вверх
Проверяет, находится ли товар в списке избранных
 */}
    window.scrollTo(0, 0); // плавно прокручиваем окно в самый верх (0 по X и 0 по Y)
    if (product !== undefined) { // Проверяем, что product уже загружен (иначе будет ошибка при обращении к product.id).
      // ✅ Для чего это:
      // Действие	Зачем нужно
      // scrollTo(0, 0)	Чтобы страница начиналась с верха
      // setIsProductLiked(...)	Чтобы иконка лайка отображалась правильно ❤️
      setIsProductLiked(likedProducts.some(likedProduct => likedProduct.id === product.id));
      // some() — проверяет, есть ли в массиве хотя бы один элемент, который подходит под условие
      // — Устанавливаем true, если товар есть в избранных:
      // 🔹 some() проверяет: есть ли хотя бы один товар в массиве likedProducts, у которого id === product.id
    }
  }, [product]); // Эффект запускается только при изменении product


  if (!product) {
    return <div>Loading...</div>
    {/**🧠 Объяснение:
Если product ещё не найден или не загружен, компонент не может отрисовать информацию.
Поэтому временно показываем текст "Loading..." (ожидание).
✅ Зачем это нужно:
🔹 Чтобы избежать ошибок при попытке обратиться к product.title, product.image и т.д., пока данные ещё не готовы.
💡 Когда product появится — React продолжит рендерить остальную часть компонента. */}
  }

  return (
    <div className="product"> {/**— Основной контейнер страницы товара. */}
      <Breadcrumbs />
      {/**— Показывает путь: Main page / Category / Product */}
      <div key={product.id} className="product__container"> {/**Внутренний блок товара, уникальный по product.id.*/}
        {
          width <= 480 &&
          <div className="product__header">
            <h3 className="product__title">{product.title}</h3>
            <Heart className={`icon ${isProductLiked ? "liked" : ""}`} onClick={() => toggleLikeProduct(product)} />
          </div>
          /**— Показываем заголовок и сердечко только если ширина ≤ 480px
— className меняется в зависимости от лайка */
        }

        <div className="image__container">
          <img
            onClick={toggleModal}
            className="product__image"
            src={`https://exam-server-5c4e.onrender.com/${product.image}`}
            alt=""
          />
        </div>
        {/**— Отображаем картинку товара
— При клике — открывается модальное окно */}


        <div
          onClick={toggleModal}
          className={modal ? "modal__container__img" : "close__window"}
        >
          <img
            className="modal__window__img"
            src={`https://exam-server-5c4e.onrender.com/${product.image}`}
            alt=""
          />
        </div>
        {/**— Если modal === true, показываем большое изображение товара
— При повторном клике — закрываем */}


        <div className="product__info"> {/**🖋 Заголовок и лайк (на шире 480px) */}
          {
            width > 480 &&
            <div className="product__header">
              <h3 className="product__title">{product.title}</h3>
              <Heart className={`icon ${isProductLiked ? "liked" : ""}`} onClick={() => toggleLikeProduct(product)} />
            </div>
          }



          <div className="prices">
            <span className="currentPrice">${product.discont_price ? product.discont_price.toFixed(2).replace(".", ",") : product.price.toFixed(2).replace(".", ",")}</span>
            {/**— Отображаем цену со скидкой (или обычную), с запятой вместо точки */}
            {
              product.discont_price &&
              <span className="oldPrice">${product.price.toFixed(2).replace(".", ",")}</span>
              /**— Если есть скидка — отображаем старую зачёркнутую цену */
            }
            {
              product.discont_price &&
              <span className="sales-badge">-{salePercent}%</span>
              /**— Показываем бейдж с процентом скидки */
            }
          </div>


          <div className="counter__container"> {/**Счётчик + кнопка "Add to cart" */}
            <div className="counter__box">
              <button onClick={counterDecrement} className="counter__btn"><Minus></Minus></button>
              <input type="number" className="counter" value={count} readOnly />
              <button onClick={counterIncrement} className="counter__btn"><Plus></Plus></button>
              {/**— Счётчик увеличения/уменьшения количества
— Кнопка добавляет товар с нужным count в корзину */}
            </div>
            <Button onClick={() => addProduct(product)}
              className="add__to">
              Add to cart
            </Button>
          </div>
          {
            width > 768 &&
            <div className="description__container">
              <h4 className="description__title">Description</h4>
              <p className="description">{product.description.length > 200 && !readMore ? `${product.description.slice(0, 200)}...` : product.description}</p>
              {/**— Если описание длинное — показываем первые 200 символов и ссылку "Read more" */}
              {
                product.description.length > 200 && (
                  <p className="read__more" onClick={openText}>{readMore ? "Show Less" : "Read more"}</p>
                )
              }
            </div>
          }
        </div>
      </div>
      {
        width <= 768 && 
        <div className="description__container">
          <h4 className="description__title">Description</h4>
          <p className="description">{product.description.length > 200 && !readMore ? `${product.description.slice(0, 200)}...` : product.description}</p>
          {/**— То же описание, но ниже карточки, в отдельной секции для мобильных */}
          {
            product.description.length > 200 && (
              <p className="read__more" onClick={openText}>{readMore ? "Show Less" : "Read more"}</p>
            )
          }
        </div>
      }
    </div>
  );
}


export default Product;
// 🔹 Экспортирует компонент Product как значение по умолчанию из файла.

// ✅ Что делает этот return (...):
// Блок	Что отображает
// Breadcrumbs	путь до товара
// Заголовок	название + сердечко
// Картинка	с модальным окном
// Цены	со скидкой и без
// Счётчик	количества
// Кнопка	Add to cart
// Описание	с "Read more"
// Адаптив	вёрстка под ширину экрана

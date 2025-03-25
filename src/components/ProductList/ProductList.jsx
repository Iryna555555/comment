import React, { useState, useEffect } from 'react'
// — Подключаем React и два хука:
// useState — для состояния отфильтрованных товаров.
// useEffect — чтобы отслеживать изменения и вызывать фильтрацию.
import "./ProductList.scss"; // — Подключаем стили для сетки товаров.
import ProductCard from '../ProductCard/ProductCard' // Импортируем карточку товара, которую будем рендерить в списке.
import { useSelector } from 'react-redux'; // Достаём данные фильтров (discount, minPrice, sorted) из Redux.


const ProductList = ({ products, sales }) => {
  {/*products	массив всех товаров для отображения
sales	флаг: показывать только товары со скидками (если true) */}
  const [filteredProducts, setFilteredProducts] = useState(products);
  // — Создаём состояние для товаров после фильтрации.— Начальное значение — все пришедшие товары.
  const discounted = useSelector(state => state.filter.discountActive);
  const { minPrice, maxPrice, sorted } = useSelector(state => state.filter);
  //   — Получаем параметры фильтрации:
  // discountActive — включён ли фильтр по скидке
  // minPrice, maxPrice — диапазон цен
  // sorted — выбранный тип сортировки
  const currentProducts = sales ? products.filter(product => product.discont_price !== null) : products; //if sales = true, it shows products with sales only. Otherwise it shows all products (for "all sales")
  // Если sales === true, оставляем только товары со скидкой.— Иначе — все товары.


  const filterProducts = () => {
    let filtered = currentProducts;
    //Начинаем с currentProducts (учитываем sales, если надо).

    if (discounted) {
      filtered = filtered.filter(product => product.discont_price !== null); // filter(создаёт новый массив только с элементами, прошедшими условие) products with sale
      // — Если включён чекбокс "только со скидкой" — оставляем только такие товары.
    }

    filtered = filtered.filter(product => {
      const price = product.discont_price ?? product.price; // set sale price if given
      return price > minPrice && price < maxPrice;
      // — Для каждого товара:
      // Берём discont_price, если он есть, иначе price
      // Оставляем только товары в пределах minPrice < price < maxPrice
    })

    filtered.sort((a, b) => {
      const getPrice = product => product.discont_price ?? product.price;
      //       — Создаём вспомогательную функцию getPrice()
      // — Чтобы каждый раз брать нужную цену (со скидкой или обычную)

      switch (sorted) {

        //sort by price from low to high — Возрастание цены
        case "price-asc":
          return getPrice(a) - getPrice(b);

        //sort by price from high to low — Убывание цены
        case "price-desc":
          return getPrice(b) - getPrice(a);

        //sort by biggest sale
        case "discount":
          const aSale = a.discont_price ? Math.round((a.price - a.discont_price) / a.price * 100) : 0;
          const bSale = b.discont_price ? Math.round((b.price - b.discont_price) / b.price * 100) : 0;

          //shows "a" earlier, if it has sale
          if (a.discont_price && !b.discont_price) return -1;
          if (!a.discont_price && b.discont_price) return 1;
          return bSale - aSale;

        //— Считаем размер скидки в процентах.
        // — Сначала идут товары со скидками, затем сортируем по размеру скидки (большая — выше).

        default:
          return 0; //Без сортировки — порядок остаётся как есть.
      };
    })


    setFilteredProducts(filtered); //Сохраняем итоговый массив в filteredProducts.
  };

  useEffect(() => {//следим за изменениями
    filterProducts();
  }, [products, discounted, minPrice, maxPrice, sorted]); 
  //— При любом изменении:товаров,фильтров,диапазона цен,сортировки- вызываем filterProducts() заново.


  return (
    <div className="products-grid">
      {products.length > 0 ? filteredProducts.map(product => (
        <ProductCard key={product.id}
          discont_price={product.discont_price}
          image={product.image}
          title={product.title}
          price={product.price} />
      )
      )
        : <p className='products-empty'>No products found</p>
      }
    </div>
    // — Если товаров нет — выводим сообщение.
    // — Если товаров нет — выводим сообщение.
    // — Иначе — рендерим массив карточек с помощью .map() — это метод массива в JavaScript, который позволяет пройтись по каждому элементу массива и вернуть новый массив, в котором каждый элемент — это результат твоего преобразования.
    // — Для каждой карточки передаём нужные пропсы.
  )
}

// export default ProductList

// ✅ Что делает ProductList.jsx:
// Задача	Как реализовано
// Фильтрация по скидке	discounted чекбокс
// Фильтрация по цене	minPrice, maxPrice
// Сортировка	по цене и скидке
// Адаптация к разным условиям	через проп sales
// Отображение карточек	через ProductCard
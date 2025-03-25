import React, { useEffect, useState } from 'react'
// - **Импорт React** для использования компонентов.
// - **`useState`** – хук для создания состояния (например, ширины окна).
// - **`useEffect`** – хук, который выполняется после рендера (используется здесь для слежения за шириной окна).

const Breadcrumbs = () => {

  const url = window.location.pathname; //get url like "/categories/nursery";- Получаем **текущий URL-путь** из адресной строки, например:  

  const pathArray = url.split("/").filter(Boolean); //separate paths into links
  // filter(Boolean) убирает пустые строки из массива.

  const [width, setWidth] = useState(window.outerWidth);
  // - **Создаём состояние `width`**, в котором хранится **ширина окна браузера**.
  // - Инициализируем его текущей шириной окна (`window.outerWidth`).
  //Создаём обработчик события, который будет обновлять ширину при изменении размера окна.

  useEffect(() => {
    const resizeHandler = () => { setWidth(window.outerWidth) };
    // - Когда пользователь изменяет размер окна, вызывается `resizeHandler`.
    window.addEventListener("resize", resizeHandler);
    return () => { window.removeEventListener("resize", resizeHandler) }
    // Очищаем слушатель, чтобы не было утечек памяти.
    // Пустой массив [] означает, что useEffect выполнится только один раз — при монтировании компонента.
  }, []);



  return (
    <>
      {
        width > 767 &&
        // - **Условие `width > 767`** означает:  
        // показываем хлебные крошки **только на планшетах и десктопах**.
        <div className='breadcrumbs'>
          <div className="breadcrumbs__item">Main page</div>
          {/*  Обёртка для всех "крошек".
          Первая крошка — "Main page", она всегда есть. */}
          {
            pathArray.map((page, index) =>
              <div className='breadcrumbs__item' key={index}>{decodeURIComponent(page.split("-").join(" "))}</div>
            )
            /*- **Перебираем элементы пути** и отображаем их:
  - `"indoor-plants"` превратится в `"indoor plants"` (заменяем `-` на пробел).
  - `decodeURIComponent()` – декодирует URL (если были спецсимволы). */
          }
        </div>
      }
    </>
  )
}

export default Breadcrumbs

// - Экспортируем компонент, чтобы использовать его, например, в `AllProducts.jsx`, `Category.jsx`, `AllSales.jsx`.
// ## ✅ **ИТОГ: что делает этот компонент?**
// | Что делает            | Зачем? |
// | Определяет текущий URL | Чтобы построить цепочку страниц |
// | Разбивает путь в массив | Например: `["categories", "plants"]` |
// | Отображает хлебные крошки | Навигация + UX |
// | Следит за шириной окна | Не отображает крошки на мобильных устройствах |
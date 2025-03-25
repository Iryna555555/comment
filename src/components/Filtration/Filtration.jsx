import React, { useEffect, useState } from 'react'
// Подключаем React и хуки:
// useState — для локального состояния фильтра.
// useEffect — чтобы реагировать на изменения фильтров и отправлять их в Redux.
import "./Filtration.scss"; // Подключаем стили компонента.
import { useDispatch, useSelector } from 'react-redux';
// useDispatch — для отправки действий в Redux.
// useSelector — для получения данных из Redux-хранилища.
import { applyFilter, toggleDiscount } from '../../store/slices/filterSlice';
// Это фильтр товаров, который позволяет пользователю задавать диапазон цен, сортировку и включать фильтр скидок.


const Filtration = ({ discounted }) => {
    const dispatch = useDispatch(); // Создаём dispatch() — отправляем действия в Redux.

    const isChecked = useSelector(state => state.filter.discountActive); // Получаем значение: **включён ли фильтр "со скидкой"**.

    const [filterData, setFilterData] = useState(useSelector(state => state.filter))
    // Создаём локальное состояние filterData, инициализируя его значениями из Redux (minPrice, maxPrice, sorted).
    // Это локальная копия фильтров, которую мы можем редактировать по ходу.

    const handleToggleDiscount = () => {
        dispatch(toggleDiscount());
        //  Обработчик клика по чекбоксу "со скидкой" — **включает/выключает фильтр скидок**.
    }


    const changeInputHandler = (e) => {
        setFilterData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        //  Общий обработчик всех инпутов и селекта:
        // Использует name поля (minPrice, maxPrice, sorted), чтобы изменить нужное поле в filterData.
    }

    useEffect(() => {
        dispatch(applyFilter(filterData));
        // **Следим за `filterData`**.  
        // - Когда пользователь меняет значение — отправляем `applyFilter(filterData)` в Redux.
    }, [filterData]);


    return (
        <div className="filtration">
            {/* price section */}
            <div className="filtration__price">
                <span className="filtration__label">Price</span>
                <input
                    type="number"
                    className="filtration__input"
                    name="minPrice"
                    placeholder="from"
                    value={filterData.minPrice}
                    onChange={(e) => changeInputHandler(e)}
                />
                <input
                    type="number"
                    className="filtration__input"
                    name='maxPrice'
                    placeholder="to"
                    value={filterData.maxPrice}
                    onChange={(e) => changeInputHandler(e)}
                />
            </div>

            {/* sales checkbox */}
            {
                discounted &&
                <div className="filtration__discount">
                    <label htmlFor="discounted" className="filtration__discount-label">
                        Discounted items
                    </label>
                    <input type="checkbox" id="discounted" onClick={handleToggleDiscount} defaultChecked={isChecked ? true : false} />
                </div>
                /*Показывается только если discounted === true.
                 Чекбокс переключает discountActive в Redux.*/

            }


            {/* sorting */}
            <div className="filtration__sort">
                <span className="filtration__label">Sorted</span>
                <select className="filtration__select" name='sorted' onChange={(e) => changeInputHandler(e)} value={filterData.sorted}>
                    <option value="default">by default</option>
                    <option value="price-asc">price (low to high)</option>
                    <option value="price-desc">price (high to low)</option>
                    <option value="discount">biggest discount</option>
                </select>
            </div>
            {/**Выпадающее меню для выбора способа сортировки:
             default, по возрастанию, по убыванию, по скидке. */}
        </div>

    )
}

export default Filtration
//Экспортируем компонент, чтобы использовать в AllProducts, AllSales, Category и других.

// Что делает	| Как работает
// Фильтрует по цене	| minPrice, maxPrice инпуты
// Включает/выключает "только скидки"	| Чекбокс и toggleDiscount()
// Применяет сортировку	| Селект и applyFilter()
// Связывается с Redux	| Через dispatch() и useSelector()
// Сразу применяет фильтр при изменениях	| Через useEffect()

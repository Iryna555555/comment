import { createSlice } from "@reduxjs/toolkit";
//Redux Toolkit используется для управления глобальным состоянием 
// приложения. В каждом slice-файле мы создаём хранилище (state), 
// определяем действия (reducers) и асинхронные запросы (extraReducers).

export const filterSlice = createSlice({ // Этот файл управляет фильтрацией товаров по цене, скидкам и сортировке.
    name: "filter",
    initialState: { // Создаём initialState (начальное состояние):
        discountActive: false, // // Фильтр "только товары со скидкой"
        minPrice: 0,
        maxPrice: 99999,
        sorted: "" //  // Тип сортировки (по цене, по скидке и т.д.)
    },
    reducers: { // Определяем reducers (функции для управления состоянием):
        toggleDiscount: (state) => { // включает/выключает фильтр скидок.
            state.discountActive = !state.discountActive;
        },
        applyFilter: (state, action) => { // обновляет диапазон цен и тип сортировки.
            state.minPrice = Number(action.payload.minPrice);
            state.maxPrice = Number(action.payload.maxPrice);
            state.sorted = action.payload.sorted;
        },
    }
})

export const { toggleDiscount, applyFilter } = filterSlice.actions;
export default filterSlice.reducer;

// Что здесь происходит?
// filterSlice.actions – объект, содержащий все функции-редьюсеры, объявленные в reducers внутри filterSlice.
// Используем деструктуризацию, чтобы экспортировать только нужные действия:
// toggleDiscount – переключает состояние фильтра "только товары со скидкой".
// applyFilter – применяет фильтрацию по минимальной/максимальной цене и типу сортировки.

// Что здесь происходит?
// filterSlice.reducer – сама функция-редьюсер, которая управляет состоянием фильтров (discountActive, minPrice, maxPrice, sorted).
// export default позволяет подключить этот редьюсер в store/index.js, чтобы Redux мог его использовать.
import { createSlice } from '@reduxjs/toolkit';
// createSlice — это функция из Redux Toolkit, которая облегчает работу
// с reducers, actions и state.

export const themeSlice = createSlice({
    // Создаём themeSlice (глобальное состояние темы)
    // createSlice() создаёт часть глобального хранилища Redux для 
    // управления темой.
    name: "theme", // name: "theme" – в Redux DevTools этот срез (slice) будет отображаться под именем "theme".
    initialState: {
        isDark: false
        // Определяем начальное состояние (initialState)
        // isDark: false
        // По умолчанию светлая тема (false).
        // Если isDark: true, значит включена тёмная тема.
    },
    reducers: {
        toggleTheme: (state) => {
            state.isDark = !state.isDark;
            // Определяем reducers (функции, изменяющие state)
            // toggleTheme(state)
            // Инвертирует (!state.isDark) значение isDark:
            // Если была светлая (false), станет тёмной (true).
            // Если была тёмная (true), станет светлой (false).
            // При вызове dispatch(toggleTheme()) Redux изменит state.isDark.
        }
    }
})

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;

// Экспортируем toggleTheme (action)
// toggleTheme – действие (action), которое можно вызывать в компонентах через dispatch(toggleTheme()).
// Экспортируем themeSlice.reducer
// Позволяет подключить themeReducer в store/index.js.

// Итог
// ✅ themeSlice.js управляет тёмной и светлой темой.
// ✅ Хранит в state.isDark (true - тёмная, false - светлая).
// ✅ Функция toggleTheme() переключает тему.
// ✅ themeSlice.reducer подключается в store/index.js.


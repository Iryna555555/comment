import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "../api/category"; // Импортируем fetchCategories, который делает асинхронный запрос на сервер, чтобы загрузить список категорий.

//Redux Toolkit используется для управления глобальным состоянием 
// приложения. В каждом slice-файле мы создаём хранилище (state), 
// определяем действия (reducers) и асинхронные запросы (extraReducers).
// categorySlice.js (Управление категориями товаров)
// Этот файл управляет загрузкой категорий и их хранением.

const getStoredCategories = () => {
    const storedCategories = localStorage.getItem("categories"); // получаем сохранённые категории.
    return storedCategories ? JSON.parse(storedCategories) : [];
    //Преобразуем JSON в объект:
    // Если localStorage содержит данные, используем JSON.parse(), чтобы превратить строку в массив.
    // Если данных нет, возвращаем пустой массив [].
};

const initialState = { // Определяем начальное состояние 
    categories: getStoredCategories(),
    //При загрузке приложения мы проверяем localStorage.
    // Если там есть категории, загружаем их, иначе создаём пустой массив.
    status: "idle",
    // idle – означает, что загрузка ещё не началась.
    // Может меняться на "loading", "succeeded", "failed".
    // "loading" – идёт загрузка (данные запрашиваются с сервера).
    // "succeeded" – успешно загружено (данные получены и сохранены в state).
    // "failed" – ошибка загрузки (сервер не ответил, ошибка сети и т. д.).
    error: null // Если во время загрузки произошла ошибка, она будет сохранена здесь.
};

const categorySlice = createSlice({ // Создаём categorySlice (глобальное состояние категорий)
    name: "category", // Имя хранилища в Redux.
    initialState, // Используем ранее объявленный объект initialState.
    reducers: {

        initCategoriesFromLocalStorage: (state) => {
            state.categories = getStoredCategories();
            // При вызове этого действия (dispatch(initCategoriesFromLocalStorage()))
            // данные из localStorage загружаются в state.categories.
        }
    },
    extraReducers: (builder) => { // Используем extraReducers для загрузки категорий из API (fetchProducts.fulfilled)
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = "loading";
                // Обрабатываем загрузку категорий (extraReducers)
                // fetchCategories.pending – когда начинается загрузка данных:
                // Меняем state.status на "loading".
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.categories = action.payload;
                localStorage.setItem("categories", JSON.stringify(action.payload));
                // Когда данные загружены (fetchCategories.fulfilled)
                // Меняем state.status на "succeeded" (данные успешно загружены).
                // Сохраняем загруженные категории в state.categories.
                // Сохраняем данные в localStorage, чтобы при следующем открытии страницы они загружались быстрее.
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
                // Если загрузка не удалась (fetchCategories.rejected)
                // Меняем state.status на "failed".
                // Сохраняем текст ошибки в state.error.
            });
    }
});

export const { initCategoriesFromLocalStorage } = categorySlice.actions;

export default categorySlice.reducer;

// Экспортируем slice
// Экспортируем initCategoriesFromLocalStorage, чтобы загружать данные из localStorage.
// Экспортируем categorySlice.reducer для подключения в store/index.js.
// Итог
// ✅ categorySlice.js управляет загрузкой и хранением категорий товаров.
// ✅ Загружает данные из API (fetchCategories).
// ✅ Сохраняет категории в localStorage для быстрого доступа.
// ✅ В extraReducers обрабатывает три состояния (loading, succeeded, failed).




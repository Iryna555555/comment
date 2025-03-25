import { createAsyncThunk } from "@reduxjs/toolkit";
// В этой папке хранятся асинхронные функции, которые загружают данные
//  с сервера. Эти функции используют fetch() для запроса данных и 
// createAsyncThunk из @reduxjs/toolkit, чтобы Redux мог управлять их 
// состоянием.

// category.js (Загрузка категорий товаров)
// Этот файл отвечает за загрузку списка категорий с сервера.


export const fetchCategories = createAsyncThunk(//Создаём fetchCategories – асинхронную функцию загрузки категорий
    // Импортируем createAsyncThunk 
    // createAsyncThunk — это функция из Redux Toolkit, которая создаёт асинхронные действия.
    // Она позволяет Redux отслеживать статус запроса (например, "loading", "succeeded", "failed").
    // "loading" – идёт загрузка (данные запрашиваются с сервера).
    // "succeeded" – успешно загружено (данные получены и сохранены в state).
    // "failed" – ошибка загрузки (сервер не ответил, ошибка сети и т. д.).
    "category/fetchCategories", // Это имя для Redux, по которому он отслеживает статус загрузки.
    async (_, { rejectWithValue }) => {
        // Первый аргумент _ – здесь мог бы быть payload, но он не нужен 
        // (поэтому _).Если нужно передавать динамические параметры в fetch(), то payload используется
        // Второй аргумент { rejectWithValue } – специальная функция, 
        // чтобы возвращать ошибки.
        // Разбираем rejectWithValue
        // Функция rejectWithValue() – это специальный метод, который 
        // предоставляется вторым аргументом в createAsyncThunk.
        try {
            const response = await fetch("https://exam-server-5c4e.onrender.com/categories/all");
            // fetch("https://exam-server-5c4e.onrender.com/categories/all") – отправляем GET-запрос на сервер.
            if (!response.ok) {
                throw new Error("Failed to fetch categories");
                // Проверяем, успешно ли загружены данные
                // response.ok – true, если сервер вернул статус 200.
                // Если сервер вернул ошибку (404, 500 и т. д.), вызываем throw new Error().
            }
            const data = await response.json();
            // await – ждём, пока сервер ответит.
            // await response.json() – превращаем текстовый ответ сервера в массив категорий.
            // response – объект с ответом от сервера.
            console.log(data);
            // console.log(data); – выводим данные в консоль (полезно для отладки).
            return data;
            // return data; – возвращаем загруженные категории.
        } catch (error) {
            return rejectWithValue(error.message);
            // Обрабатываем ошибки
            // Если try не сработает (catch), значит произошла ошибка (например, нет интернета).
            // rejectWithValue(error.message) – передаём текст ошибки в Redux store.
        }
    }
);

// 🔥 Итог
// ✅ category.js загружает список категорий.
// ✅ productApi.js загружает список товаров и сохраняет их в localStorage.
// ✅ Оба файла используют fetch() и createAsyncThunk, чтобы Redux следил за статусом загрузки.

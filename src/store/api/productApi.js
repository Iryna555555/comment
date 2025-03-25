import { createAsyncThunk } from '@reduxjs/toolkit';
// В этой папке хранятся асинхронные функции, которые загружают данные
//  с сервера. Эти функции используют fetch() для запроса данных и 
// createAsyncThunk из @reduxjs/toolkit, чтобы Redux мог управлять их 
// состоянием.

export const fetchProducts = createAsyncThunk( //Создаём fetchProducts – асинхронную функцию загрузки товаров
  // Импортируем createAsyncThunk 
  // createAsyncThunk — это функция из Redux Toolkit, которая создаёт асинхронные действия.
  // Она позволяет Redux отслеживать статус запроса (например, "loading", "succeeded", "failed").
  // "loading" – идёт загрузка (данные запрашиваются с сервера).
  // "succeeded" – успешно загружено (данные получены и сохранены в state).
  // "failed" – ошибка загрузки (сервер не ответил, ошибка сети и т. д.).
  'products/fetchProducts', //имя действия Redux.
  async () => { // async () => {} – функция, которая загружает данные.
    const response = await fetch('https://exam-server-5c4e.onrender.com/products/all');
    // fetch('https://exam-server-5c4e.onrender.com/products/all') – запрашиваем все товары.
    // await – ждём, пока сервер ответит.
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
      // Проверяем, успешно ли загружены данные
      // Если сервер вернул ошибку (404, 500 и т. д.), выбрасываем ошибку.
      // throw new Error() – останавливает выполнение кода и передаёт ошибку в catch.
    }
    const data = await response.json();
    //Преобразуем ответ сервера в JSON
    // await response.json() – превращает текстовый ответ сервера в массив товаров.

    localStorage.setItem('products', JSON.stringify(data));
    // Сохраняем список товаров в браузер.
    // В следующий раз товары можно загрузить из localStorage, не обращаясь к серверу.

    return data;
    // return data; – Redux получит список товаров и сохранит его в store.products.
  }
);

// 🔥 Итог
// ✅ category.js загружает список категорий.
// ✅ productApi.js загружает список товаров и сохраняет их в localStorage.
// ✅ Оба файла используют fetch() и createAsyncThunk, чтобы Redux следил за статусом загрузки.



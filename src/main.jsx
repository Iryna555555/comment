import { createRoot } from 'react-dom/client' // Импорт API для рендера React
import './index.scss' // Глобальные стили
import App from './App.jsx' // Главный компонент приложения

// Находим контейнер в `index.html`, куда будем рендерить приложение
createRoot(document.getElementById('root')).render(    
    <App /> // Вставляем <App /> в корневой элемент
)

// 📌 Разбор кода:

// createRoot(document.getElementById('root')) – создаёт корневой React-узел.
// render(<App />) – рендерит в него компонент <App />.
// index.scss – глобальные стили для всего проекта.

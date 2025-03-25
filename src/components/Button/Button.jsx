import React from 'react' // - Импортируем React, чтобы использовать JSX и компоненты.

const Button = ({ children, type, onClick, className }) => {

    // Объявляем компонент Button как функциональный компонент.
    // Используем деструктуризацию props:
    // children — контент внутри кнопки (например, текст "Add to Cart").
    // type — тип кнопки (например "primary", "secondary", "added", "submitted").
    // onClick — функция, которая вызывается при клике.
    // className — дополнительный CSS-класс, переданный извне.


    const initButton = (type) => { // - Вспомогательная функция, которая **на основе `type` возвращает нужную кнопку**.
        //renders button according to type prop
        switch (type) { // каждая кнопка:
            case "primary":
                return (
                    <button className={`btn btn-primary ${className ? className : ""}`} onClick={onClick}>{children}</button>
                )
            // Основной стиль кнопки (btn-primary).
            // Добавляем доп. классы, если className передан.
            // onClick={onClick} – обработчик клика.
            // {children} – текст кнопки (можно передать любой контент).

            case "secondary":
                return (
                    <button className={`btn btn-secondary ${className ? className : ""}`} onClick={onClick}>{children}</button>
                )
            // Альтернативная кнопка с другим стилем (btn-secondary).
            // Также работает с onClick и children.

            case "added":
                return (
                    <button className={`btn btn-added ${className ? className : ""}`}>Added</button>
                )
            // Кнопка "Added", которая всегда содержит текст Added.
            // onClick не передаётся — кнопка, скорее всего, не интерактивна (например, когда товар уже добавлен).

            case "submitted":
                return (
                    <button className={`btn btn-submitted ${className ? className : ""}`}>Request Submitted</button>
                )
            // Кнопка с текстом "Request Submitted" — например, для формы скидки.
            // Тоже без onClick.

            default: return (
                <button className={`btn btn-primary ${className ? className : ""}`} onClick={onClick}>{children}</button>
            )
            //default: — если type не передан или не распознан
            //По умолчанию используем btn-primary и показываем children.

        }
    }

    return (
        initButton(type) //  Рендерим кнопку, которую выбрала функция `initButton()`.
    )
}

export default Button

// Итог — что делает этот компонент:
// Что умеет	Как
// Отображает кнопки разных стилей	| type="primary" или "secondary" и т.д.
// Позволяет добавлять onClick	| через пропсы
// Работает с произвольным текстом/иконками |	через children
// Гибко кастомизируется	| через className

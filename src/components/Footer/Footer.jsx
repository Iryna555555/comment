// Этот компонент отвечает за нижнюю часть страницы с контактами, картой и социальными ссылками.
import React from 'react' // Подключаем React — чтобы можно было использовать JSX.
import './Footer.scss' //Подключаем SCSS-стили для компонента.
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
// Импортируем иконки Instagram и WhatsApp из библиотеки react-icons.
import { Link } from 'react-router-dom' //  Link — для создания ссылок без перезагрузки страницы (из React Router).

const Footer = () => {


  return (
    <footer className="footer"> {/*<footer> — семантический тег для нижней части сайта. */}
      <div className="contact"> {/* Обёртка для всей контактной информации: телефон, соцсети, адрес и рабочее время. */}
        <h1 className='page-title'>Contact</h1> {/* Заголовок секции — "Contact" (может использоваться CSS-класс page-title из общих стилей). */}
        <ul className='contact-list'> {/* Список, содержащий отдельные блоки: телефон, соцсети, адрес и время. */}
          <li className='contact-list__item'>
            <h3>Phone</h3>
            <a href="tel:+499999999999">+49 999 999 99 99</a> {/*— Заголовок Phone, ниже — ссылка tel:.
— При клике на неё на телефоне откроется вызов. */}
          </li>
          <li className='contact-list__item'>
            <h3>Socials</h3>
            <div className="social-icons">
              <Link to="https://www.instagram.com/">
                <FaInstagram />
              </Link>
              <Link to="https://web.whatsapp.com/">
                <FaWhatsapp />
              </Link>
            </div>
          </li>

          <li className='contact-list__item'>
            <h3>Address</h3>
            <p>Linkstraße 2, 8 OG, 10785, Berlin, Deutschland</p>
          </li>
          <li className='contact-list__item'>
            <h3>Working Hours</h3>
            <p>24 hours a day</p>
          </li>
        </ul>

        <div className="map">
          <iframe className='map__styles'
            title="google_map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9713.636886541603!2d13.3750447!3d52.5079329!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a8515353a68755%3A0xd0866511db4f838f!2sStarta%20Institute%20by%20Tel-Ran!5e0!3m2!1sru!2sde!4v1704283318371!5m2!1sen!2sde"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade" />
          {/* Google карта, встроенная через <iframe>.
— Показывает местоположение компании (адрес соответствует адресу выше).
— Атрибуты:
loading="lazy" — отложенная загрузка (ускоряет сайт).
referrerPolicy="no-referrer-when-downgrade" — защита данных при переходах. */}
        </div>
      </div>
    </footer >
  )
}

export default Footer;
//  Делаем экспорт, чтобы использовать <Footer /> в Layout.jsx.

// ИТОГ — что делает Footer.jsx:
// Что отображает	| Где
// Телефон | 	tel: ссылка
// Социальные сети	| с иконками
// Адрес	| текст
// Время работы	| текст
// Карта	| Google-карта через iframe

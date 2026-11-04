import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { contacts } from '../data/contacts';
import { SITE_URL } from '../data/site';

export default function PrivacyPage() {
  return (
    <>
      <Seo
        title="Политика обработки персональных данных — СимфИнвестСтрой"
        description="Порядок обработки и защиты персональных данных посетителей сайта simf-invest-stroy.ru"
        canonical={`${SITE_URL}/privacy`}
        noindex
      />
      <section className="pt-40 pb-16">
        <div className="container-site max-w-3xl">
          <Link to="/" className="text-sm text-primary hover:underline">
            ← На главную
          </Link>

          <h1 className="text-3xl md:text-4xl font-black mt-4 mb-3">
            Политика обработки персональных данных
          </h1>
          <p className="text-sm text-body mb-10">
            Редакция от 4 ноября 2026 года. Сайт: {SITE_URL}
          </p>

          <div className="space-y-8 text-base leading-relaxed text-dark">
            <section>
              <h2 className="text-xl font-bold mb-2">1. Общие сведения</h2>
              <p>
                Настоящая Политика определяет порядок обработки персональных
                данных посетителей сайта {SITE_URL} (далее — Сайт). Оператор
                персональных данных — компания «СимфИнвестСтрой» (далее —
                Оператор).
              </p>
              <p>
                Отправляя заявку через форму на Сайте и отмечая согласие,
                посетитель подтверждает, что ознакомлен с настоящей Политикой и
                даёт согласие на обработку своих персональных данных на
                условиях, изложенных ниже.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-2">
                2. Какие данные обрабатываются
              </h2>
              <p>Оператор обрабатывает данные, которые посетитель указывает сам:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>имя;</li>
                <li>номер телефона;</li>
                <li>город;</li>
                <li>площадь помещения.</li>
              </ul>
              <p className="mt-2">
                Дополнительно автоматически фиксируются технические сведения:
                IP-адрес, дата и время отправки, адрес страницы, с которой
                отправлена заявка. Паспортные данные, данные банковских карт и
                иные специальные категории данных Сайт не собирает.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-2">3. Цели обработки</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>обработка заявки и обратная связь с посетителем;</li>
                <li>расчёт стоимости работ и консультация;</li>
                <li>согласование выезда замерщика;</li>
                <li>ведение внутреннего учёта обращений.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-2">4. Правовые основания</h2>
              <p>
                Обработка осуществляется на основании согласия посетителя,
                выраженного при отправке формы (пункт 1 статьи 6 Федерального
                закона № 152-ФЗ «О персональных данных»), а также в целях
                исполнения договора или подготовки к его заключению.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-2">
                5. Передача данных третьим лицам
              </h2>
              <p>
                Оператор не продаёт и не передаёт персональные данные третьим
                лицам для рекламы. Данные могут передаваться только в объёме,
                необходимом для доставки заявки:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>хостинг-провайдеру, на серверах которого размещён Сайт;</li>
                <li>сервису электронной почты — для доставки уведомления о заявке;</li>
                <li>мессенджеру MAX — если этот канал уведомлений подключён Оператором.</li>
              </ul>
              <p className="mt-2">
                Передача осуществляется по защищённым каналам связи и только в
                объёме, необходимом для обработки заявки.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-2">6. Сроки хранения</h2>
              <p>
                Персональные данные хранятся до достижения целей обработки, но не
                более 12 месяцев с даты последнего взаимодействия с посетителем,
                либо до отзыва согласия. После этого данные удаляются или
                обезличиваются.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-2">7. Права посетителя</h2>
              <p>Посетитель вправе:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>получить информацию об обработке своих данных;</li>
                <li>требовать уточнения, блокирования или удаления данных;</li>
                <li>отозвать согласие на обработку в любой момент.</li>
              </ul>
              <p className="mt-2">
                Для этого достаточно написать на{' '}
                <a href={`mailto:${contacts.email}`} className="text-primary underline">
                  {contacts.email}
                </a>{' '}
                или позвонить по номеру {contacts.phone1}.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-2">8. Cookies и аналитика</h2>
              <p>
                Сайт не использует рекламные и аналитические cookie-файлы.
                Технические cookie могут использоваться браузером и
                хостинг-провайдером для корректной работы Сайта.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-2">9. Изменения Политики</h2>
              <p>
                Оператор вправе изменять настоящую Политику. Новая редакция
                публикуется на этой странице с указанием даты.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-2">10. Контакты</h2>
              <p>
                По вопросам обработки персональных данных:{' '}
                <a href={`mailto:${contacts.email}`} className="text-primary underline">
                  {contacts.email}
                </a>
                , телефоны: {contacts.phone1}, {contacts.phone2}.
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}

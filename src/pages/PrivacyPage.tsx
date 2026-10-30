import Seo from "../components/Seo";

export default function PrivacyPage() {
  return (
    <>
      <Seo
        title="Политика конфиденциальности — СимфИнвестСтрой"
        description="Политика обработки персональных данных сайта simfinvestroy.ru"
        canonical="https://simfinvestroy.ru/privacy"
        noindex
      />
      <section className="pt-40 pb-16">
        <div className="container-site max-w-3xl prose prose-sm md:prose-base">
          <h1 className="text-3xl font-black mb-6">
            Политика конфиденциальности
          </h1>
          <p>
            Настоящая Политика конфиденциальности описывает, как сайт
            simfinvestroy.ru собирает, использует и защищает персональные данные
            пользователей.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">
            1. Какие данные мы собираем
          </h2>
          <p>
            При отправке заявки через форму мы собираем имя, номер телефона,
            город и площадь помещения. Данные передаются в Telegram-бот и
            используются только для связи с клиентом.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">
            2. Как мы используем данные
          </h2>
          <p>
            Мы используем данные исключительно для обработки заявок и связи с
            клиентом. Мы не передаём данные третьим лицам.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">3. Контакты</h2>
          <p>
            По вопросам обработки персональных данных: alim.simf@mail.ru
          </p>
        </div>
      </section>
    </>
  );
}
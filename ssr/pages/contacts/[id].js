const Contacts = ({ data }) => {
  return (
    <div>
      <p>{String(data.id)}</p>
      <p>{String(data.name)}</p>
      <p>{String(data.username)}</p>
      <p>{String(data.email)}</p>
      <p>{String(data.phone)}</p>
      <p>{String(data.website)}</p>
    </div>
  );
};

// Плюсы
// Быстрее видно приложение на клиенте
// Лучшая индексация, т.к. приходит готовый хтмл
// Меньше нагрузка на слабые устройства

// Минусы
// Сложнее в написании и поддержке
// Повышенные затраты на серверные ресурсы, особенно если больше пользователей
// Ограничения на использование сторонних библиотек


export const getServerSideProps = async ({ params }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.id}`
  );
  const data = await response.json();

  return {
    props: { data },
  };
};

export default Contacts;

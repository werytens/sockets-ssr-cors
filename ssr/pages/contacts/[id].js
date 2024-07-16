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

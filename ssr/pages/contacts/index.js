const Contacts = ({ data }) => {
  return <div>{String(data.name)}</div>;
};

export const getServerSideProps = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const data = await response.json();

  return {
    props: { data },
  };
};

export default Contacts;

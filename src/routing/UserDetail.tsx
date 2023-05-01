import { useParams } from 'react-router-dom';

const UserDetail = () => {
  const { id } = useParams();
  return <p>User {id}</p>;
};

export default UserDetail;

import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import getUser from '../../api/getUser';

const User = ({ user }) => {
  const router = useRouter();

  if (!user) {
    return (<div>No such user</div>);
  }

  return (
    <>
      <h1>Username: {user.userName}</h1>
      matches:
      {
        user.matches.map((m) => (
          <div>Match {m}</div>
        ))
      }
    </>
  );
};

User.getInitialProps = async ({ query: { userName } }) => {
  const user = getUser(userName);
  if (user && user.id) {
    return { user: { userName: userName, matches: [1,2,3]}};
  } else {
    return { user: null };
  }
};

export default User;
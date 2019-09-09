import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';

const User = ({ user }) => {
  const router = useRouter();

  return (
    <>
      <h1>Username: {user.userName}</h1>
      matches:
      {
        user.matches.map((m) => (
          <div>Match</div>
        ))
      }
    </>
  );
};

User.getInitialProps = async ({ query }) => {
  const res = await fetch(`http://localhost:5000/users/${query.userName}`);
  const json = await res.json();
  console.log(json);

  return { user: json };
};

export default User;
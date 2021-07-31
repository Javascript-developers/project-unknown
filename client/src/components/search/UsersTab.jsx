import React from 'react';
import { useSelector } from 'react-redux';
import MiniUserCard from '../layout/MiniUserCard';

const UsersTab = () => {
  const users = useSelector((state) => state.user.searchedUsers);
  return (
    // <div>{users && users.map((user, i) => <div key={i}>{user.name}</div>)}</div>
    <div>
      {users && users.map((user, i) => <MiniUserCard key={i} user={user} />)}
    </div>
  );
};

export default UsersTab;

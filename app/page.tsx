"use client"

import { useState, useEffect } from 'react';
import UserItem from './../src/component/UserItem';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface FetchResponse {
  data: User[];
  page: number;
  total_pages: number;
  per_page: number;
}

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      setIsLoading(true);

      const response = await fetch(`https://reqres.in/api/users?page=${page}`);
      const data: FetchResponse = await response.json();

      if (data && data.data) {
        setUsers(prevUsers => {
          const newUsers = data.data.filter(
            newUser => !prevUsers.some(user => user.id === newUser.id)
          );
          return [...prevUsers, ...newUsers];
        });
        setIsLoading(false);

        if (data.page >= data.total_pages) {
          setHasMore(false);
        }
      }
    }

    fetchUsers();
  }, [page]);

  return (
    <div className="wrapper">
      {isLoading ? (
        <div className="spinner_container">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <div className="users-list">
            {users.map(user => (
              <UserItem key={user.id} user={user} />
            ))}
          </div>
          <div className="button-container">
            {hasMore ? (
              <button className="oswald btn_load" onClick={() => setPage(prevPage => prevPage + 1)}>
                Load more
              </button>
            ) : (
              <button disabled className="oswald btn_load">No more items</button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
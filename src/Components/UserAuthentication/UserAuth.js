import React, { useEffect, useState } from 'react';
import useFetch from './fetch/useFetch';

function UserAuth() {
  const { result, getAsJson, fetchError } = useFetch();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (result) {
      setUsers(result);

    }
  }, [result]);
  useEffect(() => {
    if (fetchError) {

    }
  }, [fetchError]);

  useEffect(() => {
    if (users.length > 0) {

    }
  }, [users]);
  function getJson() {
    getAsJson({ url: 'http://dummy.restapiexample.com/api/v1/employees' });
  }
  return (
    <div>
      UserAuth
      <button type="button" onClick={getJson}>
        Get
      </button>
    </div>
  );
}

export default UserAuth;

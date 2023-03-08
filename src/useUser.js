import axios from "axios";
import { useEffect, useState } from "react";

export const useUser = ( userId ) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    (async () => {
        const response = await axios.get(`/users/${userId}`);
        console.log(response)
      setUser(response.data);
    })();
  }, [userId]);
  return user;
};

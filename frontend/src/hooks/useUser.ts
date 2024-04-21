import axios from "axios";
import { useEffect, useState } from "react";

type IUser = {
  name: string;
  _id: string;
  picture: string;
  isAdmin: string;
};

export const useUser = (): IUser => {
  const [user, setUser] = useState();
  const [loading, setloading] = useState(false);

  const getUser = async () => {
    try {
      setloading(true);
      const { data } = await axios.get("/user/me");
      setUser(data);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      getUser();
    }
  }, []);

  return user;
};

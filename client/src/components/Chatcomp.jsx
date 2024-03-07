import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Chatcomp = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:8000/users/verify").then((res) => {
      if (res.data.status) {
      } else {
        navigate("/");
      }
    });
  }, []);
  return <div>Chatcomp</div>;
};

export default Chatcomp;

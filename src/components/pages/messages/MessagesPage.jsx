import Msg from "./msgComponents/Msg";
import { useLocation } from "react-router-dom";

const MessagesPage = () => {
  const location = useLocation();
  // Check if an adopterId is passed in state
  const adopterIdFromState = location.state?.adopterInfo;

  return (
    <>
      <Msg adopterInfo={adopterIdFromState}/>
    </>
  );
};

export default MessagesPage;

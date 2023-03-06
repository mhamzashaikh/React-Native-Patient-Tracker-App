import { useContext } from "react";
import AuthContext from "./AuthContext";
import BottomTabNavigation from "./src/BottomTabNavigation";

function ProtectedWrapper(props) {
  const auth = useContext(AuthContext);
  console.log("====================================");
  console.log(auth);
  console.log("====================================");

  if (!auth.user) {
    return props.navigation.navigate("Login");
  }

  return <BottomTabNavigation />;
}

export default ProtectedWrapper;

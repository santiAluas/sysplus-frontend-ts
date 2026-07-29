import { Decrypt_User } from "@/services/Storage_Service";
import { useEffect, useState } from "react";

const ControlMatriculacion = () => {
        const [token, setToken] = useState("");
      useEffect(() => {
        const user = Decrypt_User();
        if (!user) {
          return;
        }
        setToken(user.Token ?? "");
      }, []);
    
  return (
    <div>
        <mf-control-matriculacion accessKey={token}/>
    </div>
  )
}

export default ControlMatriculacion
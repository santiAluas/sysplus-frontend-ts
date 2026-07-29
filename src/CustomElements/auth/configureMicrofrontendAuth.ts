import { Decrypt_User } from "@/services/Storage_Service";
import { MicrofrontendElement } from "../types/MicrofrontendElement";


export const configureMicrofrontendAuth = (
  element: MicrofrontendElement | null
): void => {

    const user = Decrypt_User();

  if (!element) {
    return;
  }

  element.authProvider = {
    getToken: () =>
      user.Token,
  };
};
export type AuthProvider = {
  getToken: () => string | null;
};

export type MicrofrontendElement = HTMLElement & {
  authProvider: AuthProvider;
};
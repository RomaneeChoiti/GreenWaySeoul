import { create } from 'zustand';

interface LoginState {
  isLoggedIn: boolean;
  setLoginStatus: (status: boolean) => void;
}
/*
  TODO: 소셜 로그인 설정이 완료되면
    1. 로그인 상태를 true로 변경
      - isLoggedIn: true,
    2. 비로그인 상태를 false로 변경
      - isLoggedIn: false,
*/
const useLoginStore = create<LoginState>(set => ({
  isLoggedIn: true,
  setLoginStatus: (status: boolean) => set({ isLoggedIn: status }),
}));

export default useLoginStore;
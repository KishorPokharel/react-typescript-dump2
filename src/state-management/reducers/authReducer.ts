interface LoginAction {
  type: 'LOGIN';
  username: string;
}

interface LogoutAction {
  type: 'LOGOUT';
}

type AuthAction = LoginAction | LogoutAction;

const authReducer = (state: string, action: AuthAction): string => {
  switch (action.type) {
    case 'LOGIN':
      return action.username;
    case 'LOGOUT':
      return '';
  }
};
export default authReducer;

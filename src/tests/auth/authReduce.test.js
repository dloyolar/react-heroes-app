import { authReducer } from '../../auth/authReducer';
import { types } from '../../types/types';

describe('Test on authReducer', () => {
  test('should be return state by default', () => {
    const state = authReducer({ logged: false }, {});
    expect(state).toEqual({ logged: false });
  });

  test('should be auth and set name of user', () => {
    const action = {
      type: types.login,
      payload: {
        name: 'Diego',
      },
    };

    const state = authReducer({ logged: false }, action);
    expect(state).toEqual({
      logged: true,
      name: 'Diego',
    });
  });

  test('should be delete the name and logged = false', () => {
    const action = {
      type: types.logout,
    };

    const state = authReducer({ logged: true, name: 'Diego' }, action);

    expect(state).toEqual({
      logged: false,
    });
  });
});

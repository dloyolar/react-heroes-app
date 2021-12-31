import { mount } from 'enzyme';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { types } from '../../../types/types';
import { AuthContext } from '../../../auth/authContext';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Test on <LoginScreen />', () => {
  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: false,
    },
  };
  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );
  test('should be display correctly and match with snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should dispatch have been called and navigate', () => {
    const handleClick = wrapper.find('button').prop('onClick');
    handleClick();
    expect(contextValue.dispatch).toHaveBeenCalledWith({
      payload: { name: 'Diego' },
      type: types.login,
    });

    expect(mockNavigate).toHaveBeenCalledWith('/marvel', { replace: true });

    localStorage.setItem('lastPath', '/dc');

    handleClick();

    expect(mockNavigate).toHaveBeenCalledWith('/dc', { replace: true });
  });
});

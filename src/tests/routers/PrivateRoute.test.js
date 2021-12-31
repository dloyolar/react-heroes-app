import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { PrivateRoute } from '../../routers/PrivateRoute';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: () => <span>Exiting</span>,
}));

describe('Test on <PrivateRoute />', () => {
  Storage.prototype.setItem = jest.fn();
  test('should be display the component if is auth and save un localStorage', () => {
    const contextValue = {
      user: {
        logged: true,
        name: 'Diego',
      },
    };

    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/']}>
          <PrivateRoute>
            <h1>Private Component</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(wrapper.text().trim()).toBe('Private Component');
    expect(localStorage.setItem).toHaveBeenLastCalledWith('lastPath', '/');
  });

  test('should be block the component if isnt auth', () => {
    const contextValue = {
      user: {
        logged: false,
      },
    };

    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/']}>
          <PrivateRoute>
            <h1>Private Component</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(wrapper.text()).toBe('Exiting');
  });
});

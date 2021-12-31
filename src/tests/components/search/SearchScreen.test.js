import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { SearchScreen } from '../../../components/search/SearchScreen';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Test on <SearchScreen />', () => {
  test('should be display correctly with default values', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search']}>
        <SearchScreen />
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.alert-info').text().trim()).toBe('Search a hero');
  });

  test('should be display batman and input value with queryString', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchScreen />
      </MemoryRouter>
    );
    expect(wrapper.find('input').prop('value')).toBe('batman');
    expect(wrapper).toMatchSnapshot();
  });

  test('should be display an error if hero doesnt exists', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batman123']}>
        <SearchScreen />
      </MemoryRouter>
    );

    expect(wrapper.find('input').prop('value')).toBe('batman123');
    expect(wrapper.find('.alert-danger').text().trim()).toBe(
      'No results for: batman123'
    );
  });

  test('should be call navigate to new screen', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search']}>
        <SearchScreen />
      </MemoryRouter>
    );

    wrapper
      .find('input')
      .simulate('change', { target: { name: 'searchText', value: 'batman' } });

    wrapper.find('form').prop('onSubmit')({ preventDefault() {} });
    expect(mockNavigate).toHaveBeenCalledWith('?q=batman');
  });
});

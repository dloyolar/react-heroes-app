import { mount } from 'enzyme';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HeroScreen } from '../../../components/hero/HeroScreen';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Test on <HeroScreen />', () => {
  test('shouldnt display hero screen if !hero in url', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero']}>
        <Routes>
          <Route path="/hero" element={<HeroScreen />} />
          <Route path="/" element={<h1>No hero page</h1>} />
        </Routes>
      </MemoryRouter>
    );

    expect(wrapper.find('h1').text().trim()).toBe('No hero page');
  });

  test('should be display a hero if the paramaters exists and it found', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Routes>
          <Route path="/hero/:heroId" element={<HeroScreen />} />
          <Route path="/" element={<h1>No hero page</h1>} />
        </Routes>
      </MemoryRouter>
    );

    expect(wrapper.find('.row').exists()).toBe(true);
    expect(wrapper.find('h3').text().trim()).toBe('Spider Man');
  });

  test('should be return to previuos screen', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Routes>
          <Route path="/hero/:heroId" element={<HeroScreen />} />
        </Routes>
      </MemoryRouter>
    );
    wrapper.find('button').prop('onClick')();

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test('should be show no hero page if we dont have hero', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider1231231231']}>
        <Routes>
          <Route path="/hero/:heroId" element={<HeroScreen />} />
          <Route path="/" element={<h1>No hero page</h1>} />
        </Routes>
      </MemoryRouter>
    );

    expect(wrapper.text()).toBe('No hero page');
  });
});

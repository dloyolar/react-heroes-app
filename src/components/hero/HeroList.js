import { HeroCard } from './HeroCard';

import { getHeroesByPublisher } from '../../helpers/getHeroByPublisher';

export const HeroList = ({ publisher }) => {
  const heroes = getHeroesByPublisher(publisher);
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {heroes.map((hero) => (
        <HeroCard key={hero.id} {...hero} />
      ))}
    </div>
  );
};

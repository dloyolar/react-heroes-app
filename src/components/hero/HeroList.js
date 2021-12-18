import { getHeroesByPublisher } from '../../helpers/getHeroByPublisher';

export const HeroList = ({ publisher }) => {
  const heroes = getHeroesByPublisher(publisher);
  return (
    <>
      <ul>
        {heroes.map((hero) => (
          <li key={hero.id}>{hero.superhero}</li>
        ))}
      </ul>
    </>
  );
};

import axios from 'axios';
import { atom, selector, selectorFamily } from 'recoil';
export const userId = atom<null | string>({
  default: null,
  key: 'userIdAtom',
});

export const userInfo = selectorFamily<any, string>({
  key: 'userInfoSelector',
  get: (id) => async () => {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    );

    return res.data;
  },
});

export const getPicture = selector<null | string>({
  key: 'getPictureSelector',
  get: async ({ get }) => {
    const id = get(userId);
    if (id == null) return;

    const res = await axios.get('https://randomuser.me/api/?results=1');
    const picture = res.data.results[0].picture.medium;
    return picture;
  },
});

export const weatherState = selectorFamily({
  key: 'weatherState',
  get:
    (userId: string) =>
    async ({ get }) => {
      const user = get(userInfo(userId));

      const weather = await getWeather(user.address.city);
      return weather;
    },
});

export const getWeather = (zipCode: string) => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      if (!getWeatherCache[zipCode]) {
        getWeatherCache[zipCode] = randomIntBetween(5, 35);
      } else {
        getWeatherCache[zipCode] += randomIntBetween(-1, 2);
      }

      resolve(getWeatherCache[zipCode]);
    }, randomIntBetween(500, 3000));
  });
};

const getWeatherCache: Record<string, number> = {};

function randomIntBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

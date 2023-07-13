import { useRecoilValue } from 'recoil';
import { userInfo, weatherState } from './atom';

function Weather({ id }: { id: string }) {
  const info = useRecoilValue(userInfo(id));
  const weather = useRecoilValue(weatherState(id));
  return (
    <b>
      weather for {info.address.city} is :<i className="pl-4"> {weather}C*</i>
    </b>
  );
}

export default Weather;

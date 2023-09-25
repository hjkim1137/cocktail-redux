interface WGObjectType {
  [key: string]: string;
}

const WGobject: WGObjectType = {
  Thunderstorm: 'Coffee_mug',
  Tornado: 'Coffee_mug',
  Rain: 'Coffee_mug',
  Squall: 'Coffee_mug',
  Drizzle: 'Collins_glass',
  Mist: 'Collins_glass',
  Smoke: 'Collins_glass',
  Fog: 'Collins_glass',
  Haze: 'Collins_glass',
  Snow: 'Irish_coffee_cup',
  Clear: 'Cocktail_glass',
  Clouds: 'Highball_glass',
  Dust: 'Highball_glass',
  Sand: 'Highball_glass',
  Ash: 'Highball_glass',
};

export default WGobject;

// 이 오류는 TypeScript가 WGobject 객체를 any 타입으로 처리하고 있기 때문에 발생합니다.
// TypeScript는 기본적으로 타입 안전성을 유지하기 위해 객체를 타입화하려고 노력하며,
// 가능한한 any 타입을 피하도록 권장합니다.
// 해결하기 위해서는 WGobject 객체에 대한 타입 정의를 제공하거나,
// weatherName의 타입을 확실하게 지정해야 합니다.
//WGobject에 대한 타입 정의가 없는 경우, 먼저 WGobject에 대한 타입을 정의하는 것이 좋습니다.

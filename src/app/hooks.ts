import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// 타입 정의된 훅스(Typed Hooks) 정의:
// 각 컴포넌트에 RootState와 AppDispatch 타입을 가져올 수 있지만,
// 애플리케이션에서 useDispatch와 useSelector 훅의 타입 버전을 생성하는 것이 더 좋습니다. 이것은 몇 가지 이유로 중요합니다:

// useSelector의 경우, 매번 (state: RootState)를 타이핑할 필요가 없습니다.
// useDispatch의 경우, 기본 Dispatch 타입은 thunks를 알지 못합니다.
// 정확하게 thunks를 dispatch하기 위해선, thunk 미들웨어 타입이 포함된 store에서 특정 맞춤형 AppDispatch 타입을 사용하고 useDispatch와 함께 사용해야 합니다.
// 사전에 타입이 지정된 useDispatch 훅을 추가하면 필요한 곳에서 AppDispatch를 가져오는 것을 잊어버리지 않게 도와줍니다.
// 이들은 실제 변수이기 때문에, store 설정 파일이 아닌 app/hooks.ts와 같은 별도의 파일에 정의하는 것이 중요합니다.
// 이렇게 하면 훅을 사용해야 하는 모든 컴포넌트 파일로 가져올 수 있으며 잠재적인 순환 가져오기 종속성 문제를 피할 수 있습니다.

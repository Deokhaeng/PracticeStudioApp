import { StackNavigationProp } from '@react-navigation/stack';
import { VideoContentType } from './videoTypes';

export type RouteParams = {
  // Auth
  Auth: {};
  SignInMain: {};
  SignInSub: {};
  SignUp: {};

  // Profile
  ProfileScreen: {};

  // AppMain
  AppMain: {};

  // Video
  VideoContentScreen: {};
  VideoPlayerScreen: { videoContent: Partial<VideoContentType> };

  // SearchVideo
  SearchVideoScreen: {};
};

export type NavigationProps = StackNavigationProp<RouteParams>;

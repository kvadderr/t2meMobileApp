import * as React from "react";
import Svg, { Path } from "react-native-svg";
export const LogoutSVG = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path d="M3 12H15" stroke="#919191" strokeLinejoin="round" />
    <Path d="M11.5 8.5L15 12L11.5 15.5" stroke="#919191" strokeLinejoin="round" />
    <Path d="M9 17V20H21V4H9V7" stroke="#919191" strokeLinejoin="round" />
  </Svg>
);
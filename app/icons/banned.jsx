import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
export const BannedSVG = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={12} cy={12} r={10} stroke="white" />
    <Path d="M19 5L5 19" stroke="white" strokeLinejoin="round" />
  </Svg>
);

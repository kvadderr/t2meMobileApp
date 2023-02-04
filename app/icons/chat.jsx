import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";
export const ChatSVG = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M3 6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V17V20L16.5 17H5C3.89543 17 3 16.1046 3 15V6Z"
      stroke="black"
      strokeLinejoin="round"
    />
    <Circle cx={7} cy={10.5} r={1} stroke="black" strokeLinejoin="round" />
    <Circle cx={12} cy={10.5} r={1} stroke="black" strokeLinejoin="round" />
    <Circle cx={17} cy={10.5} r={1} stroke="black" strokeLinejoin="round" />
  </Svg>
);

import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";
export const CardSVG = (props) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M3 7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V16C21 17.1046 20.1046 18 19 18H5C3.89543 18 3 17.1046 3 16V7Z"
      stroke="black"
      strokeLinejoin="round"
    />
    <Path d="M3 9.33325H21" stroke="black" strokeLinejoin="round" />
    <Circle cx={7} cy={13.5} r={1.5} stroke="black" />
    <Circle cx={10} cy={13.5} r={1.5} stroke="black" />
  </Svg>
);


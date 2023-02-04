import * as React from "react";
import Svg, { Path } from "react-native-svg";
export const TrashSVG = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path d="M5 7.5H19L18 22H6L5 7.5Z" stroke="black" strokeLinejoin="round" />
    <Path d="M2 5H22" stroke="black" strokeLinejoin="round" />
    <Path d="M12 10V19" stroke="black" strokeLinejoin="round" />
    <Path d="M8.5 10L9 19" stroke="black" strokeLinejoin="round" />
    <Path d="M15.5 10L15 19" stroke="black" strokeLinejoin="round" />
    <Path
      d="M6 4C6 2.89543 6.89543 2 8 2H16C17.1046 2 18 2.89543 18 4V5H6V4Z"
      stroke="black"
      strokeLinejoin="round"
    />
  </Svg>
);

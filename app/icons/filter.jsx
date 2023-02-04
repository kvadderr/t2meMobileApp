import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const FilterSVG = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M21 2.5H3V5.5L9.84375 11.5L10 21.5L14 19.5V11.5L21 5.5V2.5Z"
      stroke="black"
      strokeLinejoin="round"
    />
  </Svg>
);

import * as React from "react";
import Svg, { Path } from "react-native-svg";
export const HistorySVG = (props) => (
  <Svg
    width={32}
    height={32}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M24 58.6667H40C53.3334 58.6667 58.6667 53.3333 58.6667 40V24C58.6667 10.6667 53.3334 5.33334 40 5.33334H24C10.6667 5.33334 5.33337 10.6667 5.33337 24V40C5.33337 53.3333 10.6667 58.6667 24 58.6667Z"
      stroke="black"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M19.5466 38.64L25.8933 30.4C26.8 29.2267 28.48 29.0133 29.6533 29.92L34.5333 33.76C35.7066 34.6667 37.3866 34.4533 38.2933 33.3067L44.4533 25.36"
      stroke="black"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

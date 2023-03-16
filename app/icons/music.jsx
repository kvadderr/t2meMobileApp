import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
export const MusicSVG = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={8} cy={17} r={3} stroke="#919191" />
    <Path d="M11 17.25V3.5" stroke="#919191" strokeLinejoin="round" />
    <Path
      d="M11 3.64039C11 3.3151 11.3057 3.07642 11.6213 3.15532L18.6213 4.90532C18.8439 4.96096 19 5.16095 19 5.39039V8.35961C19 8.6849 18.6943 8.92358 18.3787 8.84468L11.3787 7.09468C11.1561 7.03904 11 6.83905 11 6.60961V3.64039Z"
      stroke="#919191"
      strokeLinejoin="round"
    />
  </Svg>
);

import * as React from "react";
import Svg, { Path } from "react-native-svg";
export const UploadSVG = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14"
      stroke="#919191"
      strokeLinejoin="round"
    />
    <Path d="M12 17V6" stroke="#919191" strokeLinejoin="round" />
    <Path d="M8 11L12 6L16 11" stroke="#919191" strokeLinejoin="round" />
  </Svg>
);

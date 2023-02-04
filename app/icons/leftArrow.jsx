import * as React from "react"
import Svg, { Path } from "react-native-svg"

export const LeftArrowSVG = (props) => {
  return (
  <Svg
    width={48}
    height={48}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m21.914 24 6.293-6.293-1.414-1.414-7 7a1 1 0 0 0 0 1.414l7 7 1.414-1.414L21.914 24Z"
      fill="#000"
    />
  </Svg>
)}

import * as React from "react"
import Svg, { Path } from "react-native-svg"

export const BookmarkSVG = (props) => {
    return (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.5 4A2.5 2.5 0 0 1 6 1.5h12A2.5 2.5 0 0 1 20.5 4v18a.5.5 0 0 1-.7.458L12 19.046l-7.8 3.412A.5.5 0 0 1 3.5 22V4ZM6 2.5A1.5 1.5 0 0 0 4.5 4v17.235l7.3-3.193a.5.5 0 0 1 .4 0l7.3 3.193V4A1.5 1.5 0 0 0 18 2.5H6Z"
      fill="#919191"
    />
  </Svg>
);
}
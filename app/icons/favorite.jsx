import * as React from "react"
import Svg, { Path } from "react-native-svg"

export const FavoriteSVG = (props) => {
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
      d="M19.88 5.078c-2.067-2.005-5.365-2.1-7.548-.282a.499.499 0 0 1-.332.116.5.5 0 0 1-.332-.116c-2.183-1.818-5.481-1.723-7.548.282a5.242 5.242 0 0 0-.29 7.278c.021.024.04.05.056.076L12 20.303l8.114-7.87a.51.51 0 0 1 .056-.077 5.242 5.242 0 0 0-.29-7.278Zm1.127 7.84a6.241 6.241 0 0 0-.431-8.558C18.233 2.088 14.565 1.898 12 3.787c-2.565-1.889-6.234-1.699-8.576.573a6.241 6.241 0 0 0-.431 8.557.5.5 0 0 0 .102.142l8.557 8.3a.5.5 0 0 0 .696 0l8.557-8.3a.5.5 0 0 0 .102-.142Z"
      fill="#000"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.5 9A2.5 2.5 0 0 0 16 6.5v-1A3.5 3.5 0 0 1 19.5 9h-1Z"
      fill="#000"
    />
  </Svg>
)}


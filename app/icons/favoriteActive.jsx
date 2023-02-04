import * as React from "react"
import Svg, { Path } from "react-native-svg"

export const FavoriteActiveSVG = (props) => {
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
          d="M20.75 4.18a6.49 6.49 0 0 1 .466 8.877.749.749 0 0 1-.137.181l-8.557 8.3a.75.75 0 0 1-1.044 0l-8.557-8.3a.748.748 0 0 1-.137-.181A6.49 6.49 0 0 1 3.25 4.18C5.637 1.866 9.347 1.633 12 3.479c2.653-1.846 6.363-1.613 8.75.702Z"
          fill="#EE4D4D"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.25 6a.75.75 0 0 1 .75-.75A3.75 3.75 0 0 1 19.75 9a.75.75 0 0 1-1.5 0A2.25 2.25 0 0 0 16 6.75a.75.75 0 0 1-.75-.75Z"
          fill="#F9F9F9"
        />
      </Svg>
)}


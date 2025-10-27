import * as React from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="#4338CA"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.834 1.667v16.666m8.333-16.666v16.666M1.667 10h16.667M1.667 5.833h4.167m-4.167 8.334h4.167m8.333 0h4.167m-4.167-8.334h4.167M3.484 1.666h13.033c1.003 0 1.817.814 1.817 1.817v13.034a1.817 1.817 0 0 1-1.817 1.816H3.484a1.817 1.817 0 0 1-1.817-1.816V3.482c0-1.003.813-1.817 1.817-1.817Z"
    />
  </svg>
);
export default SvgComponent;

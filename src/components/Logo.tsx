import React from 'react';

type Props = {
  height?: string;
  width?: string;
};

export default function Logo({ width = '56', height = '50' }: Props) {
  return (
    <a href="/" aria-label="homepage">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={width}
        height={height}
        fill="none"
        viewBox="0 0 114 108"
      >
        <path fill="url(#pattern0)" d="M0 0H114V108H0z"></path>
        <defs>
          <pattern id="pattern0" width="1" height="1" patternContentUnits="objectBoundingBox">
            <use transform="matrix(.0033 0 0 .00348 -.007 0)" xlinkHref="#image0_129_678"></use>
          </pattern>
          <image
            id="image0_129_678"
            width="307"
            height="287"
            xlinkHref="data:image/png;base64,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"
          ></image>
        </defs>
      </svg>
    </a>
  );
}
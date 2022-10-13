import React from 'react';

export const Link = ({className, href }) => {
  return (
    <>
        <a className={className} href={href}></a>
    </>
  )
}

export default Link;
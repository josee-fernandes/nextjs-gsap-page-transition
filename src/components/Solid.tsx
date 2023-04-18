'use client'

import React from 'react'

interface ISolid {}

const Solid = React.forwardRef<HTMLDivElement, ISolid>((props, ref) => {
  return (
    <div
      ref={ref}
      className="w-screen h-screen bg-zinc-50 fixed -left-[100%] top-0 z-[999]"
      {...props}
    />
  )
})

Solid.displayName = 'Solid'

export default Solid

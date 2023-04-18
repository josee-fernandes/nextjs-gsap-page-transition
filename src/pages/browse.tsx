import { useCallback } from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { usePageTransition } from '~/contexts/pageTransition'

const Browse: NextPage = () => {
  const router = useRouter()
  const { animationState, handleAnimationOut, handleAnimationIn } =
    usePageTransition()

  const handleBack = useCallback(async () => {
    try {
      if (animationState !== 'in') await handleAnimationIn('left')

      router.push('/').then(() => handleAnimationOut('left'))
    } catch (error) {
      console.error(error)
    }
  }, [animationState, handleAnimationIn, handleAnimationOut, router])

  return (
    <div className="main-bg">
      <button onClick={handleBack}>Back</button>
    </div>
  )
}

export default Browse

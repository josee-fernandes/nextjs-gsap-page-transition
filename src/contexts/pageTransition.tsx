import {
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'

import { Power3, gsap } from 'gsap'

import Solid from '~/components/Solid'

type TAnimationDirection = 'right' | 'left' | 'up' | 'down'

interface IPageTransitionContext {
  animationState: TAnimationState
  setAnimationState: React.Dispatch<SetStateAction<TAnimationState>>
  solidRef: React.RefObject<HTMLDivElement>
  handleAnimationIn: (
    direction?: TAnimationDirection
  ) => Promise<gsap.core.Omit<gsap.core.Tween, 'then'> | null | undefined>
  handleAnimationOut: (
    direction?: TAnimationDirection
  ) => Promise<gsap.core.Omit<gsap.core.Tween, 'then'> | null | undefined>
}

const PageTransitionContext = createContext({} as IPageTransitionContext)

interface IPageTransitionContextProvider {
  children?: React.ReactNode
}

type TAnimationState = 'in' | 'out' | 'idle'

const PageTransitionContextProvider: React.FC<
  IPageTransitionContextProvider
> = ({ children }) => {
  const [animationState, setAnimationState] = useState<TAnimationState>('idle')

  const solidRef = useRef<HTMLDivElement>(null)

  const handleAnimationIn = useCallback(
    async (direction: TAnimationDirection = 'right') => {
      try {
        if (animationState !== 'in') setAnimationState('in')

        if (direction === 'right') {
          return gsap.fromTo(
            solidRef.current,
            {
              duration: 1,
              left: '-100%',
              ease: Power3.easeInOut,
            },
            {
              duration: 1,
              left: 0,
              ease: Power3.easeInOut,
            }
          )
        } else if (direction === 'left') {
          return gsap.fromTo(
            solidRef.current,
            {
              duration: 1,
              left: '100%',
              ease: Power3.easeInOut,
            },
            {
              duration: 1,
              left: 0,
              ease: Power3.easeInOut,
            }
          )
        } else if (direction === 'up') {
        } else if (direction === 'down') {
        } else {
          return gsap.fromTo(
            solidRef.current,
            {
              duration: 1,
              left: '100%',
              ease: Power3.easeInOut,
            },
            { left: 0 }
          )
        }
      } catch (error) {
        return null
      }
    },
    [animationState, setAnimationState]
  )

  const handleAnimationOut = useCallback(
    async (direction: TAnimationDirection = 'right') => {
      try {
        if (animationState !== 'out') setAnimationState('out')

        if (direction === 'right') {
          return gsap.fromTo(
            solidRef.current,
            {
              duration: 1,
              left: 0,
              ease: Power3.easeInOut,
            },
            {
              duration: 1,
              left: '100%',
              ease: Power3.easeInOut,
            }
          )
        } else if (direction === 'left') {
          return gsap.fromTo(
            solidRef.current,
            {
              duration: 1,
              left: 0,
              ease: Power3.easeInOut,
            },
            {
              duration: 1,
              left: '-100%',
              ease: Power3.easeInOut,
            }
          )
        } else if (direction === 'up') {
        } else if (direction === 'down') {
        } else {
          return gsap.fromTo(
            solidRef.current,
            {
              duration: 1,
              left: 0,
              ease: Power3.easeInOut,
            },
            { left: '100%' }
          )
        }
      } catch (error) {
        return null
      } finally {
        setAnimationState('idle')
      }
    },
    [animationState, setAnimationState]
  )

  const contextValues = useMemo(
    () => ({
      animationState,
      setAnimationState,
      solidRef,
      handleAnimationIn,
      handleAnimationOut,
    }),
    [
      animationState,
      setAnimationState,
      solidRef,
      handleAnimationIn,
      handleAnimationOut,
    ]
  )

  return (
    <PageTransitionContext.Provider value={contextValues}>
      <Solid ref={solidRef} />
      {children}
    </PageTransitionContext.Provider>
  )
}

export const usePageTransition = () => useContext(PageTransitionContext)

export default PageTransitionContextProvider

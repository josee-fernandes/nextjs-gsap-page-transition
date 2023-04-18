import { useCallback } from 'react'

import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { usePageTransition } from '~/contexts/pageTransition'

import { useForm } from 'react-hook-form'

import billboard from 'public/billboard.jpeg'

const Home: NextPage = () => {
  const router = useRouter()
  const { register, handleSubmit } = useForm()
  const { animationState, handleAnimationIn, handleAnimationOut } =
    usePageTransition()

  const onSubmit = useCallback(
    async (data: any) => {
      try {
        if (data?.email !== 'meu@email.com' && data?.password !== '123456')
          throw 'Wrong credentials'

        console.log('Entering')

        if (animationState !== 'in') await handleAnimationIn('right')

        router.push('/browse').then(() => handleAnimationOut('right'))
      } catch (error) {
        console.error(error)
      }
    },
    [animationState, handleAnimationIn, handleAnimationOut, router]
  )

  return (
    <div className="main-bg">
      <main className="relative h-full w-full md:w-1/2 flex items-center justify-center z-30">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col flex-wrap gap-4 w-max"
        >
          <div className="flex flex-wrap gap-2 items-center">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value="meu@email.com"
              className="text-zinc-900 px-4 h-10 w-full rounded-md"
              {...register('email')}
            />
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              autoComplete="password"
              value="123456"
              className="text-zinc-900 px-4 h-10 w-full rounded-md"
              {...register('password')}
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-emerald-500 hover:bg-emerald-600 h-10 transition mt-4"
          >
            Entrar
          </button>
        </form>
      </main>
      <div className="absolute h-full w-full md:w-1/2 top-0 md:right-0 z-10">
        <div className="md:bg-gradient-to-br md:from-zinc-900 md:to-transparent md:to-70% w-full h-full z-10 absolute" />
        <div className="md:bg-gradient-to-r md:from-zinc-900 md:to-transparent md:to-70% w-full h-full z-10 absolute" />
        <Image
          src={billboard}
          alt="Billboard"
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-50 md:opacity-100"
        />
      </div>
    </div>
  )
}

export default Home

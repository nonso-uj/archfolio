import { SkillKey, SKILLS_OBJECT } from '@/utilities/constants'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ParallaxImages({ children }: { children: any }) {
  return (
    <div>
      <div className="flex flex-row flex-nowrap items-center m-0 p-0 gap-x-0 velocity-images w-fit">
        {children.map((skill: SkillKey, i: number) => (
          <img
            key={i}
            src={SKILLS_OBJECT[skill]}
            alt="skill logo"
            className="shrink-0 w-1/6 max-w-36 block mr-10 h-auto"
          />
        ))}
      </div>
    </div>
  )
}

export const VelocityImages = ({ images }: { images: string[] }) => {
  const fillerImages =
    images?.length > 10 ? [...images, ...images] : [...images, ...images, ...images]

  return (
    <section>
      <ParallaxImages children={fillerImages} />
    </section>
  )
}

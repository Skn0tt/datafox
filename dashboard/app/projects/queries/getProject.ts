import { Ctx, NotFoundError } from "blitz"
import { db } from "db"

export default async function getProject(
  { organisation, slug }: { organisation: string; slug: string },
  ctx: Ctx
) {
  ctx.session.$authorize()
  const project = await db.project.findFirst({
    where: {
      organisation: {
        slug: organisation,
        members: {
          some: {
            id: ctx.session.userId,
          },
        },
      },
      slug,
    },
    include: {
      owner: {
        select: {
          name: true,
        },
      },
      testRuns: true,
      organisation: true,
    },
  })
  if (!project) {
    throw new NotFoundError()
  }
  return project
}

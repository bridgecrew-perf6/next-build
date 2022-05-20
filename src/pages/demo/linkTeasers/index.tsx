import { drupalClient } from '@/utils/drupalClient'
import { GetStaticPropsContext, GetStaticPropsResult } from 'next'
import { DrupalParagraph } from 'next-drupal'
import { DrupalJsonApiParams } from 'drupal-jsonapi-params'
import Container from '@/components/container'
import LinkTeaser from '@/components/paragraph/link_teaser'

interface LinkTeaserPageProps {
  linkTeasers: DrupalParagraph[]
}

const LinkTeaserPage = ({ linkTeasers }: LinkTeaserPageProps) => {
  if (!linkTeasers) linkTeasers = []

  return (
    <>
      <Container className="container">
        {linkTeasers.map((paragraph) => (
          <ul key={paragraph.id} className="usa-unstyled-list">
            <LinkTeaser
              key={paragraph.id}
              paragraph={paragraph}
              boldTitle={false}
              sectionHeader="" //TODO: currently being passed in from entity.fieldTitle
            />
          </ul>
        ))}
      </Container>
    </>
  )
}

export default LinkTeaserPage

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<LinkTeaserPageProps>> {
  const params = new DrupalJsonApiParams()
  params.addPageLimit(3)

  const linkTeasers = await drupalClient.getResourceCollectionFromContext<
    DrupalParagraph[]
  >('paragraph--link_teaser', context, {
    params: params.getQueryObject(),
  })
  return {
    props: {
      linkTeasers: linkTeasers || null,
    },
  }
}

import type { Component } from 'solid-js'

import Footer from '@/components/footer/Footer'
import PageMetadata from '@/components/page-metadata/PageMetadata'
import ProjectShowcase from '@/components/project-showcase/ProjectShowcase'
import Circles from '@/components/ui/backgrounds/Circles/Circles'
import { PROJECTS_LIST } from '@/shared/constants/project-list'
import { useI18n } from '@/shared/contexts/I18nContext'

const InfoPage: Component = () => {
  const { t } = useI18n()

  return (
    <>
      <PageMetadata
        title={t('meta.projects-title')}
        description={t('meta.projects-description')}
        path="/info"
      />
      <Circles>
        <div>
          <ProjectShowcase projects={PROJECTS_LIST} />
          <Footer />
        </div>
      </Circles>
    </>
  )
}

export default InfoPage

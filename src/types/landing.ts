export type SectionId = 'home' | 'market' | 'business' | 'ecosystem' | 'global' | 'contact'

export type IconName =
  | 'arrow'
  | 'bank'
  | 'compass'
  | 'gamepad'
  | 'globe'
  | 'growth'
  | 'link'
  | 'mail'
  | 'menu'
  | 'play'
  | 'send'
  | 'shield'
  | 'spark'
  | 'users'
  | 'wallet'

export interface NavItem {
  id: SectionId
  label: string
}

export interface PlatformLink {
  label: string
  value: string
  tone: 'cyan' | 'violet' | 'green'
  icon: IconName
}

export interface PainPoint {
  title: string
  description: string
  icon: IconName
}

export interface StatCard {
  metric: string
  title: string
  description: string
  label: string
  icon: IconName
}

export interface Pillar {
  index: string
  title: string
  subtitle: string
  description: string
  primaryMetric: string
  secondaryMetric: string
  outcome: string
  icon: IconName
}

export interface Region {
  id: string
  name: string
  headline: string
  coverage: string
  description: string
  note: string
}

export interface FooterGroup {
  title: string
  english: string
  links: string[]
}

export interface ContactFormModel {
  name: string
  company: string
  email: string
  message: string
}

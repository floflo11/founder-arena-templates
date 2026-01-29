import { fragmentOn } from "basehub";

export const richTextFragment = fragmentOn("BlockRichText", {
  __typename: true,
  json: {
    content: true,
  },
  plainText: true,
});

export type RichTextFragment = fragmentOn.infer<typeof richTextFragment>;

export const mediaFragment = fragmentOn("MediaBlock", {
  on_BlockVideo: {
    __typename: true,
    width: true,
    height: true,
    url: true,
    aspectRatio: true,
  },
  on_BlockImage: {
    __typename: true,
    width: true,
    height: true,
    url: true,
    blurDataURL: true,
    aspectRatio: true,
    alt: true,
  },
});

export type MediaFragment = fragmentOn.infer<typeof mediaFragment>;

export const socialLinkFragment = fragmentOn("SocialLinksItem", {
  _title: true,
  link: true,
});

export type SocialLinkFragment = fragmentOn.infer<typeof socialLinkFragment>;

export const projectsItemFragment = fragmentOn("ProjectsItem", {
  _title: true,
  _slug: true,
  description: richTextFragment,
  year: true,
  client: richTextFragment,
  category: true,
  opengraphImage: {
    url: true,
    width: true,
    height: true,
  },
  media: {
    items: {
      media: mediaFragment,
    },
  },
});

export type ProjectItemFragment = fragmentOn.infer<typeof projectsItemFragment>;

export const aboutFragment = fragmentOn("About", {
  _title: true,
  bio: richTextFragment,
  clients: richTextFragment,
  awards: richTextFragment,
  aboutPhoto: mediaFragment,
});

export type AboutFragment = fragmentOn.infer<typeof aboutFragment>;

export const infoFragment = fragmentOn("Info", {
  title: true,
  subtitle: true,
  socialLinks: {
    items: socialLinkFragment,
  },
  heading: true,
  email: true,
  phone: true,
  address: true,
});

export type InfoFragment = fragmentOn.infer<typeof infoFragment>;

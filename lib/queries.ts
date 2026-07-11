export const pageBySlugQuery = `*[_type == "page" && slug.current == $slug][0]{
  title,
  description,
  announceBar,
  sections[]{
    ...,
    testimonialList[]->{..., author->},
    features[],
    _type == "vslModalSection" => {
      "videoFileUrl": videoFile.asset->url,
      "videoMimeType": videoFile.asset->mimeType
    }
  }
}`;

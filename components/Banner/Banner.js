import banner from './banner.module.scss'

export default function HeroBanner({items}) {
  return (
    <div className={`${banner.banner} uk-position-relative uk-visible-toggle uk-light`} data-tabindex="-1" uk-slideshow="min-height: 300; max-height: 350; animation: pull; autoplay: true;">
        <ul className="uk-slideshow-items">
          {items.map(cover => {
            const [helper, title, copyright, image, textColor, classname] = cover

            return (
              <>
                <li>
                  <img src={image} className={banner.image} objectfit="cover" alt={title} uk-img="target: !.uk-slideshow-items" />
                  <div className={`${banner.content} ${classname}`}>
                    <h2 className={`${banner.helper} uk-margin-remove`}>{helper}</h2>
                    <h1 className={banner.title} style={{ color: textColor }}>{title}</h1>
                    <span className={banner.copyright}>{copyright}</span>
                  </div>
                </li>
              </>
            )
          })}
        </ul>
        <a className="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous="true" uk-slideshow-item="previous"></a>
        <a className="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next="true" uk-slideshow-item="next"></a>
      </div>
  )
}
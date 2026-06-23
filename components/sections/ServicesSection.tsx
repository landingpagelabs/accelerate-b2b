import { urlForImage } from '@/lib/sanity';

export default function ServicesSection({ section }: { section: any }) {
  const services: any[] = section.services || [];

  const getItemClass = (index: number, total: number) => {
    const isLast = (index + 1) % 3 === 0;
    const isDown = index >= total - (total % 3 === 0 ? 3 : total % 3);
    let cls = 'item_services';
    if (isDown) cls += ' is-down';
    if (isLast) cls += ' is-last';
    return cls;
  };

  return (
    <section className="section_services">
      <div className="padding-global">
        <div className="container-default">
          <div className="services_wrapper">
            <div className="services_head">
              <h2 className="title-h2">{section.heading}</h2>
            </div>
            <div className="services_list">
              {services.map((service: any, i: number) => {
                const infoFirst = i % 2 === 1; // odd items: text on top
                const image = service.image && (
                  <div className="item-services_image">
                    <img className="item-services_img" src={urlForImage(service.image).url()} alt={service.title || ''} />
                  </div>
                );
                const info = (
                  <div className={`item-services_info-wrap${infoFirst ? ' is-first' : ''}`}>
                    <div className="item-services_title-wrap">
                      <p className="text-label-large">{service.title}</p>
                    </div>
                    {service.description && (
                      <div className="item-services_text-wrap">
                        <p className="text-body-small">{service.description}</p>
                      </div>
                    )}
                  </div>
                );
                return (
                  <div key={i} className={getItemClass(i, services.length)}>
                    {infoFirst ? (
                      <>
                        {info}
                        {image}
                      </>
                    ) : (
                      <>
                        {image}
                        {info}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

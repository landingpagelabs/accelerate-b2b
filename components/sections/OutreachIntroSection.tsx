import OutreachDiagram from '@/components/sections/OutreachDiagram';

export default function OutreachIntroSection({ section }: { section: any }) {
  return (
    <section className="section_outreach-intro">
      <div className="padding-global">
        <div className="container-default">
          <div className="outreach-intro_wrapper">
            <div className="outreach-intro_text-block">
              <h2 className="outreach-intro_title">
                {section?.heading || 'Cold outreach works, it just has to be done the right way'}
              </h2>
              <p className="outreach-intro_text">
                {section?.text ||
                  "We've spent years testing every tool, playbook, and AI workflow so you don't have to. Your campaigns send from a protected network of warmed inboxes, so emails land in the primary tab and your own domain never takes the risk. We even built custom scrapers to find the buyers most databases miss."}
              </p>
            </div>
            <div className="outreach-intro_image">
              <OutreachDiagram />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

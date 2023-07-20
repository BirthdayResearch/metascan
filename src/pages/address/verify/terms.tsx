import { PropsWithChildren } from "react";

export default function Terms() {
  return (
    <div className="px-1 md:px-0 mt-12 w-full lg:w-9/12 mb-14 md:mb-8 lg:mb-6 text-base md:text-lg -tracking-[0.02em] text-white-50">
      <div className="mb-12">
        <div className="text-2xl md:text-[32px] font-bold text-white-50 mb-2">
          Terms and Conditions
        </div>
        <div className="text-base text-white-700">Updated 8 June 2023</div>
      </div>
      <section>
        <div className="text-white-50 text-xl">
          These terms of service and any other terms expressly incorporated
          herein (“Terms”) constitute a legal agreement between Birthday
          Research Ltd. (the “Company”) and you under which you can access and
          use Meta Scan (the “Services”) as accessible through our website,
          mobile applications, or any other applications as and when available
          (collectively referred to as, “Sites”).
        </div>
        <div className="text-white-50 text-xl mt-4">
          Each of you and Company shall hereinafter be referred to as a “Party”,
          and collectively, you and Company shall hereinafter be referred to as
          the “Parties”.
        </div>
      </section>

      {/* Section 1 */}
      <section className="mt-10">
        <SectionTitle secNum="1." secTitle="SERVICES" />
        <SectionRow subSecNumber="1.1.">
          Your use of the Services is subject to these Terms as may be amended
          by us from time to time at our sole and absolute discretion. These
          Terms shall also include any other operating rules, policies and
          procedures which we may issue or publish on our Sites from time to
          time.
        </SectionRow>
        <SectionRow subSecNumber="1.2.">
          We may revise these Terms at any time with or without notice to you
          and any changes will be uploaded on the Sites. These changes shall
          take effect from the date of upload and your continued access or use
          of the Sites and/or the Services from such date shall be deemed to
          constitute acceptance of the new Terms. It shall be your sole
          responsibility to check the Sites for such changes from time to time.
          If you do not agree to these Terms, please exit the Sites and either
          do not use or cease usage of all the Services immediately.
        </SectionRow>
        <SectionRow subSecNumber="1.3.">
          By accessing, browsing or viewing the Sites, including but not limited
          to, registering for an account, submitting any information to us or
          utilising any of the Services as provided and offered by the Company,
          you:
          <SectionRow subSecNumber="a.">
            agree to be bound by and to abide by the latest version of the
            Terms. You will be deemed to have signed these Terms and to the
            extent permitted under applicable laws, you waive any rights or
            requirements under applicable laws which require a signature,
            whether original or electronic, and/or delivery of records;
          </SectionRow>
          <SectionRow subSecNumber="b.">
            represent and warrant that in the jurisdiction to which you are
            subject, you are of legal age to use the Sites and/or the Services
            and to create binding legal and financial obligations for any
            liability you may incur as a result of the use of the Sites and/or
            the Services; and
          </SectionRow>
          <SectionRow subSecNumber="c.">
            represent and warrant that you are not a Disqualified Person/Entity
            (as defined in Paragraph 2.1 of these Terms) or acting on behalf of
            a Disqualified Person/Entity.
          </SectionRow>
        </SectionRow>
        <SectionRow subSecNumber="1.4.">
          No information contained in or on, and no part of the following:
          <SectionRow subSecNumber="a.">the Sites;</SectionRow>
          <SectionRow subSecNumber="b.">
            any electronic sites, communication or applications directly or
            indirectly linked to the Sites; or
          </SectionRow>
          <SectionRow subSecNumber="c.">
            any other information or document,
          </SectionRow>
          <div className="mt-5">
            shall constitute part of these Terms (unless otherwise stated on the
            Sites or in these Terms), and no representations, warranties or
            undertakings are or are intended or purported to be given by the
            Company in respect of any information contained in or on, or any
            part of, the items as stated in Paragraphs 1.4(a) to (c) above.
          </div>
        </SectionRow>
      </section>

      {/* Section 2 */}
      <section className="mt-10">
        <SectionTitle secNum="2." secTitle="DEFINITIONS" />
        <SectionRow>
          <div className="flex flex-col gap-y-4">
            <p>In these Terms, unless the context otherwise requires:</p>
            <p>
              <span className="font-semibold">“Address”</span> means an address
              on the applicable digital ledger or blockchain network;
            </p>
            <p>
              <span className="font-semibold">“Affiliate”</span> means, with
              respect to any person, any other person directly or indirectly
              controlling, controlled by or under common control with such
              person.
            </p>
            <p>
              <span className="font-semibold">“Applicable Laws”</span> means all
              relevant or applicable statutes, laws (including any reporting
              and/or withholding tax requirements of any government), rules,
              regulations, directives, circulars, notices, guidelines and
              practice notes of any Governmental Authority;
            </p>
            <p>
              <span className="font-semibold">“API”</span> means application
              programming interface(s) made available by the Company or third
              parties to allow access to the Service, Supplier’s Platform,
              and/or third-party services integrated with or facilitating the
              use of the foregoing;
            </p>
            <p>
              <span className="font-semibold">“Digital Asset”</span> means
              application programming interface(s) made available by the Company
              or third parties to allow access to the Service, Supplier’s
              Platform, and/or third-party services integrated with or
              facilitating the use of the foregoing;
            </p>
            <p>
              <span className="font-semibold">“Excluded Jurisdiction”</span>{" "}
              means the jurisdictions that are part of the active sanctions
              programs administered by OFAC at{" "}
              <a
                className="cursor-pointer text-lightBlue underline"
                href="https://www.treasury.gov/resource-center/sanctions/Programs/Pages/Programs.aspx;"
                target="_blank"
                rel="noreferrer"
              >
                https://www.treasury.gov/resource-center/sanctions/Programs/Pages/Programs.aspx;
              </a>
            </p>
            <p>
              <span className="font-semibold">“Fork”</span> means a change in
              the existing source code or the creation of new or additional
              source code for a blockchain
            </p>
            <p>
              <span className="font-semibold">“Governmental Authority”</span>{" "}
              means any nation or government, any state or other political
              subdivision thereof, any entity exercising legislative, executive,
              judicial or administrative functions of or pertaining to
              government, including, without limitation, any government
              authority, agency, department, board, commission or
              instrumentality, and any court, tribunal or arbitrator(s) of
              competent jurisdiction, and any self-regulatory organization. For
              the avoidance of doubt, Governmental Authority may include private
              bodies exercising quasi-governmental, regulatory or judicial-like
              functions to the extent they relate to either you, the Company,
              the Supported Digital Assets and/or the Services;
            </p>
            <p>
              <span className="font-semibold">“Indemnified Persons”</span> has
              the meaning ascribed to it in Paragraph 8.1 of these Terms;
            </p>
            <p>
              <span className="font-semibold">“Loss”</span> means any and all
              losses, claims, liabilities, damages, suits, actions, demands,
              proceedings, costs, charges and/or expenses of whatsoever nature
              or howsoever arising, including any indirect, special, incidental,
              consequential or other losses of any kind, in tort, contract or
              otherwise (including but not limited to loss of revenue and income
              or profits and/or any actual or hypothetical gains);
            </p>
            <p>
              <span className="font-semibold">
                “Network Attack & Vulnerabilities”
              </span>{" "}
              means hacks, cyber-attacks, network attacks (including but not
              limited to double-spend attacks, majority mining power attacks and
              “selfish-mining” attacks, 51% or network attacks), distributed
              denials of service or errors, or any attacks, vulnerabilities or
              defects on the network;
            </p>
            <p>
              <span className="font-semibold">“Network Fees”</span> means such
              transaction cost payable, whether denominated in Digital Assets or
              otherwise, for the use of or execution of transactions on a
              network;
            </p>
            <p>
              <span className="font-semibold">“OFAC”</span> means the United
              States Office of Foreign Assets Control of the United States
              Department of the Treasury;
            </p>
            <p>
              <span className="font-semibold">“Prohibited Uses”</span> has the
              meaning ascribed to it in Paragraph 10.3 of these Terms;
            </p>
            <p>
              <span className="font-semibold">“Services”</span> means the
              services and/or content provided by the Company on or through the
              Sites or otherwise, but shall not include any Third Party
              Integrated Applications;
            </p>
            <p>
              <span className="font-semibold">“SIAC”</span> means the Singapore
              International Arbitration Centre;
            </p>
            <p>
              <span className="font-semibold">
                “Third Party Integrated Applications”
              </span>{" "}
              means the third party applications and interfaces which are
              integrated to the Sites;
            </p>
            <p>
              <span className="font-semibold">“Third Party Wallet”</span> means
              the device or program that stores your cryptocurrency keys and
              allows you to access your coins, also known as a cryptocurrency
              wallet, that is managed by a third party.
            </p>
            <p>
              <span className="font-semibold">“User”</span> means a person or
              body corporate accessing or using the Sites / the Services;
            </p>
          </div>
        </SectionRow>
      </section>

      {/* Section 3 */}
      <section className="mt-10">
        <SectionTitle secNum="3." secTitle="USER ELIGIBILITY" />
        <SectionRow subSecNumber="3.1.">
          Access to the Sites is intended for and extended only to, and the
          Services are intended for and extended only to, a person or body
          corporate who is not a Disqualified Person/Entity.
        </SectionRow>
        <SectionRow subSecNumber="3.2.">
          Accordingly, you are not eligible to access the Sites or use the
          Services if you are a Disqualified Person/Entity. If you are a
          Disqualified Person/Entity, or if you are acting on behalf of a
          Disqualified Person/Entity, you should exit the Sites and cease usage
          of all Services immediately.
        </SectionRow>
      </section>

      {/* Section 4 */}
      <section className="mt-10">
        <SectionTitle secNum="4." secTitle="SERVICES" />
        <SectionRow subSecNumber="4.1.">
          We do not act as your fund manager, trustee or investment adviser, and
          have no trust or other obligations in respect of your Digital Assets,
          third-party wallets, or smart contracts other than those expressly
          specified in these Terms.
        </SectionRow>
        <SectionRow subSecNumber="4.2.">
          The Company reserves the right to vary the scope and provision of the
          Services and may suspend or terminate the Services or any part of the
          Services, at its discretion and without prior notice to you.
        </SectionRow>
        <SectionRow subSecNumber="4.3.">
          We may also have to cease operations in a jurisdiction that makes it
          illegal to operate in such jurisdiction, or make it commercially
          unviable or undesirable to obtain the necessary regulatory approval(s)
          to operate in such jurisdiction.
        </SectionRow>
        <SectionRow subSecNumber="4.4">
          If we decide to discontinue access to the Services in part or in full:
          <SectionRow subSecNumber="a.">
            we shall notify you in writing of such discontinuation; and
          </SectionRow>
          <SectionRow subSecNumber="b.">
            represent and warrant that in the jurisdiction to which you are
            subject, you are of legal age to use the Sites and/or the Services
            and to create binding legal and financial obligations for any
            liability you may incur as a result of the use of the Sites and/or
            the Services; and
          </SectionRow>
          <SectionRow subSecNumber="c.">
            you acknowledge and agree that you shall have no right(s), claim(s)
            or causes of action in any way whatsoever against the Company in
            relation to such discontinuation.
          </SectionRow>
        </SectionRow>
        <SectionRow subSecNumber="4.5.">
          Vulnerabilities. The Company utilises open-source software for its
          Services and/or the Sites. You understand and acknowledge that the
          Company has no control or oversight over such open-source software,
          and there is a possibility that there might be operational risks,
          development insufficiencies, compatibility issues, and other
          vulnerabilities and risks resulting from or associated with the
          open-source software. Accordingly, by using the Sites and/or the
          Services, you expressly agree that the Company and/or any of its
          respective officers, directors, agents, employees or representatives
          shall not be liable for any Loss arising out of or in connection with
          the use of open-source software for the Services, even if we are
          advised of or knew or should have known of the possibility of the
          same.
        </SectionRow>
        <SectionRow subSecNumber="4.6.">
          Third-Party Wallet Support Services
          <SectionRow subSecNumber="4.6.1.">
            By connecting your third-party wallet to the Sites, you agree that
            you are using that wallet under the terms and conditions of the
            third-party wallet provider.
          </SectionRow>
          <SectionRow subSecNumber="4.6.2.">
            Third-party wallets are not operated by, maintained by, or
            affiliated with the Company, and the Company does not have custody
            or control over the contents of your wallet and has no ability to
            retrieve or transfer its contents. The Company accepts no
            responsibility for, or liability to you, in connection with your use
            of a third-party wallet and makes no representations or warranties
            regarding how the Services will operate with or whether the Sites
            and/or Services will be compatible with any specific wallet.
          </SectionRow>
          <SectionRow subSecNumber="4.6.3.">
            No endorsement or approval of any third-party website, wallet, or
            DeFi application is expressed or implied by the fact that they have
            been made available via the Sites and/or the Services.
          </SectionRow>
          <SectionRow subSecNumber="4.6.4.">
            You are solely responsible for keeping your third-party wallet
            secure. If you discover an issue related to your wallet, please
            contact your third-party wallet provider. Likewise, you are solely
            responsible for your Account and any associated wallet and we are
            not liable for any acts or omissions by you as a result of your
            third-party wallet being compromised.
          </SectionRow>
        </SectionRow>
        <SectionRow subSecNumber="4.7.">
          APIs
          <SectionRow subSecNumber="4.7.1">
            At its sole discretion, the Company may provide integration of the
            Services withAPIs.
          </SectionRow>
          <SectionRow subSecNumber="4.7.2">
            Where the APIs are provided by third-parties (including the
            Company’s Affiliates):
            <SectionRow subSecNumber="4.7.2.1.">
              the Company does not review the APIs (and content available
              through the API) for accuracy, completeness or reliability, and
              does not warrant or guarantee the accuracy, completeness,
              reliability or any other aspect of the foregoing;
            </SectionRow>
            <SectionRow subSecNumber="4.7.2.2.">
              the Company does not make any, and expressly disclaims all,
              warranties and statutory guarantees with respect to the
              performance of the APIs, including as related to availability, the
              implied warranties of fitness for a particular purpose,
              merchantability and non-infringement, and the implied warranties
              arising out of any course of dealing, course of performance or
              usage in trade, to the maximum extent as permitted by the
              Applicable Laws;
            </SectionRow>
            <SectionRow subSecNumber="4.7.2.3.">
              the Company shall not be liable whether in tort (including for
              negligence and gross negligence), contract, misrepresentation,
              restitution or otherwise for any Loss however arising from the use
              of the APIs, even if the Company was advised of or knew or should
              have known of the possibility of the Loss;
            </SectionRow>
            <SectionRow subSecNumber="4.7.2.4.">
              At its sole discretion, the Company may provide integration of the
              Services withAPIs.
            </SectionRow>
            <SectionRow subSecNumber="4.7.2.5.">
              At its sole discretion, the Company may provide integration of the
              Services withAPIs.
            </SectionRow>
          </SectionRow>
        </SectionRow>
      </section>

      {/* Section 5 */}
      <section className="mt-10">
        <SectionTitle secNum="5." secTitle="THIRD-PARTY SERVICES AND CONTENT" />
        <SectionRow subSecNumber="5.1.">
          In using our Services, you may view content or utilize services that
          are provided or otherwise made available by third parties, including
          links to web pages and services of such parties (“Third-Party
          Content”). You agree that you must evaluate, and bear all risks
          associated with, the use of any content, including any reliance on the
          accuracy, completeness, or usefulness of such content.
        </SectionRow>
        <SectionRow subSecNumber="5.2.">
          In particular, the Services may display, include, or make available
          third-party content (including data, information, smart contracts, and
          other materials). You acknowledge and agree that the Company is not
          responsible for Third-Party Content, including their accuracy,
          completeness, timeliness, validity, copyright compliance, legality,
          decency, quality, or any other aspect thereof. The Company does not
          assume and will not have any liability or responsibility to you or any
          other person or entity for any Third-Party Content. Third-Party
          Content is provided solely as a convenience to you, and you access and
          use them entirely at your own risk.
        </SectionRow>
        <SectionRow subSecNumber="5.3.">
          We do not control, endorse or adopt any Third-Party Content and will
          have no responsibility for Third-Party Content, including, without
          limitation, material that may be misleading, incomplete, erroneous,
          offensive, indecent or otherwise objectionable in your jurisdiction.
          You agree that we shall not be liable in any way for any loss or
          damage of any kind incurred as a result of the use of any such
          content.
        </SectionRow>
        <SectionRow subSecNumber="5.4.">
          The integration or inclusion of Third-Party Content does not imply an
          endorsement or recommendation.
        </SectionRow>
        <SectionRow subSecNumber="5.5.">
          In addition, your business dealings or correspondence with such third
          parties are solely between you and the third parties. We are not
          responsible or liable for any loss or damage of any sort incurred as
          the result of any such dealings, and you understand that your use of
          Third-Party Content, and your interactions with third parties, is at
          your own risk. Your access and use of the Third-Party Content may also
          be subject to additional terms and conditions, privacy policies, or
          other agreements with such third party. We have no control over and
          are not responsible for such Third-Party Content, including for the
          accuracy, availability, reliability, or completeness of information
          shared by or available through Third-Party Content, or on the privacy
          practices of Third-Party Content.
        </SectionRow>
        <SectionRow subSecNumber="5.6.">
          You assume all risks associated with the use of the Service and any
          related transactions. You agree to hold harmless the Company and its
          Affiliates, employees, agents, and partners from any and all claims,
          damages, losses, or liabilities arising from or related to your use of
          the Service or any cryptocurrency transactions. This provision is
          intended to be a broad release of liability and is not a complete
          statement of the rights and obligations of the parties. It is not
          intended to and does not create any contractual or legal rights in or
          on behalf of any party.
        </SectionRow>
      </section>

      {/* Section 6 */}
      <section className="mt-10">
        <SectionTitle secNum="6." secTitle="THIRD-PARTY SERVICES AND CONTENT" />
        <SectionRow subSecNumber="6.1.">
          When accessing or using the Services, you agree that you will not
          violate any law, contract, intellectual property or other third-party
          right or commit a tort, and that you are solely responsible for your
          conduct while using our Services. You must not:
          <SectionRow subSecNumber="a.">
            Use our Services in any manner that could interfere with, disrupt,
            negatively affect or inhibit other users from fully enjoying our
            Services, or that could damage, disable, overburden or impair the
            functioning of our Services in any manner;
          </SectionRow>
          <SectionRow subSecNumber="b.">
            Use our Services to support or otherwise engage in any illegal
            activities, including, but not limited to illegal gambling, fraud,
            money-laundering, or terrorist activities;
          </SectionRow>
          <SectionRow subSecNumber="c.">
            Use any robot, spider, crawler, scraper or other automated means or
            interface not provided by us to access our Services or to extract
            data;
          </SectionRow>
          <SectionRow subSecNumber="d.">
            Engage in Automated Data Collection (scraping) unless such Automated
            Data Collection is confined solely to search indexing for display on
            the Internet;
          </SectionRow>
          <SectionRow subSecNumber="e.">
            Engage in the reproduction of any content posted (such as public
            labels or name tags) or extracted from our APIs, CSV exports or our
            website or any of our affiliate websites without our prior consent
            or authorization.
          </SectionRow>
          <SectionRow subSecNumber="f.">
            Attempt to circumvent any content filtering techniques we employ, or
            attempt to access any service or area of our Services that you are
            not authorized to access;
          </SectionRow>
          <SectionRow subSecNumber="g.">
            Introduce to the Services any virus, trojan worms, logic bombs or
            other harmful material;
          </SectionRow>
          <SectionRow subSecNumber="h.">
            Develop any third-party applications that interact with our Services
            without attributing theCompany’s contributions to the Services;
          </SectionRow>
          <SectionRow subSecNumber="i.">
            Provide false, inaccurate, or misleading information; and
          </SectionRow>
          <SectionRow subSecNumber="j.">
            Encourage or induce any third party to engage in any of the
            activities prohibited under this Section.
          </SectionRow>
        </SectionRow>
      </section>
    </div>
  );
}

function SectionTitle({ secTitle, secNum }: { secTitle: string; secNum }) {
  return (
    <div className="flex items-center">
      <h1 className="text-2xl w-10 text-end font-semibold">{secNum}</h1>
      <div className="ml-5 text-2xl font-semibold">{secTitle}</div>
    </div>
  );
}

function SectionRow({
  children,
  subSecNumber,
}: PropsWithChildren<{
  subSecNumber?: string;
}>) {
  return (
    <section className="flex mt-5 items-baseline">
      <div className="min-w-[40px] text-base text-end mr-5">{subSecNumber}</div>
      <div>{children}</div>
    </section>
  );
}

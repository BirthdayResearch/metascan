export default function Terms() {
  const textStyle = "text-base md:text-lg -tracking-[0.02em] text-white-50";
  return (
    <div className="px-1 md:px-0 mt-12 w-full lg:w-8/12 mb-14 md:mb-8 lg:mb-6">
      <div className="mb-12">
        <div className="text-2xl md:text-[32px] font-bold text-white-50 mb-4">
          Terms of service
        </div>
        <div className="text-base text-white-700">
          Last updated: September 12, 2022
        </div>
      </div>
      <div>
        <div className="text-white-50 text-2xl">
          PLEASE READ THESE TERMS OF SERVICE CAREFULLY. BY ACCESSING OR USING
          OUR SERVICES, YOU AGREE TO BE BOUND BY THESE TERMS OF SERVICE AND ALL
          TERMS INCORPORATED BY REFERENCE. These Terms of Service and any terms
          expressly incorporated herein (“Terms”) apply to your access to and
          use of all services (our “Services”) provided by Etherscan.io
          (“Company,” “we,” or “us”).
        </div>
        <div className="mt-16">
          <div className={textStyle}>1. ELIGIBILITY</div>
          <div className={textStyle}>
            You represent and warrant that you: (a) are of legal age to form a
            binding contract; (b) have not previously been suspended or removed
            from using our Services; and (c) have full power and authority to
            enter into this agreement and in doing so will not violate any other
            agreement to which you are a party.
          </div>
          <div className={textStyle}>
            If you are registering to use the Services on behalf of a legal
            entity, you further represent and warrant that (i) such legal entity
            is duly organized and validly existing under the applicable laws of
            the jurisdiction of its organization, and (ii) you are duly
            authorized by such legal entity to act on its behalf.
          </div>
        </div>
        <div className="mt-6">
          <div className={textStyle}>2. ACCOUNT REGISTRATION</div>
          <div className={textStyle}>
            You must create an account with Company to access the Services
            (“Account”). When you create an Account, you agree to:
          </div>
          <div className={textStyle}>
            (a) create a strong password that you do not use for any other
            website or online service;
          </div>
          <div className={textStyle}>
            (b) provide accurate and truthful information;
          </div>
          <div className={textStyle}>
            (c) maintain and promptly update your Account information;
          </div>
          <div className={textStyle}>
            (d) maintain the security of your Account by protecting your Account
            password and restricting access to your computer and your Account;
          </div>
          <div className={textStyle}>
            (e) promptly notify us if you discover or otherwise suspect any
            security breaches related to your Account; and
          </div>
          <div className={textStyle}>
            (f) take responsibility for all activities that occur under your
            Account and accept all risks of any authorized or unauthorized
            access to your Account, to the maximum extent permitted by law.
          </div>
          <div className={textStyle}>
            When you create an Account, we assign you an account identifier that
            you must retain to access your Account.
          </div>
        </div>
      </div>
    </div>
  );
}

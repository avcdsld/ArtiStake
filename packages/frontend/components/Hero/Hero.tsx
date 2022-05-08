import Image from 'next/image'

const sdgsFileNames = [...Array(17)].map((_, v) => ("0" + (v + 1)).slice(-2)).map((v) =>  "/assets/img/e_sdgs/E_SDG_inverted_CMYK-" + v + ".png")

const Hero = () => {
  return (
    <>
      <div className="relative">
        <div className="w-full overflow-hidden">
          <div className="flex flex-col items-center mx-auto">
            <img className="w-full" src="/assets/img/MetaverStake_top_title.png" />
            <p className="text-black absolute text-xs bottom-2 invisible lg:visible marimo-tracking-hero-lg">STAKING FOR SOCIAL GOOD PROJECTS IN METAVERSE</p>
          </div>
        </div>
      </div>
      <p className="text-black lg:hidden marimo-tracking-hero text-center">STAKING FOR SOCIAL GOOD PROJECTS IN METAVERSE</p>
      <div className="bg-white flex items-center justify-center flex-wrap">
      {/* <div className="bg-marimo-3 flex items-center justify-center flex-wrap"> */}
      {sdgsFileNames.map((v) => <div className="m-1" key={v}>
                                  <img className="w-[30px] h-[30px] lg:w-[60px] lg:h-[60px]" src={v}/>
                                </div>)}
      </div>
      <div className="bg-marimo-4 h-2" />
      <div className="bg-marimo-3 h-3" />
    </>  
  );
};

export default Hero;

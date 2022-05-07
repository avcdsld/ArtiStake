import Image from 'next/image'

const sdgsFileNames = [...Array(17)].map((_, v) => ("0" + (v + 1)).slice(-2)).map((v) =>  "/assets/img/e_sdgs/E_SDG_inverted_CMYK-" + v + ".jpg")

const Hero = () => {
  return (
    <>
      <div className="relative">
        <div className="w-full overflow-hidden">
          <div className="flex flex-col items-center mx-auto">
            <img className="w-full" src="/assets/img/MetaverStake_top_title.png" />
            <p className="text-black text-xs absolute bottom-2 marimo-tracking-hero">STAKING FOR SOCIAL GOOD PROJECTS IN METAVERSE</p>
          </div>
        </div>
      </div>
      {/* <div className="bg-marimo-4 h-3" /> */}
      {/* <div className="bg-marimo-3 h-6" />
      <div className="bg-white flex items-center justify-center"> */}
      <div className="bg-marimo-3 flex items-center justify-center">
      {sdgsFileNames.map((v) =>  <div className="m-1 mt-2">
                                    <Image
                                      src={v}
                                      alt={v}
                                      width={60}
                                      height={60}
                                    />
                                  </div>)}
      </div>
    </>  
  );
};

export default Hero;

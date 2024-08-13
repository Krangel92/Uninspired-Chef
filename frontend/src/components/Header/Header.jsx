import {
  subtract_12,
  subtract_14,
  union_1,
  union,
  line_1,
  union_2,
  subtract_19,
  subtract_15,
  ellipse_1_3
} from '../../assets/svg-assets';


export const Header = ({
    property1,
    className,
    subtract = subtract_12,
    img = subtract_14,
    union = union,
    union1 = union_1,
    line = line_1,
    settingBottomBunClassName,
    union2 = union_2,
  }) => {
    return (
      <div
        className={`relative w-[1254px] h-[261px] bg-[#feead1] border-b [border-bottom-style:solid] border-color-border-default-default gap-[var(--size-space-600)] ${className}`}
      >
        <div className="absolute w-[169px] h-[169px] top-[29px] left-[39px] bg-[#feead1] rounded-[48px]">
          <div className="absolute w-[17px] h-[17px] top-[43px] left-[91px]">
            <div className="absolute w-[17px] h-[3px] top-0 left-0 bg-[#1e1919]" />
            <div className="absolute w-[17px] h-[3px] top-3.5 left-0 bg-[#1e1919]" />
            <img className="absolute w-[17px] h-4 top-0 left-0" alt="Subtract" src={subtract} />
          </div>
          <div className="absolute w-[17px] h-[17px] top-[26px] left-28">
            <div className="absolute w-[17px] h-[3px] top-0 left-0 bg-[#1e1919]" />
            <div className="absolute w-[17px] h-[3px] top-3.5 left-0 bg-[#1e1919]" />
            <img
              className="absolute w-[17px] h-4 top-0 left-0"
              alt="Subtract"
              src={subtract_19}
            />
          </div>
          <div className="absolute w-[17px] h-[17px] top-5 left-[139px]">
            <div className="absolute w-[17px] h-[3px] top-0 left-0 bg-[#1e1919]" />
            <div className="absolute w-[17px] h-[3px] top-3.5 left-0 bg-[#1e1919]" />
            <img className="absolute w-[17px] h-4 top-0 left-0" alt="Subtract" src={img} />
          </div>
          <div className="absolute w-[91px] h-[103px] top-[60px] left-[13px]">
            <div className="absolute w-[50px] h-[55px] top-[25px] left-[21px] bg-white border-[5px] border-solid border-[#6e6e6e]" />
            <div className="absolute w-[11px] h-[52px] top-[29px] left-[15px] bg-white border-[5px] border-solid border-[#6e6e6e] rotate-[-5.00deg]" />
            <div className="absolute w-[11px] h-[52px] top-7 left-[65px] bg-white border-[5px] border-solid border-[#6e6e6e] rotate-[5.00deg]" />
            <img className="absolute w-[91px] h-[39px] top-0 left-0" alt="Union" src={union} />
            <img className="absolute w-14 h-[23px] top-20 left-[17px]" alt="Union" src={union1} />
            <img className="absolute w-[5px] h-11 top-9 left-11" alt="Line" src={line} />
          </div>
        </div>
        <div className="absolute w-[225px] h-[180px] top-6 left-[968px]">
          <div className="relative w-48 h-[139px] top-[19px] left-5">
            <div className="absolute w-[186px] h-2 top-[60px] left-[3px] bg-[#b51b1e]" />
            <div className="absolute w-[186px] h-2 top-[68px] left-[3px] bg-[#638209]" />
            <div
              className={`absolute w-48 h-[26px] top-[113px] left-0 bg-[subtract_15] bg-[100%_100%] ${settingBottomBunClassName}`}
            />
            <div className="absolute w-48 h-8 top-[81px] left-0 bg-[#a13c2a] rounded-[64px]" />
            <div className="absolute w-48 h-[120px] top-0 left-0">
              <img
                className="absolute w-[189px] h-[60px] top-0 left-px"
                alt="Ellipse"
                src={ellipse_1_3}
              />
            </div>
            <img className="absolute w-48 h-[21px] top-[76px] left-0" alt="Union" src={union2} />
          </div>
        </div>
      </div>
    );
  };

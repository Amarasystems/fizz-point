export default function Qr() {
  return (
    <div className="max-w-[1440px] m-auto">
      <div className="max-w-[1350px] m-auto px-4 mb-[50px] flex items-center rounded-lg qrlinear">
        <div className="flex justify-between items-center w-[100%]  px-12 max-lg:flex-col-reverse py-5">
          <div className="flex flex-col gap-12 items-center">
            <div className="">
              <img
                className="w-[300px] h-[300px] max-sm:w-[200px] max-sm:h-[200px] rounded-lg"
                src="https://res.cloudinary.com/dv0wipf01/image/upload/v1732738053/pepsi/isalrcc4ez9i4fx4su5f.jpg"
                alt=""
              />
            </div>
            <div className="flex gap-3 max-sm:gap-0 max-md:flex-col max-sm:w-[200px]">
              <img
                src="https://res.cloudinary.com/dzx9hezqv/image/upload/v1732099661/pepsi/photos/plvg4fydr8zudy1yxuvu.png"
                alt=""
              />
              <img
                src="https://res.cloudinary.com/dzx9hezqv/image/upload/v1732099661/pepsi/photos/wmvd2lpz8le4aglczn7l.png"
                alt=""
              />
            </div>
          </div>
          <img
            src="https://res.cloudinary.com/dzx9hezqv/image/upload/v1732099473/pepsi/photos/xvd74xjobuleft8uplqx.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

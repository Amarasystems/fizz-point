export default function PageNotFound() {
  return (
    <div className="h-[100vh] w-[100vw] p-8 flex justify-center bg-black items-center ">
      <div className="flex flex-col items-center">
        <p className="text-white text-[120px] font-bold galaxy">Oops!</p>
        <div className="flex gap-4 flex-col">
          <p className="font-semibold text-center text-[32px] text-white">
            Технологийн хөгжүүлэлтийн <br /> ажил явагдаж байна.
          </p>
        </div>
        <div className="mt-[20px]">
          <img
            className="rounded-[50px] w-[500px]"
            src="https://cdn.dribbble.com/users/381530/screenshots/3949858/media/aff8c4541abddf91b8f69206b2175381.gif"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default function CoinLink({ link }: { link: string }) {
  const handleOpenTab = (link: string) => {
    window.open(link);
  };
  const handleCopyClipBoard = (link: string) => {
    navigator.clipboard.writeText(link);
  };
  return (
    <div className="bg-[#CCCCFA] bg-opacity-60 text-[#424286] dark:bg-[#1E1932] flex justify-between py-5 px-6 gap-4 rounded-xl max-w-[700px] xl:flex-none xl:max-w-[370px]">
      <svg
        className="cursor-pointer rounded-xl "
        onClick={() => handleOpenTab(link)}
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.8832 9.61621C12.7582 11.4912 12.7582 14.5245 10.8832 16.3912C9.00821 18.2579 5.97487 18.2662 4.1082 16.3912C2.24154 14.5162 2.2332 11.4829 4.1082 9.61621"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.82578 11.6754C6.87578 9.72539 6.87578 6.55873 8.82578 4.60039C10.7758 2.64206 13.9424 2.65039 15.9008 4.60039C17.8591 6.55039 17.8508 9.71706 15.9008 11.6754"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <a
        className="inline-block text-ellipsis max-w-[225px] overflow-hidden whitespace-nowrap text-[#424286] focus:text-[#424286] active:text-[#424286] dark:text-[#FFFFFF] dark:focus:text-[#FFFFFF] dark:active:text-[#FFFFFF]"
        href={link}
      >
        {link}
      </a>
      <svg
        className="cursor-pointer"
        onClick={() => handleCopyClipBoard(link)}
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.3327 11.2503V14.7503C13.3327 17.667 12.166 18.8337 9.24935 18.8337H5.74935C2.83268 18.8337 1.66602 17.667 1.66602 14.7503V11.2503C1.66602 8.33366 2.83268 7.16699 5.74935 7.16699H9.24935C12.166 7.16699 13.3327 8.33366 13.3327 11.2503Z"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M18.3327 6.25033V9.75033C18.3327 12.667 17.166 13.8337 14.2493 13.8337H13.3327V11.2503C13.3327 8.33366 12.166 7.16699 9.24935 7.16699H6.66602V6.25033C6.66602 3.33366 7.83268 2.16699 10.7493 2.16699H14.2493C17.166 2.16699 18.3327 3.33366 18.3327 6.25033Z"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
}

export default function OpenTabIcon({
  link,
  handleOpenTab,
}: {
  link: string;
  handleOpenTab: any;
}) {
  return (
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
  );
}

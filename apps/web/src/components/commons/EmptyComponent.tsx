export default function EmptyComponent({ icon: Icon, title, testId }) {
  return (
    <div
      className="flex flex-col justify-between items-center py-32"
      data-testid={testId}
    >
      <div className="mb-4">
        <Icon size={72} className="text-white-50 stroke-white-50" />
      </div>
      <div className="font-bold mb-2 text-white-50 text-2xl md:text-[32px] md:leading-10 -tracking-[0.32px]">
        {title}
      </div>
      <div className="text-base text-white-50 -tracking-[0.32px]">
        Try checking this out on another time.
      </div>
    </div>
  );
}

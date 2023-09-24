function DetailFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute top-[520px] w-[720px]">
      <p className="text-lg font-semibold text-center">{children}</p>
    </div>
  );
}

export default DetailFooter;

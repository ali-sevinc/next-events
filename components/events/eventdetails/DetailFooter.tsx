function DetailFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute top-[720px] lg:top-[520px] max-w-[720px]">
      <p className="text-lg font-semibold text-center">{children}</p>
    </div>
  );
}

export default DetailFooter;

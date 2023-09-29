function DetailFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[720px] mx-12 md:mx-auto ">
      <p className="text-lg font-semibold text-center">{children}</p>
    </div>
  );
}

export default DetailFooter;

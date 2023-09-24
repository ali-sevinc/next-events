function DetailHead({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-5xl font-bold pt-16 pb-32 text-stone-200 bg-green-500 w-full text-center">
      {children}
    </h2>
  );
}

export default DetailHead;

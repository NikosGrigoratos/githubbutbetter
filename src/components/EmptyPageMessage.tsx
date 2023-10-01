const EmptyPageMessage = ({ text }: { text: string }) => {
  return (
    <div className="w-[100%] h-[70vh] flex items-center justify-center text-lg font-bold">
      {text}
    </div>
  );
};

export default EmptyPageMessage;

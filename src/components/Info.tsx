type InfoProps = {
  infoKey: string;
  infoValue?: string | number;
};

const Info = (props: InfoProps) => {
  const { infoKey, infoValue } = props;

  return (
    <div className="flex items-center">
      <span className="text-lg font-bold text-red-500">{infoKey}:</span>
      <span className="font-semibold text-slate-500 ml-3">
        {infoValue ?? "-"}
      </span>
    </div>
  );
};

export default Info;

interface ResponseMessageProps {
    responseMessage: string;
  }

function ResponseMessage(props: ResponseMessageProps) {
  return (
    <div className="rounded-md bg-white p-4">
    <div className="flex">
        <h3 className="text-sm font-medium text-black">{props.responseMessage}</h3>
    </div>
  </div>
  );
}

export default ResponseMessage;

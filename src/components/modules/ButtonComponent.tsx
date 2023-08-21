import { useState } from 'react';

import { FiThumbsUp } from 'react-icons/fi';

type ButtonComponentProps = {
  label: string;
  onClick?: () => void;
};
export const ButtonComponent = (props: ButtonComponentProps) => {
  const { label, onClick } = props;
  return (
    <>
      <button
        type={onClick ? 'button' : 'submit'}
        className="flex items-center justify-center border-2 border-gray py-3 px-8 text-lg"
        onClick={onClick}
      >
        {label}
      </button>
    </>
  );
};

type ThumbsUpButtonType = {
  disable?: boolean;
  onClick: () => void;
};
export const ThumbsUpButton = (props: ThumbsUpButtonType) => {
  const { onClick, disable } = props;
  const [firstClick, setFirstClick] = useState<boolean>(false);

  const onClickThumbsUpButton = async () => {
    setFirstClick(true);
    await onClick();
    setFirstClick(false);
  };
  return (
    <>
      <button
        className="flex shrink-0 flex-row items-center gap-1 rounded-lg bg-[#DBDBDB] p-2 text-gray transition-transform hover:-translate-x-1 hover:-translate-y-1"
        onClick={onClickThumbsUpButton}
        disabled={firstClick || disable}
      >
        <span>いいね！</span>
        <FiThumbsUp />
      </button>
    </>
  );
};

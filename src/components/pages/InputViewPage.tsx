import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { useFirestorePrideContent } from '@/hooks/useFirestorePrideContent';
import { InputFormPrideContentType, PrideContentType } from '@/types/contentsType';
import { LoadingComponent } from '@/utilities/LoadingComponent';

import { TitleComponent } from '../modules/TitleComponent';
import { ViewLandscapeCardComponent } from '../modules/ViewComponent/ViewCardComponent';
import { InputBoardComponent } from '../modules/inputComponent/InputBoardComponent';

export const InputViewPage = () => {
  const date = new Date();
  const month = date.getMonth() + 1;

  const { createPride } = useFirestorePrideContent();
  const { user } = useFirebaseAuth();

  const { prideContentList, isLoadingPrideContent, prideContentMutate, pushLikeForPride } =
    useFirestorePrideContent();

  const InitializeData: InputFormPrideContentType = {
    customerName: '',
    serviceName: '',
    title: '',
  };
  const onSubmit = async (content: InputFormPrideContentType) => {
    const submitData: PrideContentType = {
      ...content,
      userName: user.displayName,
      userPhotoURL: user.photoURL,
      thumbsUsers: [],
    };
    await createPride(submitData);
    prideContentMutate();
  };

  const onClickThumbsUpButton = async (uid: string) => {
    console.log(uid);
    await pushLikeForPride(uid, user.photoURL);
    prideContentMutate();
  };

  if (isLoadingPrideContent || !prideContentList) return <LoadingComponent />;
  return (
    <>
      <TitleComponent label={month + '月自慢プロジェクト'} />
      <div className="flex w-full flex-row gap-3">
        <div className="w-full max-w-sm">
          <InputBoardComponent initializeData={InitializeData} onSubmitParentFunction={onSubmit} />
        </div>
        <div className="flex w-full flex-col gap-10">
          {prideContentList.map((content) => (
            <ViewLandscapeCardComponent
              key={content.uid}
              prideContent={content.pride}
              onClick={() => onClickThumbsUpButton(content.uid)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

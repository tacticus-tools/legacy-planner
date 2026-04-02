import { FC, PropsWithChildren } from 'react';

import { LoaderProvider, TitleProvider } from '@/fsd/5-shared/ui/contexts';

export const FirstPartyProviders: FC<PropsWithChildren> = ({ children }) => {
    return (
        <TitleProvider>
            <LoaderProvider>{children}</LoaderProvider>
        </TitleProvider>
    );
};

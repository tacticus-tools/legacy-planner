import 'react-medium-image-zoom/dist/styles.css';
import './index.css';

import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import { ConvexQueryClient } from '@convex-dev/react-query';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { SnackbarOrigin, SnackbarProvider, closeSnackbar } from 'notistack';
import { isMobile } from 'react-device-detect';
import { createRoot } from 'react-dom/client';
import { PopupProvider } from 'react-popup-manager';
import { RouterProvider } from 'react-router-dom';
import { AnalyticsProvider } from 'use-analytics';

import { StoreProvider } from 'src/reducers/store.provider2';

import { LoaderProvider, TitleProvider } from '@/fsd/5-shared/ui/contexts';

import analytics from './monitoring/analytics';
import reportWebVitals from './monitoring/report-web-vitals';
import { routes } from './routing/app-routing';

const webSnackbarOrigin: SnackbarOrigin = { vertical: 'bottom', horizontal: 'right' };
const mobileSnackbarOrigin: SnackbarOrigin = { vertical: 'top', horizontal: 'center' };

const convexClient = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL, { expectAuth: true });
const convexQueryClient = new ConvexQueryClient(convexClient);
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            queryKeyHashFn: convexQueryClient.hashFn(),
            queryFn: convexQueryClient.queryFn(),
        },
    },
});
convexQueryClient.connect(queryClient);

const container = document.querySelector('#root');
if (!container) throw new Error('Root element not found');
const root = createRoot(container);
root.render(
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY} afterSignOutUrl="/">
        <ConvexProviderWithClerk client={convexClient} useAuth={useAuth}>
            <QueryClientProvider client={queryClient}>
                <TitleProvider>
                    <LoaderProvider>
                        <StoreProvider>
                            <AnalyticsProvider instance={analytics}>
                                <SnackbarProvider
                                    autoHideDuration={5000}
                                    anchorOrigin={isMobile ? mobileSnackbarOrigin : webSnackbarOrigin}
                                    onEntered={(node, _isAppearing, key) =>
                                        node.addEventListener('click', () => closeSnackbar(key))
                                    }
                                />
                                <PopupProvider>
                                    <RouterProvider router={routes} />
                                </PopupProvider>
                            </AnalyticsProvider>
                            <TanStackDevtools
                                config={{ position: 'bottom-right' }}
                                plugins={[{ name: 'Query', render: <ReactQueryDevtoolsPanel /> }]}
                            />
                        </StoreProvider>
                    </LoaderProvider>
                </TitleProvider>
            </QueryClientProvider>
        </ConvexProviderWithClerk>
    </ClerkProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(_metric => {
    // console.log(`[Web Vitals] ${metric.name}:`, metric.value);
});

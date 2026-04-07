import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { Computer as ComputerIcon, Smartphone as PhoneIcon } from '@mui/icons-material';
import DownloadIcon from '@mui/icons-material/Download';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import SyncIcon from '@mui/icons-material/Sync';
import UploadIcon from '@mui/icons-material/Upload';
import { Badge, Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import { Settings2Icon } from 'lucide-react';
import { enqueueSnackbar } from 'notistack';
import { ChangeEvent, useContext, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import { usePopupManager } from 'react-popup-manager';
import { useLocation, useNavigate } from 'react-router-dom';

import { useConvexUserDataQuery } from '@/convex/hooks';
import { GlobalState } from 'src/models/global-state';
import { IPersonalData2 } from 'src/models/interfaces';
import { DispatchContext, StoreContext } from 'src/reducers/store.provider';
import { convertData } from 'src/services';

import { usePopUpControls } from '@/fsd/5-shared/ui';

import { TacticusIntegrationDialog } from '@/fsd/3-features/tacticus-integration/tacticus-integration.dialog';

export const UserMenu = () => {
    const store = useContext(StoreContext);
    const dispatch = useContext(DispatchContext);
    const popupManager = usePopupManager();
    const { isSignedIn } = useUser();
    const userDataQuery = useConvexUserDataQuery();
    const inputReference = useRef<HTMLInputElement>(null);
    const userMenuControls = usePopUpControls();
    const navigate = useNavigate();
    const location = useLocation();
    const isDesktopView = !location.pathname.includes('mobile');
    const hasRejectedGuides = Boolean(userDataQuery.data?.rejectedTeamsCount);

    const navigateToDesktopView = () => {
        localStorage.setItem('preferredView', 'desktop');
        navigate('/home');
    };

    const navigateToMobileView = () => {
        localStorage.setItem('preferredView', 'mobile');
        navigate('/mobile/home');
    };

    const navigateToReviewTeams = () => {
        let tabId = 2;

        if (userDataQuery.data?.pendingTeamsCount) {
            tabId = 3;
        }

        if (hasRejectedGuides) {
            tabId = 2;
        }

        let url = `/learn/guides?activeTab=${tabId}`;

        if (isMobile) {
            url = '/mobile' + url;
        }

        navigate(url);
    };

    const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            try {
                const content = await file.text();
                const personalData: IPersonalData2 = convertData(JSON.parse(content));
                personalData.modifiedDate = new Date();

                // When we import JSON, we need to bump the local version to ensure
                // we pick it up. It should always be considered the freshest data, and
                // definitely fresher than what we have in the backend.
                dispatch.setStore(
                    {
                        ...new GlobalState(personalData),
                        __localVersion: store.__localVersion ? store.__localVersion + 1 : 1,
                    },
                    /*modified=*/ true,
                    /*reset=*/ false
                );
                enqueueSnackbar('Import successful', { variant: 'success' });
            } catch {
                enqueueSnackbar('Import failed. Error parsing JSON.', { variant: 'error' });
            }
        }
    };

    const downloadJson = () => {
        const data = GlobalState.toStore(store);
        const jsonData = JSON.stringify(data, undefined, 2);

        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        const dateTimestamp =
            typeof data.modifiedDate === 'string' ? data.modifiedDate : data.modifiedDate?.toISOString();
        const date = new Date(dateTimestamp ?? '');

        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        };
        const formattedDate = new Intl.DateTimeFormat(navigator.language, options).format(date);

        link.download = `tacticus-planner-data-${formattedDate}.json`;
        link.click();

        URL.revokeObjectURL(url);
    };

    function syncWithTacticus() {
        if (!userDataQuery.data) return;
        popupManager.open(TacticusIntegrationDialog, {
            onClose: () => {},
        });
    }

    return (
        <Box sx={{ display: 'flex', textAlign: 'center', justifyContent: 'flex-end' }}>
            <input ref={inputReference} className="hidden" type="file" accept=".json" onChange={handleFileUpload} />
            <div className="flex items-center gap-2">
                <SignedIn>
                    <UserButton />
                </SignedIn>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <IconButton
                    onClick={userMenuControls.handleClick}
                    size="small"
                    aria-controls={userMenuControls.open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={userMenuControls.open ? 'true' : undefined}>
                    <Settings2Icon />
                </IconButton>
            </div>
            <Menu
                anchorEl={userMenuControls.anchorEl}
                id="account-menu"
                open={userMenuControls.open}
                onClose={userMenuControls.handleClose}
                onClick={userMenuControls.handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                {isSignedIn && (
                    <>
                        <MenuItem onClick={syncWithTacticus}>
                            <ListItemIcon>
                                <SyncIcon />
                            </ListItemIcon>
                            <ListItemText>Sync via Tacticus API</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => inputReference.current?.click()}>
                            <ListItemIcon>
                                <UploadIcon />
                            </ListItemIcon>
                            <ListItemText>Import JSON</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => downloadJson()}>
                            <ListItemIcon>
                                <DownloadIcon />
                            </ListItemIcon>
                            <ListItemText>Export JSON</ListItemText>
                        </MenuItem>
                        <Divider />
                    </>
                )}
                {isDesktopView ? (
                    <MenuItem onClick={() => navigateToMobileView()}>
                        <ListItemIcon>
                            <PhoneIcon />
                        </ListItemIcon>
                        <ListItemText>Use mobile view</ListItemText>
                    </MenuItem>
                ) : (
                    <MenuItem onClick={() => navigateToDesktopView()}>
                        <ListItemIcon>
                            <ComputerIcon />
                        </ListItemIcon>
                        <ListItemText>Use desktop view</ListItemText>
                    </MenuItem>
                )}

                <Divider />

                <MenuItem onClick={() => navigateToReviewTeams()}>
                    <ListItemIcon>
                        <GroupWorkIcon />
                    </ListItemIcon>
                    {userDataQuery.data?.rejectedTeamsCount ? (
                        <Badge badgeContent={userDataQuery.data.rejectedTeamsCount} color="error">
                            <ListItemText>Review guides</ListItemText>
                        </Badge>
                    ) : (
                        <Badge badgeContent={userDataQuery.data?.pendingTeamsCount ?? 0} color="warning">
                            <ListItemText>Review guides</ListItemText>
                        </Badge>
                    )}
                </MenuItem>
            </Menu>
        </Box>
    );
};

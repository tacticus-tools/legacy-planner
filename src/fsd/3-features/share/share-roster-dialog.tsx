import { useUser } from '@clerk/clerk-react';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import { DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';

// eslint-disable-next-line import-x/no-internal-modules
import { useConvexUserDataQuery } from '@/convex/hooks';

import { LoaderWithText } from '@/fsd/5-shared/ui';

import { createShareToken, refreshShareToken, removeShareToken } from './share-roster.endpoints';

export const ShareRosterDialog = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [loading, setLoading] = useState(false);

    const { user, isLoaded } = useUser();
    const userDataQuery = useConvexUserDataQuery();
    if (!isLoaded) return 'Loading login...';
    if (!user) return 'Must be logged in to access this page';
    if (userDataQuery.isError) return 'Error loading settings';
    if (userDataQuery.isPending) return 'Loading data...';
    const { shareToken } = userDataQuery.data;

    const shareRoute = (isMobile ? '/mobile' : '') + `/sharedRoster?username=${user.username}&shareToken=${shareToken}`;
    const shareLink = shareToken ? location.origin + shareRoute : undefined;

    const copyLink = () => {
        if (shareLink) {
            navigator.clipboard.writeText(shareLink).then(_ => enqueueSnackbar('Copied', { variant: 'success' }));
        }
    };

    const generateLink = () => {
        const confirmed = confirm(
            'Users that have access to the link will be able to view your "Who You Own" page in readonly mode. Are you sure?'
        );
        if (confirmed) {
            setLoading(true);

            createShareToken().finally(() => setLoading(false));
        }
    };

    const refreshLink = () => {
        const confirmed = confirm(
            'Existing link will stop working and new link will be created instead. Are you sure?'
        );

        if (confirmed) {
            setLoading(true);

            refreshShareToken().finally(() => setLoading(false));
        }
    };

    const revokeLink = () => {
        const confirmed = confirm('Existing link will be removed and  stop working. Are you sure?');

        if (confirmed) {
            setLoading(true);

            removeShareToken().finally(() => setLoading(false));
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth>
            <DialogTitle>Share Settings</DialogTitle>
            <DialogContent>
                {shareLink ? (
                    <>
                        <span>Your share token:</span>{' '}
                        <TextField disabled={true} value={shareToken} fullWidth></TextField>
                        <span>Your share link:</span>{' '}
                        <TextField disabled={true} value={shareLink} fullWidth></TextField>{' '}
                        <div className="mt-[5px]">
                            <Button onClick={() => copyLink()} color={'inherit'}>
                                <ContentCopyIcon /> Copy
                            </Button>
                            <Button onClick={() => refreshLink()}>
                                <RefreshIcon /> Refresh
                            </Button>
                            <Button onClick={() => revokeLink()} color={'error'}>
                                <CancelIcon /> Revoke
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <div>Share link to your "Who You Own" page in readonly mode</div>
                        <Button onClick={() => generateLink()} variant={'outlined'}>
                            <AddIcon /> Generate Link
                        </Button>
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
            <LoaderWithText loading={loading} />
        </Dialog>
    );
};

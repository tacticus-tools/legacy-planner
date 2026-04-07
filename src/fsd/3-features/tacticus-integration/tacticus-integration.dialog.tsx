import React, { useState } from 'react';

// eslint-disable-next-line import-x/no-internal-modules -- FYI: Ported from `v2` module; doesn't comply with `fsd` structure
import { useConvexUserDataMutation, useConvexUserDataQuery } from '@/convex/hooks';
// eslint-disable-next-line import-x/no-internal-modules -- FYI: Ported from `v2` module; doesn't comply with `fsd` structure
import { DialogProps } from '@/models/dialog.props';

import { Button } from '@/fsd/5-shared/ui/button';
import { TextField } from '@/fsd/5-shared/ui/input';
import { Modal } from '@/fsd/5-shared/ui/modal';

import { useSyncWithTacticus } from './use-sync-with-tacticus';

export const TacticusIntegrationDialog: React.FC<DialogProps> = ({ isOpen, onClose }) => {
    const { data } = useConvexUserDataQuery();
    const userDataMutation = useConvexUserDataMutation();
    const { syncWithTacticus } = useSyncWithTacticus();

    // ToDo: Implement React Suspense to avoid this issue
    if (!data) throw new Error('Data should be loading before accessing this dialog');

    const [tacticusApiKey, setTacticusApiKey] = useState(data.tacticusApiKey);
    const [tacticusGuildApiKey, setTacticusGuildApiKey] = useState(data.tacticusGuildApiKey);
    const [tacticusUserId, setTacticusUserId] = useState(data.tacticusUserId);

    async function syncWithTacticusApi() {
        onClose();
        await syncWithTacticus();
    }

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={value => {
                if (!value) {
                    onClose();
                }
            }}>
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>Sync with Tacticus via API</Modal.Title>
                    <Modal.Description>
                        <span className="font-semibold text-red-600 dark:text-red-500">⚠ Warning:&nbsp;</span>
                        The Planner is in an early stage of integration with the Tacticus API. Unexpected issues may
                        occur.
                    </Modal.Description>
                </Modal.Header>
                <Modal.Body className="pb-1">
                    <div>
                        <span className="font-bold">Acquire your API key at </span>
                        <a
                            href="https://api.tacticusgame.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                            https://api.tacticusgame.com
                        </a>
                        .
                        <br />
                        <br />
                        <p>
                            <span className="font-semibold text-yellow-700 dark:text-yellow-400">
                                🔑 DO NOT SHARE PUBLICLY:&nbsp;
                            </span>
                            <span>
                                Only share this key with trusted parties. Do not post your key on forums or in open
                                chats.
                            </span>
                        </p>
                    </div>

                    <br />

                    <div className="flex flex-col items-center justify-between">
                        <TextField
                            name={`apikey-${Math.random()}`}
                            description="Used to fetch Player data. Player scope is required for this key"
                            type="password"
                            label="Personal API key"
                            className="w-[80%]"
                            value={tacticusApiKey}
                            onChange={setTacticusApiKey}
                            autoComplete="new-password"
                            isRevealable
                        />
                        <TextField
                            name={`guildApikey-${Math.random()}`}
                            description="Used to fetch Guild Raid data. Ask your guild leader or co-leader to generate API key with 'Guild Raid' and 'Guild' scopes"
                            type="password"
                            label="Guild API key"
                            className="w-[80%]"
                            value={tacticusGuildApiKey}
                            onChange={setTacticusGuildApiKey}
                            autoComplete="new-password"
                            isRevealable
                        />
                        <TextField
                            name={`apikey-${Math.random()}`}
                            type="password"
                            description="Used to identify your account in the Guild Raid data"
                            label="Tacticus User ID"
                            className="w-[80%]"
                            value={tacticusUserId}
                            onChange={setTacticusUserId}
                            autoComplete="new-password"
                            isRevealable
                        />
                        <Button
                            intent="primary"
                            isDisabled={
                                tacticusApiKey === data.tacticusApiKey &&
                                tacticusGuildApiKey === data.tacticusGuildApiKey &&
                                tacticusUserId === data.tacticusUserId
                            }
                            onPress={() => userDataMutation({ tacticusApiKey, tacticusGuildApiKey, tacticusUserId })}>
                            Update
                        </Button>
                    </div>
                    <br />
                </Modal.Body>
                <Modal.Footer>
                    <Button intent="secondary" onPress={onClose}>
                        Cancel
                    </Button>
                    <Button intent="primary" onPress={syncWithTacticusApi} isDisabled={!data.tacticusApiKey}>
                        Sync
                    </Button>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
};

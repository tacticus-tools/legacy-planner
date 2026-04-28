import { type FunctionReference, anyApi } from 'convex/server';

export const api: PublicApiType = anyApi as unknown as PublicApiType;
export const internal: InternalApiType = anyApi as unknown as InternalApiType;

export type PublicApiType = {
    user_settings: {
        getUserSettings: FunctionReference<'query', 'public', Record<string, never>, { apiKey?: string }>;
        upsertUserSettings: FunctionReference<'mutation', 'public', { apiKey?: string }, any>;
    };
    legacy_data: {
        getLegacyData: FunctionReference<
            'query',
            'public',
            Record<string, never>,
            {
                pendingTeamsCount: number;
                rejectedTeamsCount: number;
                role: 'user' | 'moderator' | 'admin';
                shareToken?: string;
                tacticusApiKey?: string;
                tacticusGuildApiKey?: string;
                tacticusUserId?: string;
            }
        >;
        upsertLegacyData: FunctionReference<
            'mutation',
            'public',
            {
                pendingTeamsCount?: number;
                rejectedTeamsCount?: number;
                shareToken?: string;
                tacticusApiKey?: string;
                tacticusGuildApiKey?: string;
                tacticusUserId?: string;
            },
            any
        >;
    };
    tacticus: {
        getPlayerData: FunctionReference<
            'query',
            'public',
            Record<string, never>,
            {
                playerData: {
                    metaData: {
                        apiKeyExpiresOn?: bigint;
                        configHash: string;
                        lastUpdatedOn: bigint;
                        scopes: Array<string>;
                    };
                    player: {
                        details: { name: string; powerLevel: number };
                        inventory: {
                            abilityBadges: Record<
                                string,
                                Array<{
                                    amount: number;
                                    name?: string;
                                    rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
                                }>
                            >;
                            components: Array<{
                                amount: number;
                                grandAlliance: 'Imperial' | 'Xenos' | 'Chaos';
                                name: string;
                            }>;
                            forgeBadges: Array<{
                                amount: number;
                                name: string;
                                rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
                            }>;
                            items: Array<{
                                amount: number;
                                id: string;
                                level: number;
                                name?: string;
                            }>;
                            mythicShards: Array<{
                                amount: number;
                                id: string;
                                name?: string;
                            }>;
                            orbs: Record<
                                string,
                                Array<{
                                    amount: number;
                                    rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
                                }>
                            >;
                            requisitionOrders?: { blessed: number; regular: number };
                            resetStones: number;
                            shards: Array<{ amount: number; id: string; name?: string }>;
                            upgrades: Array<{ amount: number; id: string; name?: string }>;
                            xpBooks: Array<{
                                amount: number;
                                id: 'xpUncommon' | 'xpRare' | 'xpEpic' | 'xpLegendary';
                                rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
                            }>;
                        };
                        progress: {
                            arena?: {
                                tokens?: {
                                    current: number;
                                    max: number;
                                    nextTokenInSeconds?: number;
                                    regenDelayInSeconds: number;
                                };
                            };
                            campaigns: Array<{
                                battles: Array<{
                                    attemptsLeft: number;
                                    attemptsUsed: number;
                                    battleIndex: number;
                                }>;
                                id: string;
                                name: string;
                                type: 'Standard' | 'Mirror' | 'Elite' | 'EliteMirror';
                            }>;
                            guildRaid?: {
                                bombTokens?: {
                                    current: number;
                                    max: number;
                                    nextTokenInSeconds?: number;
                                    regenDelayInSeconds: number;
                                };
                                tokens?: {
                                    current: number;
                                    max: number;
                                    nextTokenInSeconds?: number;
                                    regenDelayInSeconds: number;
                                };
                            };
                            legendaryEvents: Array<{
                                currentClaimedChestIndex: number;
                                currentCurrency: number;
                                currentEvent?: {
                                    extraCurrencyPerPayout: number;
                                    hasUsedAdForExtraTokenToday: boolean;
                                    run?: number;
                                    tokens?: {
                                        current: number;
                                        max: number;
                                        nextTokenInSeconds?: number;
                                        regenDelayInSeconds: number;
                                    };
                                };
                                currentPoints?: number;
                                currentShards: number;
                                id: string;
                                lanes: Array<{
                                    battleConfigs: Array<{
                                        disallowedFactions: Array<string>;
                                        numEnemies: number;
                                        objectives: Array<{
                                            objectiveTarget: string;
                                            objectiveType: string;
                                            score: number;
                                        }>;
                                    }>;
                                    id: number;
                                    name: string;
                                    progress: Array<{
                                        encounterPoints: number;
                                        highScore: number;
                                        objectivesCleared: Array<number>;
                                    }>;
                                }>;
                            }>;
                            onslaught?: {
                                tokens?: {
                                    current: number;
                                    max: number;
                                    nextTokenInSeconds?: number;
                                    regenDelayInSeconds: number;
                                };
                            };
                            salvageRun?: {
                                tokens?: {
                                    current: number;
                                    max: number;
                                    nextTokenInSeconds?: number;
                                    regenDelayInSeconds: number;
                                };
                            };
                        };
                        units: Array<{
                            abilities: Array<{ id: string; level: number }>;
                            faction?: string;
                            grandAlliance?: 'Imperial' | 'Xenos' | 'Chaos';
                            id: string;
                            items: Array<{
                                id: string;
                                level: number;
                                name?: string;
                                rarity?: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
                                slotId: 'Slot1' | 'Slot2' | 'Slot3';
                            }>;
                            mythicShards: number;
                            name?: string;
                            progressionIndex: number;
                            rank: number;
                            shards: number;
                            upgrades: Array<number>;
                            xp: number;
                            xpLevel: number;
                        }>;
                    };
                };
            } | null
        >;
        syncPlayer: FunctionReference<'mutation', 'public', Record<string, never>, any>;
    };
};
export type InternalApiType = {
    tacticus: {
        fetchAndStorePlayer: FunctionReference<'action', 'internal', { apiKey: string; clerkUserId: string }, any>;
        upsertPlayerData: FunctionReference<
            'mutation',
            'internal',
            {
                clerkUserId: string;
                playerData: {
                    metaData: {
                        apiKeyExpiresOn?: bigint;
                        configHash: string;
                        lastUpdatedOn: bigint;
                        scopes: Array<string>;
                    };
                    player: {
                        details: { name: string; powerLevel: number };
                        inventory: {
                            abilityBadges: Record<
                                string,
                                Array<{
                                    amount: number;
                                    name?: string;
                                    rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
                                }>
                            >;
                            components: Array<{
                                amount: number;
                                grandAlliance: 'Imperial' | 'Xenos' | 'Chaos';
                                name: string;
                            }>;
                            forgeBadges: Array<{
                                amount: number;
                                name: string;
                                rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
                            }>;
                            items: Array<{
                                amount: number;
                                id: string;
                                level: number;
                                name?: string;
                            }>;
                            mythicShards: Array<{
                                amount: number;
                                id: string;
                                name?: string;
                            }>;
                            orbs: Record<
                                string,
                                Array<{
                                    amount: number;
                                    rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
                                }>
                            >;
                            requisitionOrders?: { blessed: number; regular: number };
                            resetStones: number;
                            shards: Array<{ amount: number; id: string; name?: string }>;
                            upgrades: Array<{ amount: number; id: string; name?: string }>;
                            xpBooks: Array<{
                                amount: number;
                                id: 'xpUncommon' | 'xpRare' | 'xpEpic' | 'xpLegendary';
                                rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
                            }>;
                        };
                        progress: {
                            arena?: {
                                tokens?: {
                                    current: number;
                                    max: number;
                                    nextTokenInSeconds?: number;
                                    regenDelayInSeconds: number;
                                };
                            };
                            campaigns: Array<{
                                battles: Array<{
                                    attemptsLeft: number;
                                    attemptsUsed: number;
                                    battleIndex: number;
                                }>;
                                id: string;
                                name: string;
                                type: 'Standard' | 'Mirror' | 'Elite' | 'EliteMirror';
                            }>;
                            guildRaid?: {
                                bombTokens?: {
                                    current: number;
                                    max: number;
                                    nextTokenInSeconds?: number;
                                    regenDelayInSeconds: number;
                                };
                                tokens?: {
                                    current: number;
                                    max: number;
                                    nextTokenInSeconds?: number;
                                    regenDelayInSeconds: number;
                                };
                            };
                            legendaryEvents: Array<{
                                currentClaimedChestIndex: number;
                                currentCurrency: number;
                                currentEvent?: {
                                    extraCurrencyPerPayout: number;
                                    hasUsedAdForExtraTokenToday: boolean;
                                    run?: number;
                                    tokens?: {
                                        current: number;
                                        max: number;
                                        nextTokenInSeconds?: number;
                                        regenDelayInSeconds: number;
                                    };
                                };
                                currentPoints?: number;
                                currentShards: number;
                                id: string;
                                lanes: Array<{
                                    battleConfigs: Array<{
                                        disallowedFactions: Array<string>;
                                        numEnemies: number;
                                        objectives: Array<{
                                            objectiveTarget: string;
                                            objectiveType: string;
                                            score: number;
                                        }>;
                                    }>;
                                    id: number;
                                    name: string;
                                    progress: Array<{
                                        encounterPoints: number;
                                        highScore: number;
                                        objectivesCleared: Array<number>;
                                    }>;
                                }>;
                            }>;
                            onslaught?: {
                                tokens?: {
                                    current: number;
                                    max: number;
                                    nextTokenInSeconds?: number;
                                    regenDelayInSeconds: number;
                                };
                            };
                            salvageRun?: {
                                tokens?: {
                                    current: number;
                                    max: number;
                                    nextTokenInSeconds?: number;
                                    regenDelayInSeconds: number;
                                };
                            };
                        };
                        units: Array<{
                            abilities: Array<{ id: string; level: number }>;
                            faction?: string;
                            grandAlliance?: 'Imperial' | 'Xenos' | 'Chaos';
                            id: string;
                            items: Array<{
                                id: string;
                                level: number;
                                name?: string;
                                rarity?: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
                                slotId: 'Slot1' | 'Slot2' | 'Slot3';
                            }>;
                            mythicShards: number;
                            name?: string;
                            progressionIndex: number;
                            rank: number;
                            shards: number;
                            upgrades: Array<number>;
                            xp: number;
                            xpLevel: number;
                        }>;
                    };
                };
            },
            any
        >;
    };
};

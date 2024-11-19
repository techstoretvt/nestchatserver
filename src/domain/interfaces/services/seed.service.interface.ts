/** @format */

export interface ISeedService {
    seed(): Promise<void>;
    seedUser(): Promise<void>;
    seedRole(): Promise<void>;
    seedPermission(): Promise<void>;
}

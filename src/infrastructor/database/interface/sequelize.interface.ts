interface IQuyery {
    where?: { [key: string]: any, } | any;
    limit?: number;
    offset?: number;
    include: [obj: { model: any, [key: string]: any }];
    attributes?: [string, [any]] | { exclude?: [string?], include?: [string?] };
    group?: [string];
    raw?: boolean;
    nest?: boolean;
    order?: [col?: string | [string, string?]];
}

interface IDBMethods {
    create: (obj: { id: string, [key: string]: any }) => any;
    findAll: (obj?: IQuyery | {}) => any;
    findOne: (obj?: IQuyery | {}) => any;
    findOrCreate: (obj: {
        where: { [key: string]: any },
        defaults: { id: string, [key: string]: any }
    }) => any;
    bulkCreate: ([any], obj?: any) => any;
    update: (obj: { [key: string]: any }, obj2?: { where: { [key: string]: any } }) => any;
    findByPk: (id: any) => any;
    findAndCountAll: (obj?: IQuyery | {}) => any;
    destroy: (obj: { where: { [key: string]: any } }) => any;
    destroyAll: () => any;
    count: (obj?: { where: { [key: string]: any } }) => any;
    min: (col: string, obj?: { where: { [key: string]: any } }) => any;
    sum: (col: string, obj?: { where: { [key: string]: any } }) => any;
    max: (col: string, obj?: { where: { [key: string]: any } }) => any;
}

export default interface IDB {
    BlockedUsers?: IDBMethods;
    Users?: IDBMethods;
    Messages?: IDBMethods;
    ContactCardMessage?: IDBMethods;
    Friendships?: IDBMethods;
    Participants?: IDBMethods;
    ShareMessage?: IDBMethods;
    MediaMessage?: IDBMethods;
    NotifyMessage?: IDBMethods;
    FriendRequests?: IDBMethods;
    UserNicknames?: IDBMethods;
    Conversations?: IDBMethods;
    MessageReactions?: IDBMethods;
    UserSettings?: IDBMethods;
    sequelize?: any;
    Sequelize?: any;
}